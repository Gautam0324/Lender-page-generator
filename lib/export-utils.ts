/**
 * Utility functions for generating static HTML and CSS for export.
 */

// Helper function to adjust color brightness
export function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return "#" + (0x1000000 + (R < 255 ? R : 255) * 0x10000 +
    (G < 255 ? G : 255) * 0x100 + (B < 255 ? B : 255))
    .toString(16).slice(1);
}

export function escapeHtml(value: any): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getDomainFromMetaTitle(metaTitle?: string, siteName?: string): string {
  const source = String(metaTitle || siteName || '').trim();
  if (!source) return 'yourdomain.com';

  const directDomainMatch = source.match(/((?:[a-z0-9-]+\.)+[a-z]{2,})/i);
  if (directDomainMatch?.[1]) {
    return directDomainMatch[1].toLowerCase();
  }

  const baseToken = source
    .split('|')[0]
    .split('-')[0]
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

  return baseToken ? `${baseToken}.com` : 'yourdomain.com';
}

export function applyDomainPlaceholder(html: string, domainName: string): string {
  return String(html || '').split('{{DOMAIN_NAME}}').join(domainName);
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

function getAnimationConfig(animation: any): { name: string; timing: string; iteration: string } | null {
  const map: Record<string, { name: string; timing: string; iteration: string }> = {
    'fade-in': { name: 'fadeIn', timing: 'ease-in', iteration: '1' },
    'fade-out': { name: 'fadeOut', timing: 'ease-out', iteration: '1' },
    'slide-in-up': { name: 'slideInUp', timing: 'ease-out', iteration: '1' },
    'slide-in-down': { name: 'slideInDown', timing: 'ease-out', iteration: '1' },
    'slide-in-left': { name: 'slideInLeft', timing: 'ease-out', iteration: '1' },
    'slide-in-right': { name: 'slideInRight', timing: 'ease-out', iteration: '1' },
    'zoom-in': { name: 'zoomIn', timing: 'ease-out', iteration: '1' },
    'zoom-out': { name: 'zoomOut', timing: 'ease-out', iteration: '1' },
    'bounce-in': { name: 'bounceIn', timing: 'ease-out', iteration: '1' },
    'rotate-in': { name: 'rotateIn', timing: 'ease-out', iteration: '1' },
    'pulse': { name: 'pulse', timing: 'ease-in-out', iteration: 'infinite' }
  };

  return map[String(animation || '').trim()] || null;
}

function getAnimationDurationSeconds(data: any): number {
  const raw = Number(data?.animationDuration);
  if (!Number.isFinite(raw)) return 0.5;
  return Math.min(10, Math.max(0.1, raw));
}

function applyAnimationToSectionHtml(sectionHtml: string, data: any): string {
  const animation = getAnimationConfig(data?.animation);
  if (!animation) return sectionHtml;

  const duration = getAnimationDurationSeconds(data);
  const inlineAnimation = `animation: ${animation.name} ${duration}s ${animation.timing} ${animation.iteration};`;

  return sectionHtml.replace(/<section\b([^>]*)>/i, (_match, attrs = '') => {
    let updatedAttrs = String(attrs);

    if (!/\bdata-export-animation\s*=\s*(["']).*?\1/i.test(updatedAttrs)) {
      updatedAttrs += ` data-export-animation="${escapeHtml(String(data?.animation || ''))}"`;
    }
    if (!/\bdata-export-animation-duration\s*=\s*(["']).*?\1/i.test(updatedAttrs)) {
      updatedAttrs += ` data-export-animation-duration="${duration}"`;
    }

    if (/\bstyle\s*=\s*(["']).*?\1/i.test(updatedAttrs)) {
      updatedAttrs = updatedAttrs.replace(/\bstyle\s*=\s*(["'])(.*?)\1/i, (_m: string, q: string, value: string) => {
        const safe = value.trim().endsWith(';') || value.trim() === '' ? value.trim() : `${value.trim()};`;
        return `style=${q}${safe} ${inlineAnimation}${q}`;
      });
    } else {
      updatedAttrs += ` style="${inlineAnimation}"`;
    }

    return `<section${updatedAttrs}>`;
  });
}

export function generateStaticHtml(cmsData: any, settings: any) {
  const blocks = cmsData.blocks || [];
  const siteName = settings?.siteName || 'LendFlow';
  const metaTitle = (settings?.metaTitle || siteName || 'LendFlow').trim();
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

    if (type === 'customHeader') {
      blockHtml = `
        <section class="text-white py-3" style="background-color: {{PRIMARY_COLOR}}">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-medium">
            ${data.text || ''}
          </div>
        </section>
      `;
    }

    if (type === 'announcement') {
      const items = (data.items || []).filter((item: string) => item && item.trim());
      const repeatedItems = [...items, ...items];
      const itemsHtml = repeatedItems.map((item: string) => `
        <div class="flex items-center gap-3 text-sm font-semibold whitespace-nowrap" style="display:flex;align-items:center;gap:.75rem;white-space:nowrap;">
          <span style="display:inline-block;line-height:1;">•</span>
          <span>${escapeHtml(item)}</span>
        </div>
      `).join('');

      const showTicker = items.length > 0;
      const tickerDuration = Math.max(10, Number(data.speed) || 30);

      blockHtml = `
        <section class="text-white py-2.5" style="background-color: {{SECONDARY_COLOR}}">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4" style="display:flex;align-items:center;gap:1rem;">
            <div class="overflow-hidden flex-1" style="overflow:hidden;flex:1;">
              ${showTicker ? `
                <div class="announcement-marquee-track flex items-center gap-8" style="display:flex;align-items:center;gap:2rem;min-width:max-content;animation-duration:${tickerDuration}s;">
                  ${itemsHtml}
                </div>
              ` : '<div class="text-sm font-semibold">Add announcement items from CMS.</div>'}
            </div>
            ${data.countdownEnabled && data.countdownTarget ? `
              <div class="shrink-0 bg-black/20 px-3 py-1 rounded-md text-xs sm:text-sm font-bold whitespace-nowrap" data-countdown-target="${data.countdownTarget}" data-countdown-label="${data.countdownLabel || 'Offer ends in'}">
                ${data.countdownLabel || 'Offer ends in'}: 00d 00h 00m 00s
              </div>
            ` : ''}
          </div>
        </section>
      `;
    }

    if (type === 'saleCountdown') {
      const bgFrom = data.bgFrom || '#991b1b';
      const bgTo = data.bgTo || '#b91c1c';
      const textColor = data.textColor || '#ffffff';
      const subtextColor = data.subtextColor || '#fee2e2';
      const timerBoxBgColor = data.timerBoxBgColor || 'rgba(255,255,255,0.12)';
      const timerBoxBorderColor = data.timerBoxBorderColor || 'rgba(255,255,255,0.22)';
      const ctaBgColor = data.ctaBgColor || '#ffffff';
      const ctaTextColor = data.ctaTextColor || '#b91c1c';

      blockHtml = `
        <section class="py-16 md:py-20" style="background: linear-gradient(135deg, ${bgFrom}, ${bgTo}); color: ${textColor};">
          <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-sale-countdown-target="${data.targetDate || ''}">
            ${data.eyebrow ? `<p class="uppercase tracking-[0.35em] text-xs md:text-sm mb-5 font-semibold" style="color: ${subtextColor};">${data.eyebrow}</p>` : ''}
            <h2 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${data.heading || 'Storm Season Is Already Here. Is Your Roof Ready?'}</h2>
            <p class="text-xl md:text-3xl italic leading-relaxed max-w-4xl mx-auto mb-10" style="color: ${subtextColor};">${data.subtitle || 'Spring storms, hail, and heavy rainfall are among the leading causes of emergency repairs.'}</p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
              <div class="rounded-lg border backdrop-blur-sm py-5 md:py-6" style="background-color: ${timerBoxBgColor}; border-color: ${timerBoxBorderColor};">
                <div class="text-5xl md:text-6xl font-extrabold leading-none" data-sale-part="days">00</div>
                <div class="mt-2 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold" style="color: ${subtextColor};">Days</div>
              </div>
              <div class="rounded-lg border backdrop-blur-sm py-5 md:py-6" style="background-color: ${timerBoxBgColor}; border-color: ${timerBoxBorderColor};">
                <div class="text-5xl md:text-6xl font-extrabold leading-none" data-sale-part="hours">00</div>
                <div class="mt-2 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold" style="color: ${subtextColor};">Hours</div>
              </div>
              <div class="rounded-lg border backdrop-blur-sm py-5 md:py-6" style="background-color: ${timerBoxBgColor}; border-color: ${timerBoxBorderColor};">
                <div class="text-5xl md:text-6xl font-extrabold leading-none" data-sale-part="minutes">00</div>
                <div class="mt-2 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold" style="color: ${subtextColor};">Minutes</div>
              </div>
              <div class="rounded-lg border backdrop-blur-sm py-5 md:py-6" style="background-color: ${timerBoxBgColor}; border-color: ${timerBoxBorderColor};">
                <div class="text-5xl md:text-6xl font-extrabold leading-none" data-sale-part="seconds">00</div>
                <div class="mt-2 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold" style="color: ${subtextColor};">Seconds</div>
              </div>
            </div>

            <p class="italic text-base md:text-lg mb-8" style="color: ${subtextColor};">
              ${data.note || 'Time remaining before peak season'}
              ${data.targetDate ? ` (${new Date(data.targetDate).toLocaleDateString()})` : ''}
            </p>

            <p class="mb-6 font-semibold" style="color: ${subtextColor};" data-sale-status></p>

            ${data.ctaText ? `<a href="${data.ctaLink || '/apply'}" class="inline-flex w-full md:w-auto md:min-w-[620px] justify-center items-center px-8 py-5 rounded-md font-extrabold text-xl uppercase tracking-wide" style="background-color: ${ctaBgColor}; color: ${ctaTextColor};">${data.ctaText} <span class="ml-2">→</span></a>` : ''}
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

    if (type === 'customFooter') {
      blockHtml = `
        <section class="bg-gray-900 text-gray-200 py-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="text-sm mb-4">${data.text || ''}</div>
            <div class="flex justify-center gap-6 text-sm text-gray-500">
              <a href="privacy-policy.html" class="hover:text-white transition-colors">Privacy Policy</a>
              <a href="terms-and-conditions.html" class="hover:text-white transition-colors">Terms of Service</a>
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
        itemsHtml += `<li class="leading-relaxed" style="line-height:1.7;">${escapeHtml(item)}</li>`;
      });
      blockHtml = `
        <section class="py-12 bg-gray-50">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            ${data.heading ? `<h2 class="text-2xl md:text-3xl font-bold mb-6" style="color: {{PRIMARY_COLOR}}">${escapeHtml(data.heading)}</h2>` : ''}
            <ul class="space-y-3 text-lg text-gray-700" style="display:flex;flex-direction:column;gap:12px;">${itemsHtml}</ul>
          </div>
        </section>
      `;
    }
    
    if (blockHtml) {
      blockHtml = applyAnimationToSectionHtml(blockHtml, data);
    }

    sectionsHtml += blockHtml;
  });

  // Ensure a footer is always present for legal links if no custom footer block was added
  const hasFooter = blocks.some((b: any) => b.type === 'customFooter');
  if (!hasFooter) {
    sectionsHtml += `
      <footer class="bg-gray-900 text-gray-200 py-12 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p class="text-sm mb-6">&copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
          <div class="flex justify-center gap-8 text-sm text-gray-500">
            <a href="privacy-policy.html" class="hover:text-white transition-colors">Privacy Policy</a>
            <a href="terms-and-conditions.html" class="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    `;
  }

  let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(metaTitle)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="font-sans antialiased text-gray-900 bg-slate-50">
    <div class="flex flex-col min-h-screen">
        ${sectionsHtml}
    </div>
    <script>
      (function () {
        function pad(value) {
          return String(value).padStart(2, '0');
        }

        function runSectionAnimations() {
          var elements = document.querySelectorAll('[data-export-animation]');
          elements.forEach(function (el) {
            var type = (el.getAttribute('data-export-animation') || '').trim();
            if (!type || type === 'none') return;

            var durationRaw = Number(el.getAttribute('data-export-animation-duration') || '0.5');
            var duration = Number.isFinite(durationRaw) ? Math.max(0.1, Math.min(10, durationRaw)) : 0.5;
            var ms = Math.round(duration * 1000);

            var keyframes = [];
            var easing = 'ease-out';
            var iterations = 1;

            if (type === 'fade-in') {
              keyframes = [{ opacity: 0 }, { opacity: 1 }];
              easing = 'ease-in';
            } else if (type === 'fade-out') {
              keyframes = [{ opacity: 1 }, { opacity: 0 }];
              easing = 'ease-out';
            } else if (type === 'slide-in-up') {
              keyframes = [{ transform: 'translateY(30px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }];
            } else if (type === 'slide-in-down') {
              keyframes = [{ transform: 'translateY(-30px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }];
            } else if (type === 'slide-in-left') {
              keyframes = [{ transform: 'translateX(-30px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }];
            } else if (type === 'slide-in-right') {
              keyframes = [{ transform: 'translateX(30px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }];
            } else if (type === 'zoom-in') {
              keyframes = [{ transform: 'scale(0.95)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }];
            } else if (type === 'zoom-out') {
              keyframes = [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0.95)', opacity: 0 }];
            } else if (type === 'bounce-in') {
              keyframes = [
                { transform: 'scale(0.3)', opacity: 0 },
                { transform: 'scale(1.05)', opacity: 1, offset: 0.7 },
                { transform: 'scale(1)', opacity: 1 }
              ];
              easing = 'ease-out';
            } else if (type === 'rotate-in') {
              keyframes = [{ transform: 'rotate(-10deg)', opacity: 0 }, { transform: 'rotate(0deg)', opacity: 1 }];
            } else if (type === 'pulse') {
              keyframes = [{ opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }];
              easing = 'ease-in-out';
              iterations = Infinity;
            }

            if (!keyframes.length) return;

            if (typeof el.animate === 'function') {
              try {
                el.animate(keyframes, {
                  duration: ms,
                  easing: easing,
                  iterations: iterations,
                  fill: iterations === Infinity ? 'none' : 'both'
                });
              } catch (_err) {
                // keep CSS fallback
              }
            }
          });
        }

        function updateCountdowns() {
          var elements = document.querySelectorAll('[data-countdown-target]');
          elements.forEach(function (el) {
            var target = el.getAttribute('data-countdown-target');
            var label = el.getAttribute('data-countdown-label') || 'Offer ends in';
            if (!target) return;

            var targetTime = new Date(target).getTime();
            if (Number.isNaN(targetTime)) {
              el.textContent = label ? (label + ': Invalid date') : 'Invalid date';
              return;
            }

            var diff = targetTime - Date.now();
            if (diff <= 0) {
              el.textContent = label ? (label + ': 00d 00h 00m 00s') : '00d 00h 00m 00s';
              return;
            }

            var totalSeconds = Math.floor(diff / 1000);
            var days = Math.floor(totalSeconds / 86400);
            var hours = Math.floor((totalSeconds % 86400) / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = totalSeconds % 60;

            var value = pad(days) + 'd ' + pad(hours) + 'h ' + pad(minutes) + 'm ' + pad(seconds) + 's';
            el.textContent = label ? (label + ': ' + value) : value;
          });
        }

        runSectionAnimations();
        updateCountdowns();
        setInterval(updateCountdowns, 1000);
      })();
    </script>
</body>
</html>
  `.trim();
  
  htmlContent = htmlContent.replace(/\{\{PRIMARY_COLOR\}\}/g, primaryColor);
  htmlContent = htmlContent.replace(/\{\{SECONDARY_COLOR\}\}/g, secondaryColor);
  
  return htmlContent;
}

export function generateLegalPageHtml(pageData: any, settings: any, fileTitle: string) {
  const siteName = settings?.siteName || 'LendFlow';
  const metaTitle = `${fileTitle} | ${siteName}`;
  const contentTitle = pageData?.title || fileTitle;
  const domainName = getDomainFromMetaTitle(settings?.metaTitle, settings?.siteName);
  const contentHtml = applyDomainPlaceholder(pageData?.content || '', domainName);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(metaTitle)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body class="font-sans antialiased text-gray-900 bg-slate-50">
  <main class="py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <article class="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-10">
        <h1 class="text-3xl md:text-4xl font-bold mb-6" style="color: var(--color-primary)">${escapeHtml(contentTitle)}</h1>
        <div class="prose max-w-none text-gray-700 leading-relaxed">${contentHtml}</div>
      </article>

      <div class="mt-6 text-sm text-gray-500 flex gap-4 flex-wrap">
        <a href="index.html" class="hover:underline">Home</a>
        <a href="privacy-policy.html" class="hover:underline">Privacy Policy</a>
        <a href="terms-and-conditions.html" class="hover:underline">Terms &amp; Conditions</a>
      </div>
    </div>
  </main>
</body>
</html>
  `.trim();
}
