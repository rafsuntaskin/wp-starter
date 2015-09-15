angular.module('starter.services', [])

.factory('DataLoader', function( $http ) {

  return {
    get: function(url) {
      // Simple index lookup
      return $http({
        url: url,
        method: 'GET'
      });
    },

  }

});