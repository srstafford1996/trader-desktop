define(function(){

    return(['$rootScope', function($rootScope){
        $rootScope.rootOrders = [];

            var socket = io();

            socket.on('orderCreatedEvent', function(order){
                $rootScope.$apply(function(){
                    $rootScope.rootOrders.push(order); 
                });
            });

            socket.on('allOrdersDeletedEvent', function(){
                $rootScope.$apply(function(){
                    $rootScope.rootOrders = [];
                     console.log('Orders clear.');
                });
            });

            socket.on('placementCreatedEvent', function(placement){
                console.log(placement);
                $rootScope.$apply(function(){
                    var index = null;
                    var order = $.grep($rootScope.rootOrders, function(e, i){ 
                        if(e.id == placement.orderId){
                            index = i;
                            return true;
                        }});
                    order = order[0];

                    order.quantityPlaced = order.quantityPlaced + placement.quantityPlaced;
                    order.status = placement.status;
                    $rootScope.rootOrders[index] = order;

                });
            });

            socket.on('executionCreatedEvent', function(execution){
                console.log(execution);
                $rootScope.$apply(function(){
                    var index = null;
                    var order = $.grep($rootScope.rootOrders, function(e, i){ 
                        if(e.id == execution.orderId){
                            index = i;
                            return true;
                        }});
                    order = order[0];

                    order.quantityExecuted = order.quantityExecuted + execution.quantityExecuted;
                    order.status = execution.status;
                    order.limitPrice = Math.round(execution.executionPrice * 100)/100;
                    $rootScope.rootOrders[index] = order;
                });
            });

        $.get('/orders', function(data){
            $rootScope.rootOrders = data;
        });


        return{
            create: function(order){
                var orderJSON = JSON.stringify(
                    { "side": order.side,"symbol": order.symbol, "quantity": order.quantity,
                    "limitPrice": order.limitPrice, "traderId": order.traderId });

                $.ajax({
                      url: '/orders',
                      type: 'POST',
                      data: orderJSON,
                      contentType:'application/json'
              });
            },

            refresh: function(){
                $rootScope.rootOrders = data;
            },

            delete: function(){
                $.ajax({
                    url: '/orders',
                    type: 'DELETE'
                });
            }
        };

    }])
});