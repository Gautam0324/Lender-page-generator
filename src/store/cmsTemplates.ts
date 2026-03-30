// Predefined CMS page templates
export interface CMSTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  blocks: any[];
}

export const CMS_TEMPLATES: CMSTemplate[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Professional landing page with hero, features, testimonials, and CTA',
    category: 'General',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        data: {
          title: 'Welcome to Our Service',
          subtitle: 'Get started with our platform today',
          ctaText: 'Get Started',
          ctaLink: '/apply',
          secondaryCtaText: 'Learn More',
          secondaryCtaLink: '/about',
          image: ''
        }
      },
      {
        id: 'custom-1',
        type: 'custom',
        data: {
          heading: 'Why Choose Us',
          content: 'We provide the best services in the industry with professional support and competitive pricing.',
          image: '',
          imageAlignment: 'right',
          buttonText: 'Explore More',
          buttonLink: '/features',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'howItWorks-1',
        type: 'howItWorks',
        data: {
          heading: 'How It Works',
          subtitle: 'Three simple steps to get started',
          buttonText: 'Get Started',
          buttonLink: '/apply',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'testimonials-1',
        type: 'testimonials',
        data: {
          heading: 'What Our Clients Say',
          subtitle: 'Real stories from real customers',
          buttonText: 'View All Reviews',
          buttonLink: '/reviews',
          secondaryButtonText: '',
          secondaryButtonLink: '',
          items: [
            {
              id: 1,
              name: 'John Doe',
              role: 'CEO, Tech Company',
              text: 'This service has been a game-changer for our business.'
            },
            {
              id: 2,
              name: 'Jane Smith',
              role: 'Founder, Startup',
              text: 'Excellent support and amazing results. Highly recommended!'
            }
          ]
        }
      },
      {
        id: 'cta-1',
        type: 'cta',
        data: {
          heading: 'Ready to Get Started?',
          subtitle: 'Join thousands of satisfied customers today',
          buttonText: 'Start Now',
          buttonLink: '/apply',
          secondaryButtonText: 'Contact Us',
          secondaryButtonLink: '/contact'
        }
      }
    ]
  },
  {
    id: 'product-showcase',
    name: 'Product Showcase',
    description: 'Highlight your product with detailed features and benefits',
    category: 'Product',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        data: {
          title: 'Introducing Our Latest Product',
          subtitle: 'Revolutionary solution for your business needs',
          ctaText: 'Shop Now',
          ctaLink: '/shop',
          secondaryCtaText: 'Watch Demo',
          secondaryCtaLink: '/demo',
          image: ''
        }
      },
      {
        id: 'custom-1',
        type: 'custom',
        data: {
          heading: 'Premium Features',
          content: 'Our product comes with industry-leading features designed for maximum efficiency and ease of use.',
          image: '',
          imageAlignment: 'left',
          buttonText: 'View Features',
          buttonLink: '/features',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'custom-2',
        type: 'custom',
        data: {
          heading: 'Advanced Technology',
          content: 'Built with cutting-edge technology and modern design principles.',
          image: '',
          imageAlignment: 'right',
          buttonText: 'Learn More',
          buttonLink: '/technology',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'faq-1',
        type: 'faq',
        data: {
          heading: 'Frequently Asked Questions',
          subtitle: 'Find answers to common questions about our product',
          buttonText: '',
          buttonLink: '',
          secondaryButtonText: '',
          secondaryButtonLink: '',
          items: [
            {
              id: 1,
              question: 'What is included in the package?',
              answer: 'Our package includes full access to all features, 24/7 customer support, and regular updates.'
            },
            {
              id: 2,
              question: 'Is there a free trial?',
              answer: 'Yes, we offer a 30-day free trial with full access to all features.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'service-page',
    name: 'Service Page',
    description: 'Showcase your services with detailed descriptions and benefits',
    category: 'Service',
    blocks: [
      {
        id: 'customHeader-1',
        type: 'customHeader',
        data: {
          text: 'Our Premium Services'
        }
      },
      {
        id: 'hero-1',
        type: 'hero',
        data: {
          title: 'Professional Services',
          subtitle: 'Expert solutions tailored to your needs',
          ctaText: 'Request Quote',
          ctaLink: '/quote',
          secondaryCtaText: 'Schedule Call',
          secondaryCtaLink: '/schedule',
          image: ''
        }
      },
      {
        id: 'list-1',
        type: 'list',
        data: {
          heading: 'Why Our Clients Choose Us',
          items: [
            'Experienced professionals with proven track record',
            'Customized solutions for your specific needs',
            '24/7 dedicated support and maintenance',
            'Transparent pricing with no hidden fees',
            'Quick turnaround times'
          ]
        }
      },
      {
        id: 'howItWorks-1',
        type: 'howItWorks',
        data: {
          heading: 'Our Process',
          subtitle: 'Simple steps to success',
          buttonText: 'Get Started',
          buttonLink: '/apply',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'cta-1',
        type: 'cta',
        data: {
          heading: 'Let\'s Work Together',
          subtitle: 'Contact us today for a free consultation',
          buttonText: 'Schedule Now',
          buttonLink: '/schedule',
          secondaryButtonText: 'Email Us',
          secondaryButtonLink: '/contact'
        }
      }
    ]
  },
  {
    id: 'sales-campaign',
    name: 'Sales Campaign',
    description: 'High-conversion sales page with urgency elements',
    category: 'Sales',
    blocks: [
      {
        id: 'announcement-1',
        type: 'announcement',
        data: {
          items: ['Limited Time Offer!', 'Save 50% This Week', 'Free Shipping on Orders Over $100'],
          speed: 25,
          countdownEnabled: true,
          countdownTarget: '',
          countdownLabel: 'Offer Ends In'
        }
      },
      {
        id: 'hero-1',
        type: 'hero',
        data: {
          title: 'Special Limited-Time Offer',
          subtitle: 'Don\'t miss out on this incredible deal',
          ctaText: 'Claim Your Offer',
          ctaLink: '/apply',
          secondaryCtaText: 'See Details',
          secondaryCtaLink: '/details',
          image: ''
        }
      },
      {
        id: 'saleCountdown-1',
        type: 'saleCountdown',
        data: {
          eyebrow: 'EXCLUSIVE OFFER',
          heading: 'Limited Time Deal',
          subtitle: 'This incredible offer is only available for a limited time. Act now before it\'s too late!',
          targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          note: 'Time remaining for this offer',
          ctaText: 'Get The Deal Now',
          ctaLink: '/apply',
          bgFrom: '#991b1b',
          bgTo: '#b91c1c',
          textColor: '#ffffff',
          subtextColor: '#fee2e2',
          timerBoxBgColor: 'rgba(255,255,255,0.12)',
          timerBoxBorderColor: 'rgba(255,255,255,0.22)',
          ctaBgColor: '#ffffff',
          ctaTextColor: '#b91c1c'
        }
      },
      {
        id: 'custom-1',
        type: 'custom',
        data: {
          heading: 'Why Customers Love Us',
          content: 'Join thousands of satisfied customers who have transformed their experience with our service.',
          image: '',
          imageAlignment: 'right',
          buttonText: 'Learn More',
          buttonLink: '/about',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'testimonials-1',
        type: 'testimonials',
        data: {
          heading: 'Trusted by Thousands',
          subtitle: 'Real success stories from our customers',
          buttonText: '',
          buttonLink: '',
          secondaryButtonText: '',
          secondaryButtonLink: '',
          items: [
            {
              id: 1,
              name: 'Sarah Johnson',
              role: 'Customer',
              text: 'Best decision I made this year!'
            },
            {
              id: 2,
              name: 'Mike Chen',
              role: 'Customer',
              text: 'Exceeded all my expectations.'
            },
            {
              id: 3,
              name: 'Emily Davis',
              role: 'Customer',
              text: 'Outstanding service and support!'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'blog-post',
    name: 'Blog Post',
    description: 'Informative blog post layout with content focus',
    category: 'Content',
    blocks: [
      {
        id: 'customHeader-1',
        type: 'customHeader',
        data: {
          text: 'Blog'
        }
      },
      {
        id: 'paragraph-1',
        type: 'paragraph',
        data: {
          content: 'This is the introduction to your blog post. Start with an engaging hook that captures your readers\' attention and introduces the main topic you\'ll be discussing.'
        }
      },
      {
        id: 'list-1',
        type: 'list',
        data: {
          heading: 'Key Points to Consider',
          items: [
            'First important point about your topic',
            'Second important point about your topic',
            'Third important point about your topic'
          ]
        }
      },
      {
        id: 'paragraph-2',
        type: 'paragraph',
        data: {
          content: 'Continue with detailed information and insights. Break up your content into digestible sections with clear headings and supporting details.'
        }
      },
      {
        id: 'cta-1',
        type: 'cta',
        data: {
          heading: 'Want More Tips Like This?',
          subtitle: 'Subscribe to our newsletter for expert insights and updates',
          buttonText: 'Subscribe Now',
          buttonLink: '/subscribe',
          secondaryButtonText: 'Share This Post',
          secondaryButtonLink: ''
        }
      }
    ]
  },
  {
    id: 'about-us',
    name: 'About Us',
    description: 'Tell your company story and build trust with visitors',
    category: 'Company',
    blocks: [
      {
        id: 'customHeader-1',
        type: 'customHeader',
        data: {
          text: 'About Our Company'
        }
      },
      {
        id: 'hero-1',
        type: 'hero',
        data: {
          title: 'Our Story',
          subtitle: 'Building something amazing since day one',
          ctaText: 'Join Our Team',
          ctaLink: '/careers',
          secondaryCtaText: 'Contact Us',
          secondaryCtaLink: '/contact',
          image: ''
        }
      },
      {
        id: 'paragraph-1',
        type: 'paragraph',
        data: {
          content: 'Share your company\'s mission, vision, and values. Explain what drives your team and the impact you\'re making in your industry.'
        }
      },
      {
        id: 'custom-1',
        type: 'custom',
        data: {
          heading: 'Our Mission',
          content: 'We are committed to delivering exceptional value to our customers while maintaining the highest standards of quality and integrity.',
          image: '',
          imageAlignment: 'left',
          buttonText: '',
          buttonLink: '',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'cta-1',
        type: 'cta',
        data: {
          heading: 'Ready to Work With Us?',
          subtitle: 'Let\'s create something great together',
          buttonText: 'Get In Touch',
          buttonLink: '/contact',
          secondaryButtonText: 'Learn More',
          secondaryButtonLink: '/features'
        }
      }
    ]
  },
  {
    id: 'video-showcase',
    name: 'Video Showcase',
    description: 'Modern video-focused template with media sections and compelling CTAs',
    category: 'Media',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        data: {
          title: 'Discover Our Story',
          subtitle: 'Watch how we\'re transforming the industry',
          ctaText: 'Watch Video',
          ctaLink: '#video',
          secondaryCtaText: 'Learn More',
          secondaryCtaLink: '/about',
          image: ''
        }
      },
      {
        id: 'video-1',
        type: 'video',
        data: {
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          heading: 'Our Mission in Action',
          subtitle: 'See how our solution makes a difference',
          videoType: 'embed',
          autoplay: false,
          controls: true
        }
      },
      {
        id: 'custom-1',
        type: 'custom',
        data: {
          heading: 'Why Choose Us',
          content: 'Our video-first approach delivers results. Professional quality production meets user engagement.',
          image: '',
          imageAlignment: 'right',
          buttonText: 'See More Videos',
          buttonLink: '/videos',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'paragraph-1',
        type: 'paragraph',
        data: {
          content: 'Our customers love our transparent approach to showcasing products and services through high-quality video content.'
        }
      },
      {
        id: 'testimonials-1',
        type: 'testimonials',
        data: {
          heading: 'Video Success Stories',
          subtitle: 'Hear from our satisfied customers',
          buttonText: '',
          buttonLink: '',
          secondaryButtonText: '',
          secondaryButtonLink: '',
          items: [
            {
              id: 1,
              name: 'Alex Turner',
              role: 'Marketing Director',
              text: 'The video content boosted our engagement by 300%!'
            },
            {
              id: 2,
              name: 'Jessica Martinez',
              role: 'CEO, Digital Agency',
              text: 'Professional videos that convert visitors into customers.'
            },
            {
              id: 3,
              name: 'David Chen',
              role: 'Product Manager',
              text: 'Best investment we made for our product launch.'
            }
          ]
        }
      },
      {
        id: 'cta-1',
        type: 'cta',
        data: {
          heading: 'Ready to Create Video Content?',
          subtitle: 'Join hundreds of brands creating engaging video experiences',
          buttonText: 'Get Started Today',
          buttonLink: '/apply',
          secondaryButtonText: 'Book a Demo',
          secondaryButtonLink: '/demo'
        }
      }
    ]
  }
];

// --- Font Families ---
export const FONT_FAMILIES = [
  { name: 'System Default', value: 'system-ui', category: 'System' },
  { name: 'Segoe UI', value: '"Segoe UI", Tahoma, Geneva', category: 'System' },
  
  // Serif Fonts
  { name: 'Georgia', value: 'Georgia, serif', category: 'Serif' },
  { name: 'Garamond', value: 'Garamond, serif', category: 'Serif' },
  { name: 'Times New Roman', value: '"Times New Roman", Times, serif', category: 'Serif' },
  { name: 'Cambria', value: 'Cambria, serif', category: 'Serif' },
  
  // Sans-Serif Fonts
  { name: 'Arial', value: 'Arial, sans-serif', category: 'Sans-Serif' },
  { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif', category: 'Sans-Serif' },
  { name: 'Verdana', value: 'Verdana, Geneva, sans-serif', category: 'Sans-Serif' },
  { name: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif', category: 'Sans-Serif' },
  { name: 'Calibri', value: 'Calibri, sans-serif', category: 'Sans-Serif' },
  
  // Modern Web Fonts
  { name: 'Inter', value: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif', category: 'Modern' },
  { name: 'Roboto', value: '"Roboto", sans-serif', category: 'Modern' },
  { name: 'Open Sans', value: '"Open Sans", sans-serif', category: 'Modern' },
  { name: 'Poppins', value: '"Poppins", sans-serif', category: 'Modern' },
  { name: 'Lato', value: '"Lato", sans-serif', category: 'Modern' },
  { name: 'Montserrat', value: '"Montserrat", sans-serif', category: 'Modern' },
  { name: 'Playfair Display', value: '"Playfair Display", serif', category: 'Modern' },
  { name: 'Raleway', value: '"Raleway", sans-serif', category: 'Modern' },
  { name: 'Quicksand', value: '"Quicksand", sans-serif', category: 'Modern' },
  
  // Display Fonts
  { name: 'Impact', value: 'Impact, Charcoal, sans-serif', category: 'Display' },
  { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive', category: 'Display' },
  { name: 'Courier New', value: '"Courier New", monospace', category: 'Monospace' },
  { name: 'Monaco', value: 'Monaco, monospace', category: 'Monospace' }
];

export const getFontsByCategory = (category: string): any[] => {
  return FONT_FAMILIES.filter(f => f.category === category);
};

export const getAllFontCategories = (): string[] => {
  return Array.from(new Set(FONT_FAMILIES.map(f => f.category)));
};

export const getTemplateById = (id: string): CMSTemplate | undefined => {
  return CMS_TEMPLATES.find(t => t.id === id);
};

export const getTemplatesByCategory = (category: string): CMSTemplate[] => {
  return CMS_TEMPLATES.filter(t => t.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(CMS_TEMPLATES.map(t => t.category)));
};
