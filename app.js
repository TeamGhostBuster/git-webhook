var http = require('http')
var exec = require('exec')

const PORT = 9988
const REPO_URL = 'https://github.com/TeamGhostBuster/server.git'
const REPO_NAME = 'server'

var deployServer = http.createServer(function (request, response) {
  if (request.url.search(/deploy\/?$/i) > 0) {
    var commands = [
      'rm -rf ' + REPO_NAME,
      'git clone --no-local ' + REPO_URL,
      'cd ' + REPO_NAME,
      'forever start -c python3 run.py'
    ].join(' && ')

    exec(commands, function (err, out, code) {
      if (err instanceof Error) {
        response.writeHead(500)
        response.end('Server Internal Error.')
        throw err
      }
      process.stderr.write(err)
      process.stdout.write(out)
      response.writeHead(200)
      response.end('Deploy Done.')
    })
  } else {
    response.writeHead(404)
    response.end('Not Found.')
  }
})

deployServer.listen(PORT)
