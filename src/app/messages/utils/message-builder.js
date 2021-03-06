import _ from 'underscore';

export default class MessageBuilder {
    constructor(data) {
        this._data = data;
        this._message = {
            id: data.id
        };
    }

    buildHeader(name) {
        if (!this._message.headers) {
            this._message.headers = {};
        }

        const header = _.find(
            this._data.payload.headers,
            header => header.name.toLowerCase() === name.toLowerCase()
        );

        if (header) {
            if (name === 'date') {
                header.value = new Date(header.value);
            }
            this._message.headers[name] = header.value;
        }
        return this;
    }

    buildBody() {
        const payload = this._data.payload;
        let encodedBody = '';

        if (_.isUndefined(payload.parts)) {
            encodedBody = payload.body.data;
        } else {
            encodedBody = this._getHTMLPart(payload.parts);
        }
        encodedBody = encodedBody
            .replace(/-/g, '+')
            .replace(/_/g, '/')
            .replace(/\s/g, '');
        this._message.body = decodeURIComponent(escape(atob(encodedBody)));
        return this;
    }

    getMessage() {
        return this._message;
    }

    _getHTMLPart(parts) {
        for(let i = 0; i < parts.length; i++) {
            if(_.isUndefined(parts[i].parts)) {
                if(parts[i].mimeType === 'text/html') {
                    return parts[i].body.data;
                }
            } else {
                return this._getHTMLPart(parts[i].parts);
            }
        }
        return '';
    }
}
