# Km0 Project

## Documentation

## User Flow Diagram

## Database schema

## API Routes Plan

## Full Stack Architecture Drawing

## Setup

### Dependencies

Run `yarn` on root folder to install dependencies related to Express.

`cd client` and run `yarn` install dependencies related to React.

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Add a `.env` file to the main folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=km0-project
  DB_PASS=YOURPASSWORD
```

<!-- PENDING DATABASE SET UP -->
<!-- - Run `yarn migrate` in the main folder of this repository, in a new terminal window. This will create the database and the tables you need for this project in your database. -->

### Run Your Development Servers

- Run `yarn start` in the project directory to start the servers.
- You can test your client app in `http://localhost:3000`
- You can test your API in `http://localhost:5000/api`

## Notes

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
