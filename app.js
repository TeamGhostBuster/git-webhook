var exec = require('exec')
var express = require('express')
var json = require('express-json')
var bodyParser = require('body-parser')

const PORT = 9988
const REPO_URL = 'https://github.com/TeamGhostBuster/server.git'
const REPO_NAME = 'server'

var app = express()
app.use(json())
app.use(bodyParser.json())


app.post('/deploy', function (req, res) {
  commit_sha = console.log(req.body.after)
  var commands = [
    'rm -rf ' + REPO_NAME,
    'git clone ' + REPO_URL,
    'cd ' + REPO_NAME,
    'git config core.sparsecheckout',
    'git checkout -f ' + commit_sha,
    'docker-compose up --force-recreate -d'
  ].join(' && ')

  exec(commands, function (err, out, code) {
    if (err instanceof Error) {
      res.status(500).send('Server Internal Error')
      throw err
    }
    process.stderr.write(err)
    process.stdout.write(out)
    res.status(200).send('Deploy Done')
  })
})


app.listen(PORT, function () {
  console.log('Git-Webhook started.')
})
