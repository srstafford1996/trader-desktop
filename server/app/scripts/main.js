//Trader Desktop Application Definition and Setup

'use strict';

define(function(require){

    angular.module('Trader-Desktop',
        ['ui.router'])
    .factory('Orders', require('services/orders'))
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        //Bootstraps!
        var LoginModule = require('modules/login/login');
        var TradeModule = require('modules/trade/trade');

        $urlRouterProvider.otherwise('');

        $stateProvider

        .state('login', LoginModule)

        .state('trade', TradeModule)
        .state('trade.table', {templateUrl: '/scripts/modules/trade/table.html'})
        .state('trade.chart', {templateUrl: '/scripts/modules/trade/chart.html'})

    }]);

});