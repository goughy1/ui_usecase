(function(){

  'use strict';

  // Constructor Function for the Infrastructure Provider Controller
  function ERDController(erdResource,
                         erdDataService,
                         routingUtilityFactory,
                         dialogService,
                         ERD_CONSTANTS,
                         GLOBAL_CONSTANTS,
                         $modal,
                         $scope,
                         $timeout){

    var _instance = this;

    this.erdResource = erdResource;
    this.erdDataService = erdDataService;

    this.ciTypes = erdDataService.getSupportedCITypes();
    this.vcsTypes = erdDataService.getSupportedVCSTypes();
    this.binaryRepoTypes = erdDataService.getSupportedBinaryRepoTypes();

    this.ciVersions = [];
    this.vcsVersions = [];
    this.binaryRepoVersions = [];

    this.randomVCSValue = _.random(9999999999999);
    this.randomCIValue = _.random(9999999999999);
    this.randomVCSValue = _.random(9999999999999);

    this.setSelectBoxesData = function(){
      //Storing the values temporarily...
      var ciType =  _instance.erdResource.ciServer.type;
      var ciVersion = _instance.erdResource.ciServer.version;

      var vcsType =  _instance.erdResource.versionControlSystem.type;
      var vcsVersion = _instance.erdResource.versionControlSystem.version;

      var binaryRepoType =  _instance.erdResource.binaryRepository.type;
      var binaryRepoVersion = _instance.erdResource.binaryRepository.version;

      //setting it to -1's
      _instance.erdResource.ciServer.type = "-1";
      _instance.erdResource.ciServer.version = "-1";

      _instance.erdResource.versionControlSystem.type = "-1";
      _instance.erdResource.versionControlSystem.version = "-1";

      _instance.erdResource.binaryRepository.type = "-1";
      _instance.erdResource.binaryRepository.version = "-1";

      $timeout(function(){

        //Setting the Types first
        $scope.$apply(function(){
          _instance.erdResource.ciServer.type = ciType;
          _instance.erdResource.versionControlSystem.type = vcsType;
          _instance.erdResource.binaryRepository.type = binaryRepoType;
        });

        //Setting the version
        //just little bit after type
        $timeout(function(){
          $scope.$apply(function(){
            _instance.erdResource.ciServer.version = ciVersion;
            _instance.erdResource.versionControlSystem.version = vcsVersion;
            _instance.erdResource.binaryRepository.version = binaryRepoVersion;
          });
        },200);

      },200);
    };

    if(this.erdResource.id){
      _instance.mode = GLOBAL_CONSTANTS.META_DATA.EDIT_MODE;
      _instance.mainTitle = "Edit";
      this.setSelectBoxesData();
    }else{
      _instance.mode = GLOBAL_CONSTANTS.META_DATA.CREATE_MODE;
      _instance.mainTitle = "Create New";
    }

    this.setDefaultResourcePanes = function(){
      _instance.resourcePanes = {
        'ci':true,
        'vcs':false,
        'binaryrepo':false
      };
    };

    this.setDefaultResourcePanes();

    //Data object for the ipMask.
    this.erdMask = {};
    this.erdMask.isVisible = false;

    this.cancelExtendedView = function(){
      this.erdMask.isVisible = false;
    };

    this.saveERDResource = function(){
      if(_instance.mode === GLOBAL_CONSTANTS.META_DATA.CREATE_MODE){
        routingUtilityFactory.setStateChangeVisibly("Creating Continous Delivery Profile...");
        console.log('Printing CD Profile');
        console.log(angular.toJson(_instance.erdResource));
        erdDataService.createOne(_instance.erdResource).then(function(data){
          _instance.showERDListView();
          routingUtilityFactory.unsetStateChangeVisibly();
        },function(){
          routingUtilityFactory.unsetStateChangeVisibly();
        });
      }else{
        routingUtilityFactory.setStateChangeVisibly("Updating Continous Delivery Profile...");
        console.log('Printing CD Profile');
        console.log(angular.toJson(_instance.erdResource));
        erdDataService.updateOne(_instance.erdResource).then(function(data){
          _instance.showERDListView();
          routingUtilityFactory.unsetStateChangeVisibly();
        },function(){
          routingUtilityFactory.unsetStateChangeVisibly();
        });
      }
    };

    this.showERDListView = function(){
      var targetView = 'erd-list';
      routingUtilityFactory.transitionToState(targetView, true);
    };

    $scope.$watch('erdController.erdResource.ciServer.type',function(newValue, oldValue){
       _instance.ciVersions = _instance.erdDataService.getSupportedCIVersions(newValue);
       _instance.erdResource.ciServer.version = "-1";
    });

    $scope.$watch('erdController.erdResource.versionControlSystem.type',function(newValue, oldValue){
      _instance.vcsVersions = _instance.erdDataService.getSupportedVCSVersions(newValue);
      _instance.erdResource.versionControlSystem.version = "-1";
    });

    $scope.$watch('erdController.erdResource.binaryRepository.type',function(newValue, oldValue){
      _instance.binaryRepoVersions = _instance.erdDataService.getSupportedBinaryRepoVersions(newValue);
      _instance.erdResource.binaryRepository.version = "-1";
    });

    $scope.$watch('erdController.erdResource.ciServer',function(){
      $timeout(function(){
        var randomValue = _.random(9999999999999);
        _instance.randomCIValue = randomValue;
      },200);
    },true);

    $scope.$watch('erdController.erdResource.versionControlSystem',function(){
      $timeout(function(){
        var randomValue = _.random(9999999999999);
        _instance.randomVCSValue = _.random(9999999999999);
      },200);
    },true);

    $scope.$watch('erdController.erdResource.binaryRepository',function(){
      $timeout(function(){
        var randomValue = _.random(9999999999999);
        _instance.randomBinaryRepoValue = _.random(9999999999999);
      },200);

    },true);
  }

  angular.module('fusioncloud.metadata.erd')
    .controller('ERDController', ERDController);
})();