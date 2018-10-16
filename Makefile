MAKEFLAGS += --silent

DOCKER_COMPOSE = docker-compose -p labyrinth-react -f docker-compose.yaml
DOCKER_COMPOSE_DEV = docker-compose -p labyrinth-react -f docker-compose.yaml -f docker-compose.dev.yaml

export $UID = $(id -u)
export $GID = $(id -g)

DIST_SERVER = dist/server
DIST_CLIENT = dist/client
FILES_SERVER := $(shell find ./server ! -path "*.spec.js" -type f)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install:
	$(DOCKER_COMPOSE_DEV) run --no-deps --rm api ash -ci 'npm install'

run: start
start: ## Start the server
	$(DOCKER_COMPOSE_DEV) up -d

stop: ## Stop the server
	$(DOCKER_COMPOSE_DEV) down

logs:
	$(DOCKER_COMPOSE_DEV) logs -f

start-prod: ## Start the server on EC2 server
	$(DOCKER_COMPOSE) up -d

stop-prod: ## Stop the server
	$(DOCKER_COMPOSE) down

logs-prod:
	$(DOCKER_COMPOSE) logs -f

connect-api:
	$(DOCKER_COMPOSE_DEV) run --no-deps --rm api ash

connect-client:
	$(DOCKER_COMPOSE_DEV) run --no-deps --rm client ash

test:
	$(DOCKER_COMPOSE_DEV) run --no-deps --rm api ash -ci 'npm test'

test-watch:
	$(DOCKER_COMPOSE_DEV) run --no-deps --rm api ash -ci 'npm run test:watch'

lint:
	npm run lint

build:
	$(MAKE) build-front
	$(MAKE) build-server

build-front:
	rm -rf $(DIST_CLIENT)
	mkdir -p $(DIST_CLIENT)
	npm run react-build
	mv build/* $(DIST_CLIENT)
	rm -rf build

build-server:
	rm -rf $(DIST_SERVER)
	mkdir -p $(DIST_SERVER)
	cp $(FILES_SERVER) $(DIST_SERVER)

deploy-front: build-front
	aws s3 rm s3://labyrinth-react --recursive
	aws s3 sync $(DIST_CLIENT) s3://labyrinth-react/

deploy-server: build-server
	scp -r Makefile package.json docker-compose.yaml $(DIST_SERVER) labyrinth-react:app/
	ssh labyrinth-react 'cd app && make stop-prod start-prod'

deploy-all: deploy-front deploy-server

clean:
	rm -rf dist $(DIST_SERVER) $(DIST_CLIENT)

.DEFAULT_GOAL := help
