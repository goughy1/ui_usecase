(function() {

  'use strict';

  function registerStates(stateProvider,ERD_CONSTANTS,GLOBAL_CONSTANTS) {
    var layoutState = 'layout';

    // ERD List - List State
    var listState = {
      name: 'erd-list',
      parent: layoutState,
      url: '/external-resource-definitions',
      resolve: /*@ngInject*/
      {
        guard: function(FeatureFlags) {
          return FeatureFlags.guardRoute(['release_management.cd_profile']);
        },
        erdResources:  function(erdDataService) {
          return erdDataService.getAll();
        }
      },
      views: {
        'content@layout': {
          templateUrl: 'metadata/erd/_views/erd-list.tpl.html',
          controller: 'ERDListController',
          controllerAs: 'erdListController'
        }
      },
      data: {}
    };

    // ERD - View State
    var viewState = {
      name: 'erd-view',
      parent: 'erd-list',
      url: '/{id}',
      resolve: /*@ngInject*/
      {
        erdResource: function(erdDataService, $stateParams) {
          var erd;
          if($stateParams.id === GLOBAL_CONSTANTS.ROUTE_KEYS.CREATE_NEW){
            erd = {};
            erd.name = undefined;
            erd.description = undefined;
            erd.state = ERD_CONSTANTS.STATE_KEYS.DRAFT;
            erd.status = GLOBAL_CONSTANTS.STATUS_KEYS.ACTIVE;

            erd.ciServer = {};
            erd.ciServer.type = "-1";
            erd.ciServer.version = "-1";
            erd.ciServer.url = undefined;
            erd.ciServer.username = undefined;
            erd.ciServer.password = undefined;

            erd.versionControlSystem = {};
            erd.versionControlSystem.type = "-1";
            erd.versionControlSystem.version = "-1";
            erd.versionControlSystem.url = undefined;
            erd.versionControlSystem.username = undefined;
            erd.versionControlSystem.password = undefined;

            erd.binaryRepository = {};
            erd.binaryRepository.type = "-1";
            erd.binaryRepository.version = "-1";
            erd.binaryRepository.url = undefined;
            erd.binaryRepository.username = undefined;
            erd.binaryRepository.password = undefined;
          }else{
            erd = erdDataService.getOne($stateParams.id);
          }
          return erd;
        }
      },
      views: {
        'content@layout': {
          templateUrl: 'metadata/erd/_views/erd.tpl.html',
          controller: 'ERDController',
          controllerAs: 'erdController'
        }
      },
      data: {}
    };


    // Register states with the UI Router State Provider
    stateProvider
      .state(listState)
      .state(viewState);

  }

  // Function which configures the module
  function configureModule($stateProvider, $urlRouterProvider,ERD_CONSTANTS,GLOBAL_CONSTANTS) {
    registerStates($stateProvider,ERD_CONSTANTS,GLOBAL_CONSTANTS);
  }

  //Defining Constants
  var CI_SERVER_TYPES = {
    JENKINS: 'JENKINS',
    TEAMCITY: 'TEAMCITY'
  };

  var VCS_TYPES = {
    SVN : 'SVN',
    GIT : 'GIT'
  };

  var BINARY_REPO_TYPES = {
    ARTIFACTORY : 'ARTIFACTORY',
    NEXUS : 'NEXUS'
  };

  var STATE_KEYS = {
    DRAFT : 'DRAFT'
  };

  var DISPLAY_MESSAGES = {
    LABEL_JENKINS : "Jenkins",
    LABEL_TEAMCITY : "Team City",
    LABEL_SVN : "SVN",
    LABEL_GIT : "GIT",
    LABEL_ARTIFACTORY : "Artifactory",
    LABEL_NEXUS : "Nexus"
  };

  var ERD_CONSTANTS = {
    CI_SERVER_TYPES :CI_SERVER_TYPES,
    VCS_TYPES : VCS_TYPES,
    BINARY_REPO_TYPES : BINARY_REPO_TYPES,
    DISPLAY_MESSAGES : DISPLAY_MESSAGES,
    STATE_KEYS:STATE_KEYS
  };


  // Infrastructure Provider Module declaration
  var module = angular.module('fusioncloud.metadata.erd', [
    'fusioncloud.common',
    'fusioncloud.common.backend',
    'fusioncloud.metadata.environmentType'
  ]);

  //Defining constants
  module.constant("ERD_CONSTANTS",ERD_CONSTANTS);

  // Configure the Module
  module.config(configureModule);

})();