# nearEAT Project

NearEAT was inspired by the idea of the KM0 SlowFood Community and by the importance of supporting local businesses as well as being mindful of the food we eat and where it comes from. Km0 is a concept which involves restaurants that only cook their dishes with seasonal ingredients sourced locally, they support ecological agriculture and the use of fish captured sustainably. The main idea of this project is to have all of these restaurants in one web application which will give these businesses more visibility and will encourage people to be more conscious and sustainable when eating out.

## Technologies

The main technologies used to develop this project were:
- NodeJs and Express for the backend.
- ReactJs, Javascript ES6, HTML and Css for the frontend.
* [JsonWebToken]https://jwt.io/introduction/ :Used for authentication.
* []https://jwt.io/introduction/
* https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
* https://tympanus.net/codrops/2013/05/21/natural-language-form-with-custom-input-elements/
* https://reactrouter.com/web/guides/quick-start

## User Flow Diagram

<a href="https://app.flowmapp.com/projects/139573/userflow/90525/">User Flow</a>

## Database schema

<img src="images/db%20schema.jpg" >

## API Routes Plan

<img src="images/API%20route%20design%201.JPG" >
<img src="images/API%20route%20design%202.JPG" >
<img src="images/API%20route%20design%203.JPG" >

## Full Stack Architecture Drawing

<img src="images/architecture%20drawing.jpg" >

## Setup

### Dependencies

Run `yarn` on root folder to install dependencies related to Express.

`cd client` and run `yarn` install dependencies related to React.

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Add a `.env` file to the main folder of this repository containing the MySQL authentication information for MySQL user.

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=km0_project
  DB_PASS=
```

- Run `yarn migrate` in the main folder of this repository. This will create the database and the tables you need for this project in your database.

### Add env variables

On the root folder for accessing the api port and for token authentication:

```bash
  PORT=5000
  SUPER_SECRET=
```

On the client folder to access the google maps api:

```bash
  REACT_APP_GOOGLE_API_KEY=
```
In order to have a google maps api key, you will have to sign up for the service through their website: <a href="https://console.cloud.google.com/">Google Cloud Platform</a>

### Run Your Development Servers

- Run `yarn start` in the project directory to start the servers.
- You can test your client app in `http://localhost:3000`
- You can test your API in `http://localhost:5000/api`

## Notes

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
