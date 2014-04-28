'use strict'

angular.module('grooveangularApp')
  .controller 'MainCtrl', ['$scope', 'grooveshark', '$log', ($scope,grooveshark,$log) ->
    
    $scope.songs = []

    #$scope.$watchCollection 'songs', (newItems,oldItems)->
    #	angular.forEach newItems, (song,index) ->
    #		grooveshark.stream song.SongID, (data)->
    #			song.Stream = data.streamKey

    $scope.search = (title,artist,max) ->
      $scope.songs = []
      $log.info 'START SEARCH'
      grooveshark.search title, artist, max
      , (songs) ->
      	$scope.songs = data

    $scope.pull = (title,artist,max) ->
      $scope.songs = []
 
      source = new EventSource('/songs');

      $log.info 'START PULL'
      source.onmessage = (event) ->
        song = JSON.parse(event.data)
        $log.info 'song: %j', song

  ]
