'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:FoodCtrl
 * @description
 * # FoodCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('FoodCtrl', function ($scope, Food, Search, NgTableParams, FoodRecord) {
    var param = {format:'json', sort:'n','max':25,'offset':0, api_key:'skDbzCwWhZtyMGlQyLFTt0XdWdoifWKWkxrkDxY7'};

    //store the list of food
    $scope.Product = [];

    // Watch the query to call NDB api to real-time search food items
    $scope.$watch('query', function(newVal){
      if (newVal)
        param.q = newVal;
      Search.getList(param).then(function(data){
        $scope.results = data.plain()[0].originalElement;

        $scope.searchTableParams = new NgTableParams({
          count: 5 
        }, {
            //paginationMaxBlocks: 5,
            //paginationMinBlocks: 2,
            data: $scope.results.list.item
        });
        //console.log($scope.results);
      });

      $scope.a = {a:[1,2,3]}
      //$scope.results = $scope.results[0].list.item;
    });

    // add food to list.
    $scope.addItem = function(id){
        console.log(id);
        var params = {format:'json', type: 'b', api_key:'skDbzCwWhZtyMGlQyLFTt0XdWdoifWKWkxrkDxY7', ndbno:id};
        // if already in list, add quantity
        for(var i = 0; i < $scope.Product.length; i++){
            if ($scope.Product[i].id === id) {
                $scope.Product[i].quantity ++;
                return;
            }
        }
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
            model.tooltipHtml = "<div><h4>Nutrients(per 100g):</h4></div><hr>"
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
                    if (m.qty === 1) {
                        model.nutrients[n.name].measureNames.push(m.label);
                        model.nutrients[n.name].measures[m.label] = {
                            name: m.label,
                            //ndb value is string format, transfer to float
                            value: parseFloat(m.value),
                            eqv: m.eqv
                        }
                    }
                });
                model.tooltipHtml += "<div class='row'><div class='col-md-8' align='left'><b>" + n.name + ":</b></div><div class='col-md-2' align='right'>" + n.value + n.unit + "</div></div>"
            });
            model.energy = model.nutrients['Energy'].value/100;
            $scope.Product.push(model);
//            console.log(JSON.stringify(model));
//            console.log($scope.Product);

        })
    };

    //watch total energy to update chart
    $scope.$watch('total', function(newVal, oldVal){
        var data = [];
        // in case deleteAll -> newVal = ''
        if (newVal || oldVal) {
            $scope.Product.forEach(function(item, index){
                data.push({
                    name: item.name,
                    y: item.quantity * item.nutrients["Energy"].measures[item.measure].value
                })
            });
            // newVal = '' --> no item in list --> destroy chart
            if (oldVal && !newVal){
                $('#highcharts').highcharts().destroy();
            } 
            // have item in list, render chart
            else {
                $('#highcharts').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Food Carlories Proportion'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}({point.percentage:.1f}%)</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Carlories',
                        colorByPoint: true,
                        data: data
                    }]
                });
            }
        }
    })

    //return total energy of all food
    $scope.totalEnergy = function () {
        var total = 0;
        angular.forEach($scope.Product, function (item) {
            total += item.quantity * item.nutrients["Energy"].measures[item.measure].value;
        });
        $scope.total = total;
        return total;
    }

    //remove one item
    $scope.remove = function (index) {
        var ans = confirm("Do you want to remove this item？");
        if (ans) {
            $scope.Product.splice(index, 1);
        }
    }

    //remove all items
    $scope.removeall = function () {
        var index;
        var ans = confirm("Do you want to remove all items？");
        if (ans) {
            $scope.Product = [];
        }
    }

    // reduce item quantity by 1
    $scope.reduce = function (index) {
        if ($scope.Product[index].quantity != 1) {
            $scope.Product[index].quantity--;
        } else {
            var ans = confirm("Do you want to remove this item？");
            if (ans) {
                $scope.Product.splice(index, 1);
            } else {
                $scope.Product[index].quantity = 1;
            }
        }
    }

    $scope.add = function (index) {
        $scope.Product[index].quantity++;
    }

    $scope.recordFood = function(){
        if ($scope.Product.length === 0) {
            alert("Please add items first!");
            return;
        }
        var list = [];
        $scope.Product.forEach(function(item){
            list.push({
                name: item.name,
                measure: item.measure,
                quantity: item.quantity,
                energy: item.quantity * item.nutrients["Energy"].measures[item.measure].value
            })
        });
        var params = {
            userId: "fakeUser",
            foodList: list,
            totalEnergy: $scope.totalEnergy()
        };
        FoodRecord.post(params).then(function(d){
            alert("Success!");
        });
    }


  });
