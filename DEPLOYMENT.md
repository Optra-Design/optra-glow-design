
# Deployment Guide

## GitHub Integration

1. **Connect to GitHub**:
   - Click the GitHub button in the top right of Lovable
   - Authorize the Lovable GitHub App
   - Create a new repository

2. **Environment Variables**:
   - Supabase URL and keys are already configured in the code
   - No additional environment variables needed for basic functionality

## Netlify Deployment

### Automatic Deployment (Recommended)

1. **Connect Netlify to GitHub**:
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Environment Variables** (if needed):
   - Add any custom environment variables in Netlify dashboard
   - Supabase credentials are hardcoded for production use

### Manual Deployment

1. **Build the project**:
   ```bash
   npm install
   npm run build
   ```

2. **Deploy the `dist` folder** to any static hosting service

## Features Included

- ✅ Authentication with secure founder credentials
- ✅ Secure encrypted chat system
- ✅ UPI payment request functionality
- ✅ Blog system with proper loading
- ✅ Customer support chat
- ✅ OptraBot AI assistant
- ✅ Production-ready configuration
- ✅ GitHub Actions for CI/CD
- ✅ Netlify deployment configuration

## Security Features

- End-to-end encryption for all chat messages
- Secure founder credential management
- Row-level security on all database tables
- Proper authentication state management
- CORS headers and security configurations

## Founder Access

- Login: `aniketh@optra.me`
- Password: `Lendmybooks`
- Role: Admin with full access
- Can receive and send UPI payment requests
- Access to all chat conversations

The app is now production-ready and optimized for GitHub + Netlify deployment!
