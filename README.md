# urbansky-inventory

### Urban Sky Inventory Management System

### Running the docker-compose file will run the db, the API, and the web frontend all at the same time, each in their own containers.


### Dependencies / System Requirements
* Docker must be installed on your machine
* The docker-compose was made to ensure compatibility with Mac ARM chipset. If you are running a different CPU architecture, you may need to change any line with `platform: linux/amd64` accordingly.

### Running the Project Locally
Copy the .env.local file to a new .env file. Then, run: 
```$ sh start-local.sh```

### Nuking the Project Locally
```$ sh nuke-local.sh```

### Environment Variables
.env at the root level contains all the environment variables the whole project needs

### Environment Variables
.env.dist file is a template for all of the app's environment variables

### URLs
* API: http://127.0.0.1:8080/items
* API Documentation: http://localhost:8080/docs
* Web UI: http://localhost:8000/items


### Environment Specifics
If the NODE_ENV environment variable is set to 'local', then sample data will be loaded into the database on build, to ease development.


###
The backend uses TypeBox to accomplish several goals all at once:
  1) It allows a model to be defined once, and all related models auto-generated, for example: a similar model with all non-id fields optional for updates.
  2) It auto-generates TypeScript types from those models, which can then be used by any functions, services, queries, etc.
  3) Models are then passed to API auto-validators to validate untrusted data coming into the API.
   This applies to request route params, request body, and response body (OpenAPI Spec 3.0).
   This eliminates needing to write almost all validation / rules checking by hand. For example, wherever necessary:
      - Enforce no fields are missing
      - Enforce if nullable
      - Enforce all fields are right data type
      - Enforce no extra fields / each extra fields stripped
      - Enforce formats like UUID, dates, min/max number values, min/max string lengths, etc.
  4) Models are also passed to Fastify as a schema, which provides Fastify with type infrencing, without needing to re-declare types to Fastify.
  5) Auto-generates API documentation (Swagger)
  6) Models allow fields to have a description documented right next to them, for more descriptive documentation.
