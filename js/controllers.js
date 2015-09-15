angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Enter your site url here, leaving the /wp-json/wp/v2 part. You must have the WP-API v2 plugin activated on this site
  $rootScope.url = 'http://scottbolinger.com/wp-json/wp/v2/';

})

.controller('PostsCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {

    console.log('PostsCtrl');

    $scope.loadPosts = function() {

      DataLoader.get( $rootScope.url + 'posts' ).then(function(response) {
        $scope.posts = response.data;
        console.log( response.data );
      }, function(response) {
        console.log('error', response);
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        DataLoader.get( $rootScope.url + 'posts' + '?page=' + pg ).then(function(response) {

          angular.forEach( response.data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( response.data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }, function(response) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

.controller('PostCtrl', function($scope, $stateParams, DataLoader, $ionicLoading, $rootScope, $sce ) {

  $ionicLoading.show({
      noBackdrop: true
    });

  var singlePostApi = $rootScope.url + 'posts/' + $stateParams.postId;

  DataLoader.get( singlePostApi ).then(function(response) {
      $scope.post = response.data;
      // Don't strip post html
      $scope.content = $sce.trustAsHtml(response.data.content.rendered);
      $ionicLoading.hide();
    }, function(response) {
      console.log('error', response);
    });

});