# Gateway Manager



## Prerequisites to have installed

These are requirements to run the app in your local machine. In addition an
automatically deploy using docker was provided.

To have installed:

- Nodejs
  ```
  https://nodejs.org/en/download/
  ```
- Mongodb

  ```
  https://docs.mongodb.com/manual/installation/
  ```


Install requirements

```
npm install
```

```
Enviroment

To create .env, please use  envsample content and change for your own variable values
```

Run the app

```
npm run start
```

Run the app tests

```
npm run test
```

Run fixtures to populate the DB with initial data

```
npm run fixtures
```

## Deploy

```
https://docs.docker.com/compose/install/
```

```
docker-compose up --build
```

Once the Docker containers that run the app are up you can review the app from:

```
http://localhost:3000
```

API Rest documentation contract can find in 

```
http://localhost:3000/swagger
```