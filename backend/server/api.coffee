# Serve JSON to our AngularJS client
GS = require('/home/vincenzo/Work/nodews/node-grooveshark-streaming')

exports.name = (req, res) -> res.json name: "Bob"

exports.songs = (req, res) ->
	max = if req.query.max? then req.query.max else 10
	max = 20 if max>20
	title =  if req.query.title? then req.query.title else '' 
	artist = if req.query.artist? then req.query.artist else '' 
	#console.log title
	#console.log artist
	#console.log max
	GS.Tinysong.getSongInfoResults title, artist, max
	, (err, songs) -> 
		if (err!=null)
			console.log err
		songs = [] if not songs?
		res.json songs

exports.stream = (req, res) ->
	songId = req.query.songId
	GS.Grooveshark.getStreamingUrl songId
	, (err, streamKey) ->
		if (err!=null)
			console.log err
		#streamKey = {} if not streamKey?
		res.json songId: songId, streamKey: streamKey

exports.songsEvents = (req, res) ->
	console.log 'START songsEvents'
	max = if req.query.max? then req.query.max else 10
	max = 20 if max>20
	title =  if req.query.title? then req.query.title else '' 
	artist = if req.query.artist? then req.query.artist else '' 
	GS.Tinysong.getSongInfoResults title, artist, max
	, (err, songs) -> 
		if (err!=null)
			console.error err
		else
			console.log 'END songsEvents'
	, (err, song) ->
		if (err!=null)
			console.error err
		song = {} if not songs?
		res.json song