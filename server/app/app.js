//Trader Desktop App Launcher

'use strict';

require.config({
    baseUrl: '/scripts'
});

require(['main'], function(){

    angular.bootstrap( document, ['Trader-Desktop']);
});