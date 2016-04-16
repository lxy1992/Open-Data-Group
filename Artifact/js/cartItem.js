 angular.module('app', []).controller('cartController'
     , function ($scope) {
         $scope.Product = [{
             id: 1
             , name: "Rice"
             , quantity: 1
             , energy: 2
            }, {
             id: 2
             , name: "Apple"
             , quantity: 1
             , energy: 1

            }, {
             id: 3
             , name: "Coka"
             , quantity: 1
             , energy: 5
            }, {
             id: 4
             , name: "Chocolate"
             , quantity: 1
             , energy: 10
            }];

         $scope.totalEnergy = function () {
             var total = 0;
             angular.forEach($scope.Product, function (item) {
                 total += item.quantity * item.energy;
             });
             return total;
         }


         $scope.remove = function (index) {
             $scope.Product.splice(index, 1);
         }

         $scope.removeall = function () {
             var index;
             for (index = $scope.Product.length - 1; index >= 0; index--) {
                 $scope.remove(index);
             }
         }

         $scope.reduce = function (index) {
             if ($scope.Product[index].quantity != 1) {
                 $scope.Product[index].quantity--;
             } else {
                 var ans = confirm("Do you want to remove this item？");
                 if (ans) {
                     $scope.remove(index);
                 } else {
                     $scope.Product[index].quantity = 1;
                 }
             }
         }

         $scope.add = function (index) {
             $scope.Product[index].quantity++;
         }

         $scope.$watch('Product', function (newValue, oldValue) {
             angular.forEach(newValue, function (item, key) {
                 if (item.quantity < 1) {
                     var ans = confirm("Do you want to remove this item？");
                     if (ans) {
                         $scope.remove(key);
                     } else {
                         item.quantity = oldValue[key].quantity;
                     }
                     return;
                 }
             });
         }, true);

     });