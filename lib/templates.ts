import { SectionNode } from './types';
import { v4 as uuidv4 } from 'uuid';

export const getBathroomTemplate = (): SectionNode => {
  const sectionId = uuidv4();
  
  const createCardColumn = (icon: string, text: string) => ({
    id: uuidv4(),
    width: '25%',
    style: {
      desktop: {
        padding: { top: '32px', bottom: '32px', left: '24px', right: '24px' },
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropBlur: '16px',
        border: { width: '1px', style: 'solid', color: 'rgba(255, 255, 255, 0.15)', radius: '2rem' },
        margin: { top: '10px', bottom: '10px', left: '10px', right: '10px' },
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center' as const,
      },
      tablet: { width: '50%' },
      mobile: { width: '100%', margin: { bottom: '16px' } }
    },
    widgets: [
      {
        id: uuidv4(),
        type: 'icon',
        props: { icon, size: 48, color: '#ccac82' },
        style: { desktop: { margin: { bottom: '24px' } } },
      },
      {
        id: uuidv4(),
        type: 'text',
        props: { text: `<div style="color:white;font-weight:800;font-size:18px;line-height:1.4;">${text}</div>` },
        style: { desktop: {} },
      },
    ],
  });

  return {
    id: sectionId,
    containerWidth: 'boxed',
    style: {
      desktop: {
        backgroundImage: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundOverlay: 'rgba(0, 0, 0, 0.7)',
        padding: { top: '120px', bottom: '120px', left: '20px', right: '20px' },
      },
      mobile: { padding: { top: '80px', bottom: '80px' } }
    },
    columns: [
      // Header Column (100%)
      {
        id: uuidv4(),
        width: '100%',
        style: { 
          desktop: { 
            display: 'flex', 
            flexDirection: 'column' as const, 
            alignItems: 'center', 
            margin: { bottom: '60px' } 
          } 
        },
        widgets: [
          {
            id: uuidv4(),
            type: 'text',
            props: { text: '<span style="background:#ccac82;color:white;padding:6px 20px;border-radius:100px;font-weight:900;letter-spacing:0.2em;font-size:12px;box-shadow:0 10px 20px rgba(204,172,130,0.3);">NEW 2026</span>' },
            style: { desktop: { margin: { bottom: '32px' } } },
          },
          {
            id: uuidv4(),
            type: 'heading',
            props: { text: 'Bathroom Relief Fund\nNow Available for US Homeowners', level: 'h1' },
            style: { desktop: { color: '#ffffff', fontSize: '64px', fontWeight: '900', textAlign: 'center' as const, lineHeight: '1.1' }, mobile: { fontSize: '36px' } },
          },
        ],
      },
      // Cards (25% each)
      createCardColumn('Home' as any, 'Must be a\nhomeowner'),
      createCardColumn('Flag' as any, 'Must be a\nUS resident'),
      createCardColumn('MapPin' as any, 'Must live in an\neligible zip code'),
      createCardColumn('Timer' as any, 'Must apply before\nnext backorder'),
      // Footer Column (100%)
      {
        id: uuidv4(),
        width: '100%',
        style: { 
          desktop: { 
            display: 'flex', 
            flexDirection: 'column' as const, 
            alignItems: 'center', 
            margin: { top: '60px' } 
          } 
        },
        widgets: [
          {
            id: uuidv4(),
            type: 'button',
            props: { text: 'Check Your Eligibility →', variant: 'primary' },
            style: { 
               desktop: { 
                  backgroundColor: '#ccac82', 
                  color: 'white', 
                  padding: { top: '24px', bottom: '24px', left: '60px', right: '60px' },
                  fontSize: '20px',
                  fontWeight: '900',
                  border: { radius: '100px' },
                  boxShadow: '0 20px 40px rgba(204,172,130,0.4)',
                  margin: { bottom: '24px' }
               } 
            },
          },
          {
            id: uuidv4(),
            type: 'text',
            props: { text: '<div style="color:rgba(255,255,255,0.4);font-size:14px;font-weight:600;letter-spacing:0.05em;">Limited funding available. No obligation consultation.</div>' },
            style: { desktop: {} },
          },
        ],
      },
    ],
  };
};
