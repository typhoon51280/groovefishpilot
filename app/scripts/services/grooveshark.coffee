'use strict'

angular.module('grooveangularApp')
  .factory 'grooveshark', ['$http', ($http) ->
    
    grooveshark = {}
    	
    grooveshark.stream = (songId,callback) ->
      config = params: { songId: songId }
      $http.get('/grooveshark/stream', config).success (data) ->
        callback data
  	
    grooveshark.search = (title,artist,max,callback) ->
      config = params: { title: title, artist: artist, max: max }
      $http.get('/grooveshark/songs', config).success (data) ->
        callback data

    return grooveshark
  
  ]