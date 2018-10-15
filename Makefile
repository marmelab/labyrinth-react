MAKEFLAGS += --silent

DOCKER_COMPOSE = docker-compose -p labyrinth-react
export $UID = $(id -u)
export $GID = $(id -g)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install:
	$(DOCKER_COMPOSE) run --no-deps --rm api ash -ci 'npm install'

run: start
start: ## Start the server
	$(DOCKER_COMPOSE) up -d

stop: ## Stop the server
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

connect-api:
	$(DOCKER_COMPOSE) run --no-deps --rm api ash

test:
	$(DOCKER_COMPOSE) run --no-deps --rm api ash -ci 'npm test'

test-watch:
	$(DOCKER_COMPOSE) run --no-deps --rm api ash -ci 'npm run test:watch'

lint:
	npm run lint

build-front:
	npm run react-build
	# mkdir -p dist
	# cp -rp build/* dist/src/
	# cp src/index.html dist/src/

build-server:
	mkdir -p dist/server
	cp server/index.js dist/server/

build:
	rm -rf dist
	mkdir -p dist
	$(MAKE) build-front
	$(MAKE) build-server

deploy-front: build-front
	aws s3 rm s3://labyrinth-react/*
	aws s3 sync ./build s3://labyrinth-react/

deploy-server: build-server
	scp -r Makefile package.json docker-compose.yaml dist/server labyrinth-react:app/
	ssh labyrinth-react 'cd app && make stop run'

deploy-all: deploy-front deploy-server

clean:
	rm -rf dist

.DEFAULT_GOAL := help
