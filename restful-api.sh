rm -rf restful-api
git clone https://github.com/TeamGhostBuster/restful-api.git
cd restful-api
docker-compose stop flaskapp && docker-compose rm -f flaskapp && flaskapp up -d
