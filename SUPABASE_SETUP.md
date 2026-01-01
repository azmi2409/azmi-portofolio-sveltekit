# Supabase & Drizzle ORM Migration Guide

## Prerequisites
1. Create a Supabase account at https://supabase.com
2. Create a new project

## Setup Steps

### 1. Get your Supabase Database URL
1. Go to your Supabase project dashboard
2. Navigate to **Project Settings** > **Database**
3. Scroll down to **Connection string** section
4. Copy the **URI** format connection string
5. It will look like: `postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

### 2. Update your .env file
```bash
# Copy .env.example to .env
cp .env.example .env
```

Edit `.env` and add your DATABASE_URL:
```bash
DATABASE_URL=postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### 3. Generate and Push Database Schema
```bash
# Generate migration files
yarn db:generate

# Push schema to Supabase
yarn db:push
```

### 4. Seed the Database (Create Admin User)
```bash
yarn db:seed
```

This will create an admin user with:
- **Username**: `admin`
- **Password**: `admin123`

### 5. Verify Setup
1. Start your dev server: `yarn dev`
2. Navigate to http://localhost:5173/admin
3. Login with `admin` / `admin123`

## Database Management Commands

```bash
# Generate migration files from schema changes
yarn db:generate

# Apply migrations to database
yarn db:migrate

# Push schema directly to database (development)
yarn db:push

# Open Drizzle Studio (database GUI)
yarn db:studio

# Seed database with initial data
yarn db:seed
```

## Troubleshooting

### Connection Issues
- Ensure your DATABASE_URL is correct
- Check that your IP is allowed in Supabase (Settings > Database > Connection pooling)
- Verify your database password is correct

### Migration Issues
- If you get errors, try `yarn db:push` instead of `yarn db:migrate`
- Check Supabase dashboard for any database errors

### Authentication Issues
- Make sure you've run `yarn db:seed` to create the admin user
- Check that the users table exists in your database
- Verify the password hash in the database

## Schema Overview

### Posts Table
- `id` (UUID, primary key)
- `slug` (text, unique)
- `title` (text)
- `excerpt` (text)
- `content` (text)
- `featured_image` (text, nullable)
- `author` (text)
- `status` (enum: 'draft' | 'published')
- `categories` (text array)
- `tags` (text array)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `published_at` (timestamp, nullable)

### Users Table
- `id` (UUID, primary key)
- `username` (text, unique)
- `password_hash` (text)
- `email` (text, nullable)
- `created_at` (timestamp)

## Next Steps
- Change the default admin password after first login
- Add more admin users if needed
- Configure Supabase Row Level Security (RLS) for additional security
