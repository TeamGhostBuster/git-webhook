var exec = require('exec')
var express = require('express')
var json = require('express-json')
var bodyParser = require('body-parser')

const PORT = 9988
const REPO_URL = 'https://github.com/TeamGhostBuster/restful-api.git'
const REPO_NAME = 'server'

var app = express()
app.use(json())
app.use(bodyParser.json())


app.post('/restful-api', function (req, res) {
  commit_sha = console.log(req.body.after)
  var commands = [
    'cd ' + REPO_NAME,
    'git reset --hard',
    'git pull',
    'git config core.sparsecheckout',
    'git checkout -f ' + commit_sha,
    'docker-compose restart -d'
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
