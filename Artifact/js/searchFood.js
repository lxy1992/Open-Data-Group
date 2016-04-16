angular.module('app').controller('searchFoodController'
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




        $scope.add = function (index) {
            $scope.Product.splice(index, 1);
        }


        $scope.add = function (index) {
            $scope.Product[index].quantity++;
        }

        $scope.$watch('Product', function (newValue, oldValue) {
            angular.forEach(newValue, function (item, key) {
                if (item.quantity < 1) {
                    var ans = confirm("Do you want to add this item？");
                    if (ans) {
                        $scope.add(key);
                    } else {
                        item.quantity = oldValue[key].quantity;
                    }
                    return;
                }
            });
        }, true);

    });