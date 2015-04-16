/* Trade Module Controller */

define(function(){

    var controller = function($scope, $state, $rootScope, Orders){

        //Chart value initializtion
        $scope.barHeight = 25;
        $scope.barSpacing = 5;

        /* Login Redirect */
        if(!$rootScope.active_user)
            $state.go('login');

        /* Initialize Instruments */
        $.get('/instruments', function( data ){
            $scope.instruments = data;
        });

        /* Button Functions */ 
        $scope.delete = function(){
            Orders.delete();
        };

        $scope.refresh = function(){
            Orders.refresh();
        };


        $scope.trade = function(){

            var numOfTrades = prompt('How many orders?', '10');
            for(var i=0; i < numOfTrades; i++){

                //Randomize instrument, side, and quantity.
                var instrument = $scope.instruments[Math.floor(Math.random() * $scope.instruments.length)];
                var symbol = instrument.symbol;
                var limitPrice = instrument.lastTrade;

                
                var side = (Math.floor(Math.random() * 2) == 1) ? 'Buy' : 'Sell';
                var quantity = Math.floor(Math.random() * 10000) + 500;


                var traderId = $rootScope.active_user.id;
                console.log(typeof quantity);
                Orders.create({"side": side, "symbol": symbol, "quantity": quantity, "limitPrice": limitPrice, "traderId": traderId});
            
            }
        };


        /* Chart Initilization */

        



    };

    controller.$inject = ['$scope' , '$state', '$rootScope', 'Orders'];

    return{
        url: '/trade',
        templateUrl: '/scripts/modules/trade/trade.html',
        controller: controller
    }

});