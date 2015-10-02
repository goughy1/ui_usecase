(function(){

  'use strict';

  // Constructor ERD List Controller
  function ERDListController(erdResources,
                             erdDataService,
                             routingUtilityFactory,
                             ERD_CONSTANTS,
                             GLOBAL_CONSTANTS,
                             $timeout,
                             $modal,
                             $scope){

    var _instance = this;

    this.erdResources = erdResources;
    this.erdDataService = erdDataService;


    this.createERDResource = function(){
      var targetStateName = 'erd-view';
      routingUtilityFactory.transitionToState(targetStateName, true, {
        id: GLOBAL_CONSTANTS.ROUTE_KEYS.CREATE_NEW
      });
    };

    this.openERDResource = function(erdResource){
      var targetStateName;
      targetStateName = 'erd-view';
      routingUtilityFactory.transitionToState(targetStateName, true, {
        id: erdResource.id
      });
    };

    $timeout(function(){
      $scope.$broadcast(GLOBAL_CONSTANTS.EVENT.SYNCHRONIZE_TILES);
    },100);
  }

  angular.module('fusioncloud.metadata.erd')
    .controller('ERDListController', ERDListController);
})();