(function(){

  'use strict';

  //This goes of when ERD Implementation is there on backend
  var DUMMY_ERDS = [
    {
      "id":1,
      "name": "ACME-ERD",
      "description": "This is a definition for external resource configuration",
      "state": "DRAFT",
      "ciServer": {
        "type": "Jenkins",
        "version" : "1.0",
        "serverUrl": "http://assembla.acme.com/",
        "username": "myusername",
        "password": "mypassword"
      },
      "versionControlSystem": {
        "type": "SVN",
        "version" : "1.0",
        "url": "http://acme.com/vcs",
        "username": "my_version_control_username",
        "password": "my_version_control_password"
      },
      "binaryRepository": {
        "type": "Artifactory",
        "version" : "1.0",
        "repositoryUrl": "http://acme.com/artifactory",
        "username": "my_binary_repo_username",
        "password": "my_binary_repo_password"
      }
    },
    {
      "id":2,
      "name": "ACME1-ERD",
      "description": "This is a definition for external resource configuration",
      "state": "DRAFT",
      "ciServer": {
        "type": "Jenkins",
        "version" : "2.0",
        "serverUrl": "http://assembla.acme1.com/",
        "username": "myusername",
        "password": "mypassword"
      },
      "versionControlSystem": {
        "type": "SVN",
        "version" : "2.0",
        "url": "http://acme1.com/vcs",
        "username": "my_version_control_username",
        "password": "my_version_control_password"
      },
      "binaryRepository": {
        "type": "Artifactory",
        "version" : "2.0",
        "repositoryUrl": "http://acme1.com/artifactory",
        "username": "my_binary_repo_username",
        "password": "my_binary_repo_password"
      }
    },
    {
      "id":3,
      "name": "ACME3-ERD",
      "description": "This is a definition for external resource configuration",
      "state": "DRAFT",
      "ciServer": {
        "type": "Jenkins",
        "version" : "3.0",
        "serverUrl": "http://assembla.acme3.com/",
        "username": "myusername",
        "password": "mypassword"
      },
      "versionControlSystem": {
        "type": "SVN",
        "version" : "3.0",
        "url": "http://acme3.com/vcs",
        "username": "my_version_control_username",
        "password": "my_version_control_password"
      },
      "binaryRepository": {
        "type": "Artifactory",
        "version" : "3.0",
        "repositoryUrl": "http://acme3.com/artifactory",
        "username": "my_binary_repo_username",
        "password": "my_binary_repo_password"
      }
    },
    {
      "id":4,
      "name": "ACME4-ERD",
      "description": "This is a definition for external resource configuration",
      "state": "DRAFT",
      "ciServer": {
        "type": "Jenkins",
        "version" : "1.0",
        "serverUrl": "http://assembla.acme4.com/",
        "username": "myusername",
        "password": "mypassword"
      },
      "versionControlSystem": {
        "type": "SVN",
        "version" : "2.0",
        "url": "http://acme4.com/vcs",
        "username": "my_version_control_username",
        "password": "my_version_control_password"
      },
      "binaryRepository": {
        "type": "Artifactory",
        "version" : "3.0",
        "repositoryUrl": "http://acme4.com/artifactory",
        "username": "my_binary_repo_username",
        "password": "my_binary_repo_password"
      }
    }
  ];

  // Infrastructure Provider Data Service
  function ERDDuumyDataService(ERD_CONSTANTS,$q){

    function getAll(){
      return DUMMY_ERDS;
      //return [];
    }

    function getOne(id){
      id = parseInt(id);
      return  _.find(DUMMY_ERDS,function(erd){
        return erd.id === id;
      });
    }

    function createOne(obj){
      var deferred = $q.defer();

      setTimeout(function() {
        obj.id = _.random(99999999999);
        DUMMY_ERDS.push(obj);
        deferred.resolve();
      }, 1000);

      return deferred.promise;
    }

    function updateOne(obj){

      var deferred = $q.defer();

      setTimeout(function() {
        var i = _.findIndex(DUMMY_ERDS, function(erd) {
          return erd.id === obj.id;
        });
        DUMMY_ERDS[i] = obj;
        deferred.resolve();
      }, 1000);

      return deferred.promise;
    }

    return {
     getAll: getAll,
     getOne: getOne,
     createOne: createOne,
     updateOne: updateOne
    };
  }

  angular.module('fusioncloud.metadata.erd')
    .factory('erdMockDataService', ERDDuumyDataService);
})();