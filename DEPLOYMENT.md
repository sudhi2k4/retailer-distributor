# Deployment Guide - Vercel + Neon

## Step 1: Set Up Neon Database (Free)

1. Go to https://neon.tech
2. Sign up with GitHub (easier)
3. Create a new project
4. Copy the **Connection String** (looks like: `postgresql://user:password@host/dbname`)
5. Replace `?sslmode=require` at the end with `?sslmode=require&schema=public`

## Step 2: Update Prisma for PostgreSQL

Replace SQLite with PostgreSQL in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then run migrations:
```bash
npm run db:push
# or
npx prisma migrate dev --name init
```

## Step 3: Set Up GitHub

1. Initialize git (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create repo on GitHub.com
3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/distributor-retailer-platform.git
   git branch -M main
   git push -u origin main
   ```

## Step 4: Deploy to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. In Environment Variables, add:
   - `DATABASE_URL` → Paste your Neon connection string
   - `NODE_ENV` → `production`
5. Click Deploy
6. Wait 2-3 minutes for deployment

## Step 5: Run Database Migrations on Vercel

After first deployment:

1. Go to your Vercel deployment settings
2. Open "Functions" → look for API route logs
3. Or run locally then push:
   ```bash
   npx prisma migrate deploy
   ```

## Step 6: Test Your Live App

- Visit your Vercel URL (e.g., `your-app.vercel.app`)
- Test login and order creation
- Check that data persists

## Environment Variables Needed

```
DATABASE_URL=postgresql://...
NODE_ENV=production
```

## Troubleshooting

- **500 errors**: Check Vercel Function logs in dashboard
- **Database connection fails**: Verify Neon IP whitelist (usually auto-enabled)
- **Migrations fail**: Run `npx prisma migrate deploy` in Vercel CLI or terminal

## Optional: Set Up Preview Deployments

Vercel automatically creates preview URLs for each Pull Request - great for testing!

---

**Questions?** DM me and I'll help debug!
