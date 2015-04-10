/* Login Module */
'use strict';


define(function(){ 

    var controller = function($scope, $state, $rootScope){

        //Populate users property
        $.get('/users', function(data){
            $scope.$apply(function(){ $scope.users = data });
        });


        $scope.login = function(){

            $rootScope.active_user = $scope.selector;
            $state.go('trade.table');
        }

    }

    controller.$inject = ['$scope', '$state', '$rootScope'];

        return {
        url: '',
        templateUrl: '/scripts/modules/login/login.html',
        controller: controller
    }
});