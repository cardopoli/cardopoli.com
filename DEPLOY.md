# Cardopoli Portfolio — Deployment Guide

## What You Have

A fully customizable portfolio site where:
- **Everything is editable through the CMS** (colours, fonts, columns, banner, logo)
- **Projects are managed as collections** (upload photos, add categories, organize instantly)
- **Free hosting on GitHub Pages** with your cardopoli.com domain
- **No code touching required** — all changes through the admin panel

---

## Step 1: Create Your GitHub Repository

1. Go to **github.com** and log in
2. Click **New** → name it `cardopoli.com`
3. Make it **Public**
4. Don't initialize with README
5. Click **Create repository**

---

## Step 2: Upload Files to GitHub

The easiest way: use GitHub's web interface.

1. On your new repo page, click **uploading an existing file**
2. Drag these folders/files into GitHub:
   - `index.html`
   - `admin/` (with config.yml and index.html)
   - `content/` (with settings.json, projects/, pages/)
   - `.github/` (with workflows/build.yml)

3. Click **Commit changes**

Alternatively, use Git:
```bash
cd cardopoli.com
git init
git add .
git commit -m "Initial setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cardopoli.com.git
git push -u origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to your repo → **Settings** (top right)
2. Click **Pages** (left sidebar)
3. Under "Source", select **main** and **/root**
4. Click **Save**

GitHub will deploy your site. You should see: "Your site is live at https://cardopoli.com" (or a GitHub URL temporarily).

---

## Step 4: Point Your GoDaddy Domain

1. Log into **GoDaddy.com**
2. Go to **My Products** → click **cardopoli.com**
3. Click **DNS** (left sidebar)
4. Delete old A records and add these four:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

5. Find or create a **CNAME** record for `www` pointing to `cardopoli.github.io`
6. Click **Save**

DNS can take 24 hours to propagate, but usually 15-30 mins.

---

## Step 5: Optionally Add a CNAME File

1. In your GitHub repo, create a new file called `CNAME`
2. Paste: `cardopoli.com`
3. Commit

---

## Step 6: Set Up Sveltia CMS

Once your site is live, go to **cardopoli.com/admin**

1. Click **Sign in with Token**
2. You'll see a link to generate a GitHub Personal Access Token
3. Click it (or go to **github.com/settings/tokens**)
4. Click **Generate new token** → **Generate new fine-grained personal access token**
5. Name: `cardopoli-cms`
6. Expiration: 90 days (regenerate anytime)
7. Under **Repository access**, select **Only select repositories** → choose `cardopoli.com`
8. Under **Permissions**, find **Contents** and select **Read and write**
9. Click **Generate token**
10. Copy the token
11. Paste it into the CMS prompt at cardopoli.com/admin

You're in!

---

## How to Use the CMS

### Customize the Site (Global Settings)

1. In the CMS, click **Site Settings** → **General Settings**
2. Here you can change:
   - **Desktop Columns**: 4, 6, 7, or 8
   - **Mobile Columns**: 1 or 2
   - **Background Colour**: pick any hex/colour
   - **Text Colour**: same
   - **Font Family**: VT323 (default), Inter, Georgia, Courier New, Arial, Helvetica
   - **Logo Size**: e.g., "18px"
   - **Banner GIF**: upload your full-viewport banner image
   - **Logo Image**: optional – replaces text logo
   - **Curved Image Edges**: toggle on/off
   - **Show Photo Overlay on Hover**: toggle on/off
   - **Show Sidebar**: toggle on/off

3. Click **Save** → changes are live in seconds

### Create a Project

1. Click **Projects** (left sidebar)
2. Click **New Project**
3. Fill in:
   - **Project Title**: e.g., "Still Life Series"
   - **Slug**: auto-fills (URL-friendly)
   - **Description**: optional
   - **Category**: e.g., "still life", "ecommerce", "people" — create as you go
   - **Photos**: click **Add Photo**, upload multiple images with captions
   - **Publish Date**: defaults to now
4. Click **Save**

The project appears in the grid instantly. Its category becomes a filter button automatically.

### Create an About Page

1. Click **Pages** (left sidebar)
2. Click **New Page**
3. Fill in:
   - **Page Title**: "About"
   - **Slug**: "about"
   - **Content**: write your about text (markdown supported)
4. Click **Save**

The About page now appears in the hamburger sidebar and as a clickable link.

---

## Workflow (Day-to-Day)

**Add a new project:**
1. Log in at cardopoli.com/admin
2. Projects → New Project
3. Fill title, category, upload photos
4. Save → live in 1-2 minutes

**Change the look:**
1. Site Settings → General Settings
2. Adjust columns, colours, fonts, banner
3. Save → live immediately

**Edit an existing project:**
1. Projects → click the one you want
2. Change photos/title/category
3. Save

**Delete a project:**
1. Projects → click the one to delete
2. Click the delete button (trash icon)
3. Save

---

## Troubleshooting

**Site not live after 24 hours?**
- Check GitHub Pages is enabled (Settings → Pages)
- Verify DNS: `ping cardopoli.com` in terminal
- Check that repo is public

**CMS login stuck?**
- Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Clear browser cache for cardopoli.com
- Check token hasn't expired (github.com/settings/tokens)

**Photos not showing?**
- Save the project (don't just edit and leave)
- Wait 1-2 minutes for GitHub Pages rebuild
- Check URLs are correct (`/uploads/filename.jpg`)

**Categories not appearing as filters?**
- Create a project with a category and save
- Reload the page
- Filters auto-generate from your projects

**Settings changes not appearing?**
- Hard refresh your browser
- Wait a few seconds for the change to propagate

---

## Next Steps

1. Upload your banner GIF through Site Settings
2. Change the background/text colours to match your aesthetic
3. Select your preferred column count
4. Create your first project with a few photos
5. Write your About page
6. Test the category filter
7. Share cardopoli.com

---

**You now own your portfolio.** No Tumblr, no Wix, no third-party platform. It's all yours, version-controlled in Git, and fully under your control.

Good luck. The site is ready.
