export const INITIAL_DATA = {
  settings: {
    siteName: 'LendFlow',
    contactEmail: 'support@lendflow.com',
    contactPhone: '(555) 123-4567',
    contactAddress: '123 Financial District, NY 10004',
    adminPassword: 'admin'
  },
  applications: [],
  users: [
    { id: 1, name: 'Admin User', email: 'admin@lendflow.com', role: 'admin', status: 'active', lastLogin: '2023-10-15T10:30:00Z' }
  ],
  cms: {
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        data: {
          title: 'Fast & Reliable Loans for Your Needs',
          subtitle: 'Get approved in minutes with our simple online application process. Competitive rates and flexible terms.',
          ctaText: 'Apply Now',
          ctaLink: '/apply',
          secondaryCtaText: 'Explore Services',
          secondaryCtaLink: '/services',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        }
      },
      {
        id: 'custom-1',
        type: 'custom',
        data: {
          heading: 'Tailored Financial Solutions',
          content: 'We understand that every financial journey is unique. That is why we offer personalized solutions to meet your specific needs.\n\nOur team of experts works closely with you to ensure you get the best rates and terms available in the market.',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeefa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          imageAlignment: 'right',
          buttonText: 'Learn More',
          buttonLink: '/about',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'custom-2',
        type: 'custom',
        data: {
          heading: 'Secure & Transparent Process',
          content: 'Security and transparency are at the core of everything we do. From application to funding, you will always know where you stand.\n\nNo hidden fees, no surprises. Just straightforward lending you can trust.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          imageAlignment: 'left',
          buttonText: 'Apply Now',
          buttonLink: '/apply',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'howItWorks-1',
        type: 'howItWorks',
        data: {
          heading: 'How It Works',
          subtitle: 'Get your funds in three simple steps.',
          buttonText: 'Start Application',
          buttonLink: '/apply',
          secondaryButtonText: 'Learn More',
          secondaryButtonLink: '/about'
        }
      },
      {
        id: 'testimonials-1',
        type: 'testimonials',
        data: {
          heading: 'What Our Clients Say',
          subtitle: 'Don\'t just take our word for it.',
          buttonText: 'View All Reviews',
          buttonLink: '/about',
          secondaryButtonText: 'Submit Review',
          secondaryButtonLink: '/contact',
          items: [
            { id: 1, name: 'David L.', role: 'Small Business Owner', text: 'The business loan process was incredibly smooth. I had the funds in my account within 48 hours.' },
            { id: 2, name: 'Emily R.', role: 'Homeowner', text: 'They helped me secure a mortgage with a great rate when other banks turned me down.' },
            { id: 3, name: 'Michael T.', role: 'Startup Founder', text: 'Excellent customer service and transparent terms. Highly recommended for any growing business.' }
          ]
        }
      },
      {
        id: 'faq-1',
        type: 'faq',
        data: {
          heading: 'Frequently Asked Questions',
          subtitle: 'Everything you need to know about our lending process.',
          buttonText: 'Contact Support',
          buttonLink: '/contact',
          secondaryButtonText: 'View All FAQs',
          secondaryButtonLink: '/about',
          items: [
            { id: 1, question: 'What are your interest rates?', answer: 'Our interest rates vary depending on the loan type, your credit score, and market conditions. Contact us for a personalized quote.' },
            { id: 2, question: 'How long does the approval process take?', answer: 'For personal loans, approval can be as fast as 24 hours. Mortgages and business loans typically take 1-3 weeks.' },
            { id: 3, question: 'Are there any prepayment penalties?', answer: 'Most of our loan products do not have prepayment penalties, allowing you to pay off your loan early and save on interest.' }
          ]
        }
      },
      {
        id: 'cta-1',
        type: 'cta',
        data: {
          heading: 'Ready to Take the Next Step?',
          subtitle: 'Apply online today and get your funds as soon as tomorrow.',
          buttonText: 'Start Your Application',
          buttonLink: '/apply',
          secondaryButtonText: 'Contact Us',
          secondaryButtonLink: '/contact'
        }
      }
    ]
  }
};

export const getStorageItem = (key: string, defaultValue: any) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return defaultValue;
  }
};

export const setStorageItem = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to localStorage', error);
  }
};

export const removeStorageItem = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage', error);
  }
};

export const initializeData = () => {
  if (!window.localStorage.getItem('settings')) {
    setStorageItem('settings', INITIAL_DATA.settings);
  }
  if (!window.localStorage.getItem('applications')) {
    setStorageItem('applications', INITIAL_DATA.applications);
  }
  if (!window.localStorage.getItem('users')) {
    setStorageItem('users', INITIAL_DATA.users);
  }
  if (!window.localStorage.getItem('cms')) {
    setStorageItem('cms', INITIAL_DATA.cms);
  }
};
