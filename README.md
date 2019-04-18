<table>
        <tr>
            <td><img width="120" src="https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/rocket.svg" alt="onboarding" /></td>
            <td><strong>Archived Repository</strong><br />
            The code of this repository was written during a <a href="https://marmelab.com/blog/2018/09/05/agile-integration.html">Marmelab agile integration</a>. It illustrates the efforts of a new hiree, who had to implement a board game in several languages and platforms as part of his initial learning. Some of these efforts end up in failure, but failure is part of our learning process, so the code remains publicly visible.<br />
        <strong>This code is not intended to be used in production, and is not maintained.</strong>
        </td>
        </tr>
</table>

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
