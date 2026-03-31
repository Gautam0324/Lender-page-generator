import { NextRequest, NextResponse } from "next/server";
import archiver from "archiver";
import fs from "fs";
import path from "path";
import { 
  generateStaticHtml, 
  generateLegalPageHtml, 
  adjustBrightness 
} from "@/lib/export-utils";
import { PassThrough } from "stream";

export async function POST(req: NextRequest) {
  try {
    const { cms, settings, legalPages } = await req.json();

    const staticHtml = generateStaticHtml(cms, settings);
    const privacyPolicyHtml = generateLegalPageHtml(
      legalPages?.privacyPolicy,
      settings,
      'Privacy Policy'
    );
    const termsAndConditionsHtml = generateLegalPageHtml(
      legalPages?.termsAndConditions,
      settings,
      'Terms & Conditions'
    );

    // Get the CSS content from src/index.css
    let baseCss = "";
    try {
      baseCss = fs.readFileSync(path.join(process.cwd(), 'src/index.css'), 'utf-8');
    } catch (err) {
      console.warn("Could not read index.css, using default theme colors");
    }

    const primaryColor = settings?.themeColors?.primary || '#0A1931';
    const secondaryColor = settings?.themeColors?.secondary || '#F5A623';

    const styleCss = `
* {
  box-sizing: border-box;
}

:root {
  --color-primary: ${primaryColor};
  --color-secondary: ${secondaryColor};
  --color-primary-light: ${adjustBrightness(primaryColor, 20)};
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Poppins", ui-sans-serif, system-ui, sans-serif;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.5;
  color: #111827;
  background-color: #f8fafc;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 600;
  margin: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Custom Overrides from App */
${baseCss.replace(/@import[^;]+;/g, '').replace(/@theme[^}]+}/g, '')}

/* Fallback announcement ticker styles */
@keyframes announcement-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.announcement-marquee-track {
  display: flex;
  width: max-content;
  animation-name: announcement-scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .announcement-marquee-track {
    animation: none !important;
  }
}

/* Fallback animation keyframes */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes slideInUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideInDown { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideInLeft { from { transform: translateX(-30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes slideInRight { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes zoomOut { from { transform: scale(1); opacity: 1; } to { transform: scale(0.95); opacity: 0; } }
@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { opacity: 1; }
  70% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
@keyframes rotateIn { from { transform: rotate(-10deg); opacity: 0; } to { transform: rotate(0deg); opacity: 1; } }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

.animate-fade-in { animation-name: fadeIn; animation-timing-function: ease-in; }
.animate-fade-out { animation-name: fadeOut; animation-timing-function: ease-out; }
.animate-slide-in-up { animation-name: slideInUp; animation-timing-function: ease-out; }
.animate-slide-in-down { animation-name: slideInDown; animation-timing-function: ease-out; }
.animate-slide-in-left { animation-name: slideInLeft; animation-timing-function: ease-out; }
.animate-slide-in-right { animation-name: slideInRight; animation-timing-function: ease-out; }
.animate-zoom-in { animation-name: zoomIn; animation-timing-function: ease-out; }
.animate-zoom-out { animation-name: zoomOut; animation-timing-function: ease-out; }
.animate-bounce-in { animation-name: bounceIn; animation-timing-function: ease-out; }
.animate-rotate-in { animation-name: rotateIn; animation-timing-function: ease-out; }
.animate-pulse { animation-name: pulse; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
    `.trim();

    const stream = new PassThrough();
    const archive = archiver("zip", {
      zlib: { level: 6 }
    });

    archive.on("error", (err) => {
      console.error(`[${new Date().toISOString()}] Archiver error:`, err);
    });

    // Append files
    archive.append(staticHtml, { name: 'index.html' });
    archive.append(privacyPolicyHtml, { name: 'privacy-policy.html' });
    archive.append(termsAndConditionsHtml, { name: 'terms-and-conditions.html' });
    archive.append(styleCss, { name: 'style.css' });

    archive.pipe(stream);
    archive.finalize();

    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="static-website.zip"',
      },
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Export failed:`, error);
    return NextResponse.json({ error: "Internal server error during export" }, { status: 500 });
  }
}
