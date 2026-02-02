# EventBright - Enterprise Event Management Platform

A complete, enterprise-grade event management website built with Node.js, Express, PostgreSQL, and vanilla JavaScript.

## Features

- **Event Discovery**: Browse events with search, filters, sorting, and pagination
- **Event Details**: Dedicated pages for each event with full information
- **Event Hosting**: Create and manage events with image upload
- **User Authentication**: Secure login/signup with password hashing and sessions
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile
- **Accessibility**: ARIA labels and semantic HTML
- **SEO Optimized**: Meta tags and SEO-friendly URLs
- **Analytics Ready**: Google Analytics integration

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: bcryptjs, express-session
- **File Upload**: Multer
- **Deployment**: Docker & Docker Compose

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eventbright
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Start PostgreSQL (if not using Docker):
```bash
# Ensure PostgreSQL is running
```

5. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

6. Serve the frontend:
```bash
# Use any static file server (e.g., Live Server in VS Code)
# Or use Python: python -m http.server 5500
```

### Docker Deployment

1. Build and start services:
```bash
docker-compose up -d
```

2. Access the application:
- Backend: `http://localhost:5000`
- Frontend: Serve static files or use nginx

## Project Structure

```
eventbright/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── upload.js
│   ├── models/
│   │   ├── Event.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── events.js
│   └── server.js
├── frontend/
│   ├── js/
│   │   └── common.js
│   ├── about.html
│   ├── auth.html
│   ├── event-details.html
│   ├── events.html
│   ├── host-event.html
│   └── index.html
├── docker-compose.yml
├── Dockerfile
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Events
- `GET /api/events` - Get all events (with pagination, search, filters)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events/create` - Create new event

## Environment Variables

See `.env.example` for all required environment variables.

## Security Features

- Password hashing with bcryptjs
- Session-based authentication
- Input validation with express-validator
- CORS configuration
- Secure cookie settings

## Accessibility

- ARIA labels on interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

## SEO

- Meta descriptions on all pages
- Semantic HTML
- Clean URL structure
- Open Graph tags ready

## License

ISC

## Support

For support, email support@eventbright.com
