var exec = require('exec')
var express = require('express')
var app = express()

const PORT = 9988
const REPO_URL = 'https://github.com/TeamGhostBuster/server.git'
const REPO_NAME = 'server'

var commands = [
  'rm -rf ' + REPO_NAME,
  'git clone --no-local ' + REPO_URL,
  'cd ' + REPO_NAME,
  'python3 setup.py install --user --prefix=',
  'forever start -c python3 run.py'
].join(' && ')

// deployServer.listen(PORT)
app.post('/deploy', function (req, res) {
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
