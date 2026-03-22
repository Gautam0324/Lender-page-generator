import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Get test data
const INITIAL_DATA = {
  cms: {
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        data: {
          title: 'Test Hero Title',
          subtitle: 'Test subtitle here',
          ctaText: 'Get Started',
          ctaLink: '/',
          secondaryCtaText: 'Learn More',
          secondaryCtaLink: '/about',
          image: ''
        }
      }
    ]
  },
  settings: {
    siteName: 'Test Website',
    themeColors: {
      primary: '#0A1931',
      secondary: '#F5A623'
    }
  }
};

async function testExport() {
  try {
    console.log('Testing export functionality...');
    
    const response = await fetch('http://localhost:3000/api/download-source', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(INITIAL_DATA)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.buffer();
    const outputPath = '/tmp/test-export.zip';
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ Export successful! File size: ${buffer.length} bytes`);
    console.log(`📦 ZIP file saved to: ${outputPath}`);
    
    // Extract and check contents
    const { execSync } = await import('child_process');
    const extractPath = '/tmp/test-export';
    fs.rmSync(extractPath, { recursive: true, force: true });
    fs.mkdirSync(extractPath, { recursive: true });
    execSync(`unzip -q ${outputPath} -d ${extractPath}`);

    const htmlFile = path.join(extractPath, 'index.html');
    const cssFile = path.join(extractPath, 'style.css');

    if (fs.existsSync(htmlFile)) {
      const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
      console.log(`\n✅ HTML file found (${htmlContent.length} bytes)`);
      console.log('   - Contains DOCTYPE:', htmlContent.includes('<!DOCTYPE html>'));
      console.log('   - Contains Tailwind CDN:', htmlContent.includes('cdn.tailwindcss.com'));
      console.log('   - Contains content:', htmlContent.includes('Test Hero Title'));
      console.log('   - Contains inline styles:', htmlContent.includes('style='));
    } else {
      console.log('❌ HTML file not found in ZIP');
    }

    if (fs.existsSync(cssFile)) {
      const cssContent = fs.readFileSync(cssFile, 'utf-8');
      console.log(`\n✅ CSS file found (${cssContent.length} bytes)`);
      console.log('   - Contains CSS variables:', cssContent.includes('--color-primary'));
      console.log('   - Contains theme colors:', cssContent.includes('#0A1931'));
    } else {
      console.log('❌ CSS file not found in ZIP');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testExport().then(() => {
  console.log('\n✅ All tests passed!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
