# Plesk Deployment Instructions

## Files Ready for Deployment

All files in the `build` folder are ready to deploy to Plesk.

## Deployment Steps

1. **Access Plesk**
   - Log in to your Plesk control panel
   - Navigate to your domain

2. **Upload Files**
   - Go to File Manager
   - Navigate to your document root (usually `httpdocs` or `public_html`)
   - Delete any existing files (if this is a fresh deployment)
   - Upload ALL contents from the `build` folder to the document root
   - Make sure `.htaccess` file is uploaded (it's already included in the build folder)

3. **Verify .htaccess**
   - Ensure the `.htaccess` file is in the root directory
   - This file handles client-side routing for React

4. **Alternative: Nginx Configuration**
   If your Plesk uses Nginx instead of Apache:
   - Go to Apache & nginx Settings
   - Add this to "Additional nginx directives":
   
   ```
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```

5. **Test**
   - Visit your domain
   - Test navigation to ensure routing works correctly

## What's Included
- Optimized production build
- All static assets (JS, CSS, images)
- .htaccess for Apache routing
- manifest.json, robots.txt
- All necessary files for deployment

Your build is complete and ready to upload!
