# Authentication Setup Guide

## Supabase Configuration Required

### 1. Enable Email Authentication

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/ghfzwtoatvwbgighcxzr
2. Navigate to **Authentication > Settings**
3. Ensure **Email** provider is enabled (default)
4. **Email confirmation** should be enabled

### 2. Update Auth Settings

1. Set **Site URL**: `http://localhost:3000`
2. Add **Redirect URLs**: 
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000`

### 3. Database Setup

1. Run the main schema: `lib/database/schema.sql`
2. Run the auth trigger: `lib/database/auth-trigger.sql`

This creates automatic profile creation when users register.

## Features Implemented

✅ **Email/Password Authentication**
- User registration with email verification
- Login with email and password
- Password reset functionality

✅ **Email OTP Authentication**  
- Login with email OTP (passwordless)
- OTP verification via email
- Email verification during registration

✅ **User Management**
- Protected routes with middleware
- User profile creation
- Role-based access (customer/vendor)
- Account dashboard

✅ **Security Features**
- Row Level Security policies
- Authentication state management
- Automatic redirects for protected routes

## Usage

1. **Registration**: `/auth/register`
   - Creates account with email + phone verification
   - Supports customer/vendor roles

2. **Login**: `/auth/login`
   - Email/password or phone OTP options
   - Automatic redirect after login

3. **Account**: `/account`
   - Protected route requiring authentication
   - Shows user profile and account options

## Testing

1. Start the development server: `pnpm dev`
2. Visit `/auth/register` to create an account
3. Complete phone verification with OTP
4. Login at `/auth/login`
5. Access protected `/account` page

**Note**: Email OTP works out of the box with Supabase's built-in email service.