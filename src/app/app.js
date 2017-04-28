import angular from 'angular';
import uirouter from 'angular-ui-router';

import '../styles/app.less';

import account from './account';
import auth from './auth';
import header from './header';
import main from './main';

import config from './app.config';
import routing from './app.routes';

angular.module('qulixTrialFrontend', [
    uirouter,

    account,
    auth,
    header,
    main
])
    .constant('APP_CONFIG', config)
    .config(routing);
