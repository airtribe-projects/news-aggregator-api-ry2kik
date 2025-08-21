# News Aggregator API

A Node.js RESTful API for user registration, authentication, managing user news preferences, and fetching news articles based on those preferences.

## Features

- **User Registration** (`POST /users/signup`):
	- Register a new user with name, email, password, and optional preferences.
	- Passwords are hashed using bcrypt.
	- Input validation for required fields, email format, and strong password.

- **User Login** (`POST /users/login`):
	- Login with email and password.
	- Returns a JWT token on successful login.
	- Passwords are compared using bcrypt.

- **Authentication Middleware**:
	- Protects routes using JWT tokens (from `Authorization: Bearer <token>` header or cookies).
	- Returns 401 for unauthorized access.

- **User Preferences**:
	- `GET /users/preferences`: Retrieve the logged-in user's preferences.
	- `PUT /users/preferences`: Update the logged-in user's preferences (must be an array).

- **News Fetching** (`GET /news`):
	- Fetches news articles from NewsAPI for each user preference.
	- Returns articles grouped by topic.

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- bcrypt (password hashing)
- jsonwebtoken (JWT authentication)
- axios (external API calls)
- validator (input validation)

## API Endpoints

### Auth & User
- `POST /users/signup` — Register a new user
- `POST /users/login` — Login and receive JWT token

### Preferences
- `GET /users/preferences` — Get user preferences (protected)
- `PUT /users/preferences` — Update user preferences (protected)

### News
- `GET /news` — Fetch news articles based on user preferences (protected)

## Example Request/Response

### Register
```http
POST /users/signup
{
	"name": "Clark Kent",
	"email": "clark@superman.com",
	"password": "Krypt()n8",
	"preferences": ["movies", "comics"]
}
```

### Login
```http
POST /users/login
{
	"email": "clark@superman.com",
	"password": "Krypt()n8"
}
Response: { "token": "..." }
```

### Get Preferences
```http
GET /users/preferences
Authorization: Bearer <token>
Response: { "preferences": ["movies", "comics"] }
```

### Update Preferences
```http
PUT /users/preferences
Authorization: Bearer <token>
{
	"preferences": ["movies", "comics", "games"]
}
Response: { "preferences": ["movies", "comics", "games"] }
```

### Get News
```http
GET /news
Authorization: Bearer <token>
Response: { "news": [ { "topic": "movies", "articles": [...] }, ... ] }
```

## Running Locally

1. Clone the repo and install dependencies:
	 ```bash
	 npm install
	 ```
2. Set up a `.env` file with your MongoDB connection string:
	 ```env
	 MONGO_URL=mongodb://localhost:27017/news-aggregator
	 ```
3. Start the server:
	 ```bash
	 npm start
	 ```

## Testing

- Run all tests:
	```bash
	npx tap test/server.test.js
	```

## Folder Structure
- `app.js` — Main app entry point
- `Controller/app.controller.js` — Business logic for user and news endpoints
- `middleware/auth.js` — JWT authentication middleware
- `model/user.model.js` — Mongoose user schema
- `routes/app.routes.js` — User and preferences routes
- `utils/validation.js` — Input validation logic
- `test/server.test.js` — Automated tests

## License
MIT


