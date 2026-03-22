import express from "express";
import { createServer as createViteServer } from "vite";
import archiver from "archiver";
import path from "path";
import fs from "fs";

// --- Static HTML Generator Helpers ---

// Helper function to adjust color brightness
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return "#" + (0x1000000 + (R < 255 ? R : 255) * 0x10000 +
    (G < 255 ? G : 255) * 0x100 + (B < 255 ? B : 255))
    .toString(16).slice(1);
}

const SVGS = {
  ArrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  Clock: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  CheckCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  DollarSign: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  Star: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  ChevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  ChevronUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`
};

function generateStaticHtml(cmsData: any, settings: any) {
  const blocks = cmsData.blocks || [];
  const siteName = settings?.siteName || 'LendFlow';
  const primaryColor = settings?.themeColors?.primary || '#0A1931';
  const secondaryColor = settings?.themeColors?.secondary || '#F5A623';
  
  let sectionsHtml = '';
  
  blocks.forEach((block: any, index: number) => {
    const { type, data } = block;
    
    // Generate HTML with template variables
    let blockHtml = '';
    
    if (type === 'hero') {
      blockHtml = `
        <section class="relative text-white py-24 lg:py-32 overflow-hidden" style="background-color: {{PRIMARY_COLOR}}">
          <div class="absolute inset-0 z-0 opacity-20">
            <img src="${data.image || ''}" alt="Hero Background" class="w-full h-full object-cover">
          </div>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">${data.title || ''}</h1>
            <p class="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">${data.subtitle || ''}</p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              ${data.ctaText ? `<a href="${data.ctaLink || '#'}" class="text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center" style="background-color: {{SECONDARY_COLOR}}">${data.ctaText} ${SVGS.ArrowRight}</a>` : ''}
              ${data.secondaryCtaText ? `<a href="${data.secondaryCtaLink || '#'}" class="text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center" style="background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);">${data.secondaryCtaText}</a>` : ''}
            </div>
          </div>
        </section>
      `;
    }
    
    if (type === 'custom') {
      blockHtml = `
        <section class="py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col ${data.imageAlignment === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12">
              <div class="w-full md:w-1/2">
                <h2 class="text-3xl md:text-4xl font-bold mb-6" style="color: {{PRIMARY_COLOR}}">${data.heading || ''}</h2>
                <div class="text-lg text-gray-600 leading-relaxed mb-8 prose max-w-none">${data.content || ''}</div>
                <div class="flex flex-col sm:flex-row gap-4">
                  ${data.buttonText ? `<a href="${data.buttonLink || '#'}" class="inline-block text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md text-center" style="background-color: {{SECONDARY_COLOR}}">${data.buttonText}</a>` : ''}
                  ${data.secondaryButtonText ? `<a href="${data.secondaryButtonLink || '#'}" class="inline-block px-8 py-3 rounded-lg font-bold transition-colors shadow-md text-center" style="background-color: white; color: {{SECONDARY_COLOR}}; border: 2px solid {{SECONDARY_COLOR}}">${data.secondaryButtonText}</a>` : ''}
                </div>
              </div>
              <div class="w-full md:w-1/2">
                ${data.image ? `<img src="${data.image}" alt="${data.heading || ''}" class="w-full h-auto rounded-xl shadow-lg object-cover max-h-[500px]">` : `<div class="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">No Image Provided</div>`}
              </div>
            </div>
          </div>
        </section>
      `;
    }

    if (type === 'howItWorks') {
      blockHtml = `
        <section class="py-20 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold mb-4" style="color: {{PRIMARY_COLOR}}">${data.heading || 'How It Works'}</h2>
              <p class="text-xl text-gray-600 max-w-2xl mx-auto">${data.subtitle || 'Get your funds in three simple steps.'}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 relative mb-12">
              <div class="relative z-10 flex flex-col items-center text-center">
                <div class="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100" style="color: {{PRIMARY_COLOR}}">${SVGS.Clock}</div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">1. Apply Online</h3>
                <p class="text-gray-600">Fill out our simple 5-minute application form.</p>
              </div>
              <div class="relative z-10 flex flex-col items-center text-center">
                <div class="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100" style="color: {{PRIMARY_COLOR}}">${SVGS.CheckCircle}</div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">2. Get Approved</h3>
                <p class="text-gray-600">Receive a decision within minutes of applying.</p>
              </div>
              <div class="relative z-10 flex flex-col items-center text-center">
                <div class="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100" style="color: {{PRIMARY_COLOR}}">${SVGS.DollarSign}</div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">3. Receive Funds</h3>
                <p class="text-gray-600">Money deposited directly into your account.</p>
              </div>
            </div>
            <div class="text-center mt-12 flex flex-col sm:flex-row justify-center gap-4">
              ${data.buttonText ? `<a href="${data.buttonLink || '#'}" class="inline-block text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md" style="background-color: {{SECONDARY_COLOR}}">${data.buttonText}</a>` : ''}
              ${data.secondaryButtonText ? `<a href="${data.secondaryButtonLink || '#'}" class="inline-block bg-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md" style="color: {{SECONDARY_COLOR}}; border: 2px solid {{SECONDARY_COLOR}}">${data.secondaryButtonText}</a>` : ''}
            </div>
          </div>
        </section>
      `;
    }

    if (type === 'testimonials') {
      let itemsHtml = '';
      (data.items || []).forEach((item: any) => {
        itemsHtml += `
          <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
            <div class="flex text-yellow-400 mb-4">${SVGS.Star}${SVGS.Star}${SVGS.Star}${SVGS.Star}${SVGS.Star}</div>
            <p class="text-gray-600 italic mb-6 leading-relaxed">"${item.text || ''}"</p>
            <div>
              <p class="font-bold text-gray-900">${item.name || ''}</p>
              <p class="text-sm text-gray-500">${item.role || ''}</p>
            </div>
          </div>
        `;
      });
      blockHtml = `
        <section class="py-20 bg-gray-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold mb-4" style="color: {{PRIMARY_COLOR}}">${data.heading || 'What Our Clients Say'}</h2>
              <p class="text-xl text-gray-600 max-w-2xl mx-auto">${data.subtitle || "Don't just take our word for it."}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">${itemsHtml}</div>
             <div class="text-center mt-12 flex flex-col sm:flex-row justify-center gap-4">
              ${data.buttonText ? `<a href="${data.buttonLink || '#'}" class="inline-block text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md" style="background-color: {{SECONDARY_COLOR}}">${data.buttonText}</a>` : ''}
              ${data.secondaryButtonText ? `<a href="${data.secondaryButtonLink || '#'}" class="inline-block bg-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md" style="color: {{SECONDARY_COLOR}}; border: 2px solid {{SECONDARY_COLOR}}">${data.secondaryButtonText}</a>` : ''}
            </div>
          </div>
        </section>
      `;
    }

    if (type === 'faq') {
      let itemsHtml = '';
      (data.items || []).forEach((item: any) => {
        itemsHtml += `
          <div class="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <div class="w-full px-6 py-4 text-left bg-gray-50 flex justify-between items-center font-bold text-gray-900">
              ${item.question || ''}
            </div>
            <div class="px-6 py-4 bg-white text-gray-600 leading-relaxed border-t border-gray-100">
              ${item.answer || ''}
            </div>
          </div>
        `;
      });
      blockHtml = `
        <section class="py-20 bg-white">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold mb-4" style="color: {{PRIMARY_COLOR}}">${data.heading || 'Frequently Asked Questions'}</h2>
              <p class="text-xl text-gray-600">${data.subtitle || 'Everything you need to know.'}</p>
            </div>
            <div class="space-y-4 mb-12">${itemsHtml}</div>
             <div class="text-center mt-12 flex flex-col sm:flex-row justify-center gap-4">
              ${data.buttonText ? `<a href="${data.buttonLink || '#'}" class="inline-block text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md" style="background-color: {{SECONDARY_COLOR}}">${data.buttonText}</a>` : ''}
              ${data.secondaryButtonText ? `<a href="${data.secondaryButtonLink || '#'}" class="inline-block bg-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md" style="color: {{SECONDARY_COLOR}}; border: 2px solid {{SECONDARY_COLOR}}">${data.secondaryButtonText}</a>` : ''}
            </div>
          </div>
        </section>
      `;
    }

    if (type === 'cta') {
      blockHtml = `
        <section class="py-20 text-white text-center" style="background-color: {{PRIMARY_COLOR}}">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">${data.heading || 'Ready to Take the Next Step?'}</h2>
            <p class="text-xl text-blue-100 mb-10">${data.subtitle || 'Apply online today.'}</p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              ${data.buttonText ? `<a href="${data.buttonLink || '#'}" class="inline-block text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg" style="background-color: {{SECONDARY_COLOR}}">${data.buttonText}</a>` : ''}
              ${data.secondaryButtonText ? `<a href="${data.secondaryButtonLink || '#'}" class="inline-block text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg" style="background-color: transparent; border: 2px solid white;">${data.secondaryButtonText}</a>` : ''}
            </div>
          </div>
        </section>
      `;
    }

    if (type === 'paragraph') {
      blockHtml = `
        <section class="py-12 bg-white">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-lg text-gray-700 leading-relaxed prose max-w-none">${data.content || ''}</div>
          </div>
        </section>
      `;
    }

    if (type === 'list') {
      let itemsHtml = '';
      (data.items || []).forEach((item: string) => {
        itemsHtml += `<li class="leading-relaxed">${item}</li>`;
      });
      blockHtml = `
        <section class="py-12 bg-gray-50">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            ${data.heading ? `<h2 class="text-2xl md:text-3xl font-bold mb-6" style="color: {{PRIMARY_COLOR}}">${data.heading}</h2>` : ''}
            <ul class="list-disc list-inside space-y-3 text-lg text-gray-700">${itemsHtml}</ul>
          </div>
        </section>
      `;
    }
    
    sectionsHtml += blockHtml;
  });

  let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="font-sans antialiased text-gray-900 bg-slate-50">
    <div class="flex flex-col min-h-screen">
        ${sectionsHtml}
    </div>
</body>
</html>
  `.trim();
  
  // Replace color placeholders with actual hex values
  htmlContent = htmlContent.replace(/\{\{PRIMARY_COLOR\}\}/g, primaryColor);
  htmlContent = htmlContent.replace(/\{\{SECONDARY_COLOR\}\}/g, secondaryColor);
  
  return htmlContent;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Add body parser for POST requests with a larger limit for base64 images
  app.use(express.json({ limit: '100mb' }));

  // Download source code endpoint
  app.post("/api/download-source", async (req, res) => {
    console.log(`[${new Date().toISOString()}] Exporting static HTML and CSS. Payload size: ${JSON.stringify(req.body).length} bytes`);
    
    try {
      const { cms, settings } = req.body;
      
      const staticHtml = generateStaticHtml(cms, settings);
      
      // Get the CSS content from src/index.css
      let baseCss = "";
      try {
        baseCss = fs.readFileSync(path.join(process.cwd(), 'src/index.css'), 'utf-8');
        // Simple regex to extract colors from @theme block if present, or provide defaults
        // Since we are using Tailwind CDN, we mainly need the theme variables and custom rules
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
      `.trim();

      res.attachment("static-website.zip");
      
      const archive = archiver("zip", {
        zlib: { level: 6 }
      });

      archive.on("error", (err) => {
        console.error(`[${new Date().toISOString()}] Archiver error:`, err);
        if (!res.headersSent) {
          res.status(500).send({ error: "Failed to create archive" });
        } else {
          res.end();
        }
      });

      archive.pipe(res);

      // Append files
      archive.append(staticHtml, { name: 'index.html' });
      archive.append(styleCss, { name: 'style.css' });

      await archive.finalize();
      console.log(`[${new Date().toISOString()}] Static website export finalized successfully`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Export failed:`, error);
      if (!res.headersSent) {
        res.status(500).send({ error: "Internal server error during export" });
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
