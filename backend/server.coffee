#
# Module dependencies
#

app = require './server/config'

#
# Start Server
#
port = process.env.PORT || 3000
server = app.listen port, ->
    console.log 'Listening on port %d', server.address().port

