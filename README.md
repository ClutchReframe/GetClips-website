# ClutchReframe Clips Website

The static website for ClutchReframe Clips, featuring automatic highlight capture and vertical video generation for League of Legends and Dota 2.

Website: <https://getclips.clutchreframe.com/>.

## Local Preview

No build step or Node dependencies are required. Open Windows PowerShell in the project root and run:

```powershell
py -m http.server 8080 --bind 127.0.0.1 --directory site
```

Open <http://localhost:8080/>. Use HTTP to preview videos instead of opening files with `file://`. Press `Ctrl+C` to stop the server. If port 8080 is already in use, choose another port and update the preview URL accordingly.

## Project Structure

- `site/`: The only website deployment directory. Contains the homepage, Privacy Policy, EULA, a self-contained 404 page, SEO files, and third-party notices.
- `site/assets/`: Local images, fonts, shared CSS, and a small amount of vanilla JavaScript.
- `site/licenses/`: The complete LGPL 2.1 license for the FFmpeg build included in the app.
- `.github/workflows/pages.yml`: The GitHub Pages workflow that publishes `site/`.
- `docs/custom-domain-setup.md`: The GitHub Pages, Cloudflare subdomain, and HTTPS setup guide (in Chinese).
- `tmp/`: Local preview evidence and temporary files. Ignored by Git and excluded from deployment.

## Maintenance

The homepage presents the hero, demo, core features, workflow, FAQ, and download section. Keep feature availability and instructions consistent with the current app; pricing and checkout terms are shown in the app. The app's Privacy Policy and EULA are stored as static pages. When updating them, check the complete current app documents and preserve their effective dates and all sections.

The demo uses a local poster image and creates a YouTube privacy-enhanced iframe only after the visitor presses Play. Switching demos removes the previous player. Direct video links remain available when JavaScript is disabled. All fonts are hosted locally.

After changes, check the homepage and legal pages at 320, 390, 768, and 1440px, and at 200% browser zoom. Verify the mobile menu, keyboard navigation, video playback and switching, access without JavaScript, all local links, and initial network requests. Preserve the complete gameplay frames, HUD, watermarks, and existing black areas in the hero images. The target for an uncached initial page load, before playing a video, is approximately 1.2 MiB.

When changing the website domain, update all HTML metadata, the 404 page's home link, robots.txt, the sitemap, third-party notices, and the social preview image together. Repository contents may be public; keep credentials, private communications, original asset provenance records, and diagnostic files out of the repository. Before publishing, follow the [subdomain setup guide](docs/custom-domain-setup.md) to verify the `site/` artifact and the production URL.

## Licenses and Attribution

[Third-party notices](site/third-party-notices.html) distinguish app components from website fonts and include a complete [text download](site/third-party-notices.txt). Inter and Outfit use the [SIL Open Font License 1.1](site/assets/fonts/OFL-1.1.txt). ClutchReframe Clips includes a modified FFmpeg 8.1.2 build under [LGPL 2.1 or later](site/licenses/ffmpeg-lgpl-2.1.txt); the [corresponding source, modifications, and build instructions](https://github.com/ClutchReframe/clutchreframe-clips-ffmpeg-sources/releases/download/ffmpeg-8.1.2-r1/clutchreframe-clips-ffmpeg-8.1.2-r1-source.tar.xz) are available as a direct download. Retain the license and source links on every page that links to the app download.

When upgrading the app's FFmpeg build, update the version, license information, and corresponding source links on the website, while preserving stable source URLs for previous versions. Gameplay footage and trademarks belong to their respective owners; retain the attribution and non-endorsement statements on the website and in the app's EULA. Public hosting does not grant additional redistribution rights to website assets or branding.
