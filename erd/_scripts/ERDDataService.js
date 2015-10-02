(function(){

  'use strict';

  var ERDS = 'continuous-delivery-profiles';

  // Infrastructure Provider Data Service
  function ERDDataService(fusioncloudApiRestangularFactory,
                          fusioncloudBackendServiceBase,
                          ERD_CONSTANTS){

    var _service = this;
    _service.vcsTypes = undefined;
    _service.ciTypes = undefined;
    _service.binaryRepoTypes = undefined;

    function getCollectionResource(){
     return fusioncloudApiRestangularFactory
        .getMetadataSubDomain()
        .all(ERDS);
    }

    function getDocumentResource(id){
      return fusioncloudApiRestangularFactory
        .getMetadataSubDomain()
        .one(ERDS, id);
    }

    function getCIType(name){
      var key;
      for(var k in ERD_CONSTANTS.CI_SERVER_TYPES){
        if(ERD_CONSTANTS.CI_SERVER_TYPES.hasOwnProperty(k) && ERD_CONSTANTS.CI_SERVER_TYPES[k] === name){
          key = k;
          break;
        }
      }
      return key;
    }

    function getVCSType(name){
      var key;
      for(var k in ERD_CONSTANTS.VCS_TYPES){
        if(ERD_CONSTANTS.VCS_TYPES.hasOwnProperty(k) && ERD_CONSTANTS.VCS_TYPES[k] === name){
          key = k;
          break;
        }
      }
      return key;
    }

    function getBinaryRepoType(name){
      var key;
      for(var k in ERD_CONSTANTS.BINARY_REPO_TYPES){
        if(ERD_CONSTANTS.BINARY_REPO_TYPES.hasOwnProperty(k) && ERD_CONSTANTS.BINARY_REPO_TYPES[k] === name){
          key = k;
          break;
        }
      }
      return key;
    }

    function getDisplayNameForCIServer(ciServer){
      var key = getCIType(ciServer.type);
      return ERD_CONSTANTS.DISPLAY_MESSAGES["LABEL_"+key]+" v"+ciServer.version;
    }

    function getDisplayNameForVCSServer(vcsServer){
      var key = getVCSType(vcsServer.type);
      return ERD_CONSTANTS.DISPLAY_MESSAGES["LABEL_"+key]+" v"+vcsServer.version;
    }

    function getDisplayNameForBinaryRepoServer(repoServer){
      var key = getBinaryRepoType(repoServer.type);
      return ERD_CONSTANTS.DISPLAY_MESSAGES["LABEL_"+key]+" v"+repoServer.version;
    }

    function getSupportedVCSVersions(type){
      var versions = [];
      switch(type){
        case ERD_CONSTANTS.VCS_TYPES.SVN:
          versions.push({"value":"1.5","name":"1.5"});
          versions.push({"value":"1.6","name":"1.6"});
          versions.push({"value":"1.7","name":"1.7"});
          versions.push({"value":"1.8","name":"1.8"});
          break;
      }
      return versions;
    }

    function getSupportedBinaryRepoVersions(type){
      var versions = [];

      switch(type){
        case ERD_CONSTANTS.BINARY_REPO_TYPES.ARTIFACTORY:
          versions.push({"value":"3.4","name":"3.4"});
          break;
      }

      return versions;
    }

    function getSupportedCIVersions(type){
      var versions = [];

      switch(type){
        case ERD_CONSTANTS.CI_SERVER_TYPES.JENKINS:
          versions.push({"value":"1.590","name":"1.590"});
          break;
      }

      return versions;
    }

    function getSupportedCITypes(){
      if(!_service.ciTypes){
        _service.ciTypes = [];
        _service.ciTypes.push({"value":ERD_CONSTANTS.CI_SERVER_TYPES.JENKINS,"name":ERD_CONSTANTS.DISPLAY_MESSAGES.LABEL_JENKINS});
        //_service.ciTypes.push({"value":ERD_CONSTANTS.CI_SERVER_TYPES.TEAMCITY,"name":ERD_CONSTANTS.DISPLAY_MESSAGES.LABEL_TEAMCITY});
      }
      return _service.ciTypes;
    }

    function getSupportedVCSTypes(){
      if(!_service.vcsTypes){
        _service.vcsTypes = [];
        _service.vcsTypes.push({"value":ERD_CONSTANTS.VCS_TYPES.SVN,"name":ERD_CONSTANTS.DISPLAY_MESSAGES.LABEL_SVN});
        //_service.vcsTypes.push({"value":ERD_CONSTANTS.VCS_TYPES.GIT,"name":ERD_CONSTANTS.DISPLAY_MESSAGES.LABEL_GIT});
      }
      return _service.vcsTypes;
    }

    function getSupportedBinaryRepoTypes(){
      if(!_service.binaryRepoTypes){
        _service.binaryRepoTypes = [];
        _service.binaryRepoTypes.push({"value":ERD_CONSTANTS.BINARY_REPO_TYPES.ARTIFACTORY,"name":ERD_CONSTANTS.DISPLAY_MESSAGES.LABEL_ARTIFACTORY});
        //_service.binaryRepoTypes.push({"value":ERD_CONSTANTS.BINARY_REPOS.NEXUS,"name":ERD_CONSTANTS.DISPLAY_MESSAGES.LABEL_NEXUS});
      }
      return _service.binaryRepoTypes;
    }

    return _.create(fusioncloudBackendServiceBase, {
      getCollectionResource: getCollectionResource,
      getDocumentResource: getDocumentResource,
      getCIType:getCIType,
      getVCSType:getVCSType,
      getBinaryRepoType:getBinaryRepoType,
      getDisplayNameForCIServer:getDisplayNameForCIServer,
      getDisplayNameForVCSServer:getDisplayNameForVCSServer,
      getDisplayNameForBinaryRepoServer:getDisplayNameForBinaryRepoServer,
      getSupportedCIVersions:getSupportedCIVersions,
      getSupportedBinaryRepoVersions:getSupportedBinaryRepoVersions,
      getSupportedVCSVersions:getSupportedVCSVersions,
      getSupportedBinaryRepoTypes:getSupportedBinaryRepoTypes,
      getSupportedVCSTypes:getSupportedVCSTypes,
      getSupportedCITypes:getSupportedCITypes
    });
  }

  angular.module('fusioncloud.metadata.erd')
    .factory('erdDataService', ERDDataService);
})();