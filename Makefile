MAKEFLAGS += --silent

DOCKER_COMPOSE = docker-compose -p labyrinth-react

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

.DEFAULT_GOAL := help
