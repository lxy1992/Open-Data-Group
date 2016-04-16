'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:InstantSearchCtrl
 * @description
 * # InstantSearchCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('InstantSearchCtrl', function ($scope, Food, Search) {
    var params = {format:'json', sort:'n','max':25,'offset':0, api_key:'skDbzCwWhZtyMGlQyLFTt0XdWdoifWKWkxrkDxY7'};
    $scope.list = [];
    $scope.Product = [];

    //this.results = Food.getList(params)[0].$object;
    $scope.$watch('query', function(oldVal, newVal, scope){
      if (oldVal)
        params.q = oldVal;
      Search.getList(params).then(function(data){
        $scope.results = data.plain()[0].originalElement;
        //console.log($scope.results);
      });
      
      $scope.a = {a:[1,2,3]}
      //$scope.results = $scope.results[0].list.item;
    });

    $scope.getDetail = function(id){
        console.log(id);
        var params = {format:'json', type: 'b', api_key:'skDbzCwWhZtyMGlQyLFTt0XdWdoifWKWkxrkDxY7', ndbno:id};
        Food.getList(params).then(function(data){
            var food = data.plain()[0].originalElement.report.food;
            // Transfer NDB result to a simplified model
            // data model for each added food
            var model = {
                id: food.ndbno,
                name: food.name,
                quantity: 1,
                measure: 'g',
                nutrients: {}
            };
            food.nutrients.forEach(function(n){
                model.nutrients[n.name] = {
                    unit: n.unit,
                    //ndb value is string format, transfer to float
                    value: parseFloat(n.value),
                    defaultMeasure: '100g',
                    measureNames: [],
                    measures: {}
                };
                model.nutrients[n.name].measures['g'] = {
                    name: 'g',
                    value:  model.nutrients[n.name].value/100,
                    eqv: 1
                }
                n.measures.forEach(function(m){
                    model.nutrients[n.name].measureNames.push(m.label);
                    model.nutrients[n.name].measures[m.label] = {
                        name: m.label,
                        //ndb value is string format, transfer to float
                        value: parseFloat(m.value),
                        eqv: m.eqv
                    }
                });
            });
            model.energy = model.nutrients['Energy'].value/100;
            $scope.Product.push(model);
            $scope.list.push(model);
            console.log(JSON.stringify($scope.list[0]));
            console.log($scope.Product);
        })
    };

    //$scope.cart = {};

    

    $scope.totalEnergy = function () {
        var total = 0;
        angular.forEach($scope.Product, function (item) {
            total += item.quantity * item.nutrients["Energy"].measures[item.measure].value;
        });
        return total;
    }


    $scope.remove = function (index) {
        var ans = confirm("Do you want to remove this item？");
        if (ans) {
            $scope.Product.splice(index, 1);
        }
    }

    $scope.removeall = function () {
        var index;
        var ans = confirm("Do you want to remove all items？");
        if (ans) {
            $scope.Product = [];
        }
    }

    $scope.reduce = function (index) {
        if ($scope.Product[index].quantity != 1) {
            $scope.Product[index].quantity--;
        } else {
            var ans = confirm("Do you want to remove this item？");
            if (ans) {
                $scope.Product.slice(index, 1);
            } else {
                $scope.Product[index].quantity = 1;
            }
        }
    }

    $scope.add = function (index) {
        $scope.Product[index].quantity++;
    }

});