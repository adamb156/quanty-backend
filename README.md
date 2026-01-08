# Quanty Backend - NestJS CMS API

Backend API dla strony Quanty - agencji interaktywnej. System CMS z pełną obsługą wielojęzyczności, zarządzaniem projektami, blogiem i formularzem kontaktowym.

## 🚀 Tech Stack

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **Nodemailer** - Email service
- **TypeScript** - Type safety

## 📋 Features

- ✅ JWT Authentication
- ✅ User management with password change
- ✅ Multi-language support (PL/EN)
- ✅ Project portfolio management
- ✅ Blog with rich content
- ✅ Contact form with email notifications
- ✅ Service categories management
- ✅ File uploads
- ✅ SEO-friendly slugs
- ✅ CMS settings

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your credentials
nano .env

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with admin user
npm run prisma:seed
```

## 🏃 Running the app

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## 📊 Database

```bash
# Open Prisma Studio (DB GUI)
npm run prisma:studio

# Create new migration
npm run prisma:migrate

# Reset database
npx prisma migrate reset
```

## 🔑 Default Admin Credentials

After seeding the database:
- **Email:** admin@quanty.com
- **Password:** ChangeThisPassword123!

**⚠️ Change these credentials immediately after first login!**

## 📡 API Endpoints

### Auth
- `POST /auth/login` - Login
- `POST /auth/register` - Register (disabled in production)
- `GET /auth/profile` - Get current user

### Users
- `GET /users` - List users
- `PATCH /users/:id` - Update user
- `PATCH /users/:id/password` - Change password

### Projects
- `GET /projects` - List projects
- `GET /projects/:slug` - Get project by slug
- `POST /projects` - Create project (auth required)
- `PATCH /projects/:id` - Update project (auth required)
- `DELETE /projects/:id` - Delete project (auth required)

### Blog
- `GET /blog` - List posts
- `GET /blog/:slug` - Get post by slug
- `POST /blog` - Create post (auth required)
- `PATCH /blog/:id` - Update post (auth required)
- `DELETE /blog/:id` - Delete post (auth required)

### Services
- `GET /services` - List services
- `POST /services` - Create service (auth required)
- `PATCH /services/:id` - Update service (auth required)
- `DELETE /services/:id` - Delete service (auth required)

### Contact
- `GET /contact` - List messages (auth required)
- `POST /contact` - Submit contact form
- `PATCH /contact/:id/read` - Mark as read (auth required)

### Categories
- `GET /categories` - List categories
- `POST /categories` - Create category (auth required)

### Settings
- `GET /settings` - Get all settings
- `PATCH /settings` - Update settings (auth required)

### Upload
- `POST /upload` - Upload file (auth required)

## 🌐 Environment Variables

See `.env.example` for all required environment variables.

## 📝 License

MIT

## 👨‍💻 Author

Quanty - Interactive Agency
