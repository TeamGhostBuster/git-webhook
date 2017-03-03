var exec = require('exec')
var express = require('express')
var json = require('express-json')
var bodyParser = require('body-parser')

const PORT = 9988
const REPO_URL = 'https://github.com/TeamGhostBuster/restful-api.git'
const API_REPO_NAME = 'server'
const CLIENT_REPO_URL = 'https://github.com/TeamGhostBuster/CollaborativeList.git'
const CLIENT_REPO_NAME = 'CollaborativeList'

var app = express()
app.use(json())
app.use(bodyParser.json())

app.post('/restful-api', function(req, res) {
  commit_sha = console.log(req.body.after)
  var commands = [
    'cd ' + API_REPO_NAME,
    'git reset --hard',
    'git pull',
    'docker-compose restart -d'
  ].join(' && ')
  if (req.body.ref === 'refs/heads/master') {
    exec(commands, function(err, out, code) {
      if (err instanceof Error) {
        res.status(500).send('Server Internal Error')
        throw err
      }
      process.stderr.write(err)
      process.stdout.write(out)
      res.status(200).send('Deploy Done')
    })
  }
})

app.post('/raspberry', function(req, res) {
  commit_sha = console.log(req.body.after)
  var commands = [
    'cd ' + CLIENT_REPO_NAME,
    'git reset --hard',
    'git pull',
    'chmod +x build.sh',
    'sh build.sh'
  ].join(' && ')
  if (req.body.ref === 'refs/heads/master') {
    exec(commands, function(err, out, code) {
      if (err instanceof Error) {
        res.status(500).send('Server Internal Error')
        throw err
      }
      process.stderr.write(err)
      process.stdout.write(out)
      res.status(200).send('Deploy Done')
    })
  }
})

app.listen(PORT, function() {
  console.log('Git-Webhook started.')
})
