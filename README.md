# labyrinth-react

Labyrinth game using Node and React

## Install

Install the game by building the docker containers.

```
make install
```

## Run

Start the game in docker containers

```
make start
```

## Stop

Stop docker containers

```
make stop
```

## Test

Run unit tests

```
make test | test-watch
```

## Lint

Run the linter to check the coding style

```
make lint
```

## Deployment

Deploy server API to EC2 and react client to S3

```
make deploy-all
```

## Clean

Removed generated files and repositories

```
make clean
```
