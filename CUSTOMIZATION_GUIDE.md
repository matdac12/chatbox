# Chatbox Customization & Deployment Guide

This guide helps you customize, build, and deploy your own version of Chatbox.

## Before You Start

### License Compliance
- Chatbox is GPL-3.0 licensed
- Your customized version must also be GPL-3.0 (open source)
- You must provide source code to your users
- Include copyright notices and license file

## Step 1: Rebrand Your Application

### Update package.json
```json
{
  "name": "your-app-name",
  "productName": "Your App Name",
  "description": "Your custom description",
  "author": {
    "name": "Your Name",
    "email": "your@email.com",
    "url": "https://yourwebsite.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/your-repo"
  }
}
```

### Update electron-builder.yml
```yaml
appId: xyz.yourcompany.yourapp  # Change this!
productName: YourAppName
copyright: Copyright © 2025 Your Company

mac:
  # Remove or update code signing info
  # identity: null  # Disable signing for now

win:
  # Update or remove signing
  # sign: null  # Disable signing for now
```

### Replace Assets
- `/assets/icons/` - Replace with your own icons
- App icons (icon.icns, icon.ico, icon.png)
- Tray icons
- Logo files

### Update App Metadata
- `/electron-builder.yml` - App IDs and names
- `/ios/App/App.xcodeproj/` - iOS bundle ID
- `/android/app/build.gradle` - Android package name
- `/src/renderer/index.html` - Page title

### Remove Update System (or configure your own)
If you don't want auto-updates:
- Remove electron-updater from package.json dependencies
- Remove update code from src/main/
- Or set up your own update server

## Step 2: Customize Features

Make your code changes:
```bash
# UI components
src/renderer/

# Main process (desktop)
src/main/

# Shared code
src/shared/
```

## Step 3: Build Your Application

### Desktop Builds

```bash
# Install dependencies
npm install

# Build current platform only
npm run package

# Build all platforms (requires specific OS or CI)
npm run package:all

# Built files appear in:
release/build/
```

**Platform-specific builds:**
- macOS builds: Requires macOS machine
- Windows builds: Can build on any OS (using wine/mono)
- Linux builds: Can build on any OS

### Web Build

```bash
npm run build:web

# Output: release/app/dist-web/
# Upload to any web host
```

### Mobile Builds

```bash
# iOS (requires macOS)
npm run mobile:sync:ios
npm run mobile:ios

# Android (any OS with Android Studio)
npm run mobile:sync:android
npm run mobile:android
```

## Step 4: Distribution Strategies

### Option A: GitHub Releases (Recommended)
1. Create a release on GitHub
2. Upload built installers as assets
3. Users download from releases page
4. Free and simple

### Option B: Your Own Website
```bash
# Host installer files on your server
yourwebsite.com/downloads/
  - YourApp-Setup-1.0.0.exe
  - YourApp-1.0.0.dmg
  - YourApp-1.0.0.AppImage
```

### Option C: Web Hosting
Deploy web version to:
- **Vercel**: Connect GitHub repo, auto-deploy on push
- **Netlify**: Similar to Vercel
- **GitHub Pages**: Free static hosting
- **Your own server**: Any web server (nginx, Apache)

Example for Vercel:
```bash
npm install -g vercel
cd release/app/dist-web
vercel --prod
```

### Option D: App Stores (Mobile)
- **Google Play**: $25 one-time fee, APK upload
- **Apple App Store**: $99/year, review process
- **Direct APK**: Host .apk file for Android users

## Step 5: Code Signing (Optional but Recommended)

### Why Code Sign?
- Users won't see "Unknown Publisher" warnings
- Required for macOS notarization
- Professional appearance

### Costs:
- **Windows**: Code signing certificate (~$100-400/year)
- **macOS**: Apple Developer account ($99/year)
- **Linux**: Not required

### Without Code Signing:
- Windows: Users see SmartScreen warning
- macOS: Users need to right-click > Open
- Linux: No issues
- Still fully functional, just extra user steps

## Step 6: Updates System

### Option A: Remove Auto-Updates
Simplest approach for small user base:
```javascript
// Remove from package.json dependencies
"electron-updater": "^x.x.x"

// Remove update checks from src/main/
```

### Option B: GitHub Releases + electron-updater
Update electron-builder.yml:
```yaml
publish:
  provider: github
  owner: yourusername
  repo: yourrepo
```

### Option C: Self-Hosted Updates
Set up your own update server:
```yaml
publish:
  provider: generic
  url: https://yourdomain.com/updates/
```

## Example: Quick Start for Desktop Distribution

```bash
# 1. Clone and customize
git clone https://github.com/yourusername/your-chatbox-fork
cd your-chatbox-fork

# 2. Update branding (edit package.json, electron-builder.yml)
# 3. Make your feature changes

# 4. Build
npm install
npm run package

# 5. Create GitHub Release
git tag v1.0.0
git push origin v1.0.0

# 6. Upload built files from release/build/ to GitHub Release

# 7. Users download and install!
```

## Example: Quick Start for Web Deployment

```bash
# 1. Build web version
npm run build:web

# 2. Deploy to Vercel
cd release/app/dist-web
npx vercel --prod

# 3. Done! Users access via URL
```

## User Installation Instructions

### Desktop Users:
**Windows:**
1. Download YourApp-Setup-x.x.x.exe
2. Run installer
3. Click through SmartScreen warning (if not code signed)
4. Install and run

**macOS:**
1. Download YourApp-x.x.x.dmg
2. Open DMG, drag to Applications
3. Right-click app > Open first time (if not notarized)
4. Run normally after first open

**Linux:**
1. Download .AppImage or .deb
2. AppImage: `chmod +x YourApp.AppImage && ./YourApp.AppImage`
3. Deb: `sudo dpkg -i yourapp.deb`

### Web Users:
1. Visit your-website.com
2. Use directly in browser

### Mobile Users:
1. Download APK (Android) or install from store
2. Enable "Unknown Sources" if APK
3. Install and run

## Recommended Approach for Individual Developers

**Easiest path:**
1. Build web version → Deploy to Vercel/Netlify (free)
2. Build desktop apps for your OS → Upload to GitHub Releases
3. Let community build for other platforms if needed
4. Skip code signing initially (add later if user base grows)
5. Skip mobile apps unless specifically needed

**This approach:**
- Costs: $0
- Time: Few hours
- Maintenance: Minimal
- Covers 90% of users

## License Compliance Checklist

- [ ] Keep GPL-3.0 license in LICENSE file
- [ ] Keep original copyright notices
- [ ] Add your copyright notice
- [ ] Make source code available (GitHub public repo)
- [ ] Include "This is a modified version of Chatbox" notice
- [ ] Document your changes in CHANGELOG.md

## Support & Community

For your users:
- Create GitHub Issues for bug reports
- Write documentation in README.md
- Set up Discussions tab for questions
- Consider Discord/Forum if user base grows

## Troubleshooting

**"Build failed"**: Check Node version (should be 18+)
**"Code signing error"**: Disable signing in electron-builder.yml
**"Permission denied"**: Run chmod +x on Linux/Mac build scripts
**"Module not found"**: Run npm install again

## Additional Resources

- Electron Builder Docs: https://www.electron.build/
- Electron Docs: https://www.electronjs.org/docs
- Capacitor Docs: https://capacitorjs.com/docs (for mobile)
- GitHub Releases: https://docs.github.com/en/repositories/releasing-projects-on-github
