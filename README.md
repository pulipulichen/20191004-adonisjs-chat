# Adonis fullstack application

# Document

- https://adonisjs.com/docs/4.1/lucid
- Project: https://github.com/pulipulichen/20191004-adonisjs-chat
- Issues: https://github.com/pulipulichen/20191004-adonisjs-chat/issues

- For test: https://pulipulichen.github.io/20191004-adonisjs-chat/index.html

----

# How to start

1. Download source code from https://github.com/pulipulichen/20191004-adonisjs-chat/archive/master.zip
2. Unzip
3. Open folder in terminal
4. For first run, execute command: `npm run init` . After installing finished, open URL browser: http://127.0.0.1:3000 .
5. For following run in development, execute command: `npm run 0.development` and open URL browser: http://127.0.0.1:3000 .
6. For following run in production, execute command: `npm run 1.production` .

Default URL list:

- CORS test website: http://127.0.0.1:3000
- Main AdonisJS server: http://127.0.0.1:3333
- AdonisJS https server for test: http://127.0.0.1:4444 (Run `npm run start-https` first)

----

# AdonisJS Commands


# Database Migration

https://adonisjs.com/docs/4.1/migrations#_creating_migrations

````
adonis make:migration users
adonis migration:run
adonis migration:refresh
````

# Model

https://adonisjs.com/docs/4.1/lucid

````
adonis make:model User
````

# Route Controller

https://adonisjs.com/docs/4.1/controllers

````
adonis make:controller User --type http
````

----

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
