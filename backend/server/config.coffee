process.env.NODE_ENV='production' if not process.env.NODE_ENV?
#
# Module dependencies
#
express        = require 'express'
bodyParser     = require 'body-parser'
morgan         = require 'morgan'
methodOverride = require 'method-override'
errorHandler   = require 'errorhandler'
#io             = require 'socket.io'
litesocket     = require 'litesocket'              # OK - best
#serverEvent    = require('server-event')()         # OK - missing event
#sse            = require('connect-sse')()          # OK - missing event
#sseSender      = require('expressemitter')()
#SSE             = require 'express-sse'
#eventsource    = require('express-eventsource')()  # KO

path           = require 'path'
api            = require path.join(__dirname, 'api')

app = module.exports = express()
#io = io.listen app

#
# Configuration
#
assetsPath = path.join(__dirname, '..')

# all environments
if app.get('env') is 'development'
	app.use morgan('dev')
else 
	app.use morgan()
app.use bodyParser()
app.use methodOverride()

if app.get('env') is 'development'
	app.use errorHandler()
	app.use require('connect-livereload')()

app.use(express.static(assetsPath))
app.use '/', express.static(path.join(assetsPath, '..', 'app')) if app.get('env') is 'development'

# app.use app.router



# production only
# if app.get('env') is 'production'
  # TODO

#
# Routes
#

# JSON API
app.get '/api/name', api.name
app.get '/grooveshark/songs', api.songs

app.get '/grooveshark/stream', api.stream
app.get '/api/env', (req,res) ->
	res.send JSON.stringify(process.env,null,2)


#app.get '/songs', serverEvent, (req, res) ->
#	res.sse "event with name test" 
#	res.sse 'default event name message'
#	return

#app.get '/songs', sse, (req, res) ->
#	res.json("event with name test");
#	res.json('default event name message');
#	return

#app.sse = litesocket.handler
#app.sse '/songs2', (req,res) ->
#	res.send("event with name test");
#	res.send('default event name message');
#	return

#litesocket.welcome = ''
app.get '/songs', litesocket, (req,res) ->
	id = 0
	res.send "event with name test", {event: "song", id: ++id}
	res.send 'default event name message', {event: "song", id: ++id}
	return

# serve index for all other routes
app.get '*', (req, res) -> res.sendfile "#{assetsPath}/index.html"

