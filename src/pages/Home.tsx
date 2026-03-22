import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, DollarSign, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { getStorageItem, INITIAL_DATA } from '../store/localStorage';

// --- Section Components ---

const HeroSection: React.FC<{ data: any }> = ({ data }) => (
  <section className="relative bg-[var(--color-primary)] text-white py-24 lg:py-32 overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-20">
      <img 
        src={data.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"} 
        alt="Hero Background" 
        className="w-full h-full object-cover" 
        referrerPolicy="no-referrer" 
      />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight">
        {data.title}
      </h1>
      <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
        {data.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {data.ctaText && (
          <Link to={data.ctaLink || '/apply'} className="bg-[var(--color-secondary)] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-colors shadow-lg flex items-center justify-center">
            {data.ctaText} <ArrowRight className="ml-2" size={20} />
          </Link>
        )}
        {data.secondaryCtaText && (
          <Link to={data.secondaryCtaLink || '/services'} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors flex items-center justify-center">
            {data.secondaryCtaText}
          </Link>
        )}
      </div>
    </div>
  </section>
);

const CustomSection: React.FC<{ data: any, index: number }> = ({ data, index }) => (
  <section className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`flex flex-col ${data.imageAlignment === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] font-heading mb-6">{data.heading}</h2>
          <div 
            className="text-lg text-gray-600 leading-relaxed mb-8 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            {data.buttonText && (
              data.buttonLink?.startsWith('http') ? (
                <a 
                  href={data.buttonLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-[var(--color-secondary)] text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors shadow-md text-center"
                >
                  {data.buttonText}
                </a>
              ) : (
                <Link 
                  to={data.buttonLink || '#'} 
                  className="inline-block bg-[var(--color-secondary)] text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors shadow-md text-center"
                >
                  {data.buttonText}
                </Link>
              )
            )}
            {data.secondaryButtonText && (
              data.secondaryButtonLink?.startsWith('http') ? (
                <a 
                  href={data.secondaryButtonLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-white text-[var(--color-secondary)] border-2 border-[var(--color-secondary)] px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-md text-center"
                >
                  {data.secondaryButtonText}
                </a>
              ) : (
                <Link 
                  to={data.secondaryButtonLink || '#'} 
                  className="inline-block bg-white text-[var(--color-secondary)] border-2 border-[var(--color-secondary)] px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-md text-center"
                >
                  {data.secondaryButtonText}
                </Link>
              )
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {data.image ? (
            <img src={data.image} alt={data.heading} className="w-full h-auto rounded-xl shadow-lg object-cover max-h-[500px]" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
              No Image Provided
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

const HowItWorksSection: React.FC<{ data: any }> = ({ data }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] font-heading mb-4">{data.heading || 'How It Works'}</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{data.subtitle || 'Get your funds in three simple steps.'}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative mb-12">
        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-200 z-0"></div>
        {[
          { icon: <Clock size={32} />, title: "1. Apply Online", desc: "Fill out our simple 5-minute application form." },
          { icon: <CheckCircle size={32} />, title: "2. Get Approved", desc: "Receive a decision within minutes of applying." },
          { icon: <DollarSign size={32} />, title: "3. Receive Funds", desc: "Money deposited directly into your account." }
        ].map((step, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-[var(--color-primary)] mb-6 shadow-sm border border-blue-100">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12 flex flex-col sm:flex-row justify-center gap-4">
        {data.buttonText && (
          <Link to={data.buttonLink || '#'} className="inline-block bg-[var(--color-secondary)] text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors shadow-md">
            {data.buttonText}
          </Link>
        )}
        {data.secondaryButtonText && (
          <Link to={data.secondaryButtonLink || '#'} className="inline-block bg-white text-[var(--color-secondary)] border-2 border-[var(--color-secondary)] px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-md">
            {data.secondaryButtonText}
          </Link>
        )}
      </div>
    </div>
  </section>
);

const TestimonialsSection: React.FC<{ data: any }> = ({ data }) => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] font-heading mb-4">{data.heading || 'What Our Clients Say'}</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{data.subtitle || "Don't just take our word for it."}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {data.items?.map((testimonial: any) => (
          <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
            <div className="flex text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
            <div>
              <p className="font-bold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12 flex flex-col sm:flex-row justify-center gap-4">
        {data.buttonText && (
          <Link to={data.buttonLink || '#'} className="inline-block bg-[var(--color-secondary)] text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors shadow-md">
            {data.buttonText}
          </Link>
        )}
        {data.secondaryButtonText && (
          <Link to={data.secondaryButtonLink || '#'} className="inline-block bg-white text-[var(--color-secondary)] border-2 border-[var(--color-secondary)] px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-md">
            {data.secondaryButtonText}
          </Link>
        )}
      </div>
    </div>
  </section>
);

const FaqSection: React.FC<{ data: any }> = ({ data }) => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] font-heading mb-4">{data.heading || 'Frequently Asked Questions'}</h2>
          <p className="text-xl text-gray-600">{data.subtitle || 'Everything you need to know about our lending process.'}</p>
        </div>
        <div className="space-y-4 mb-12">
          {data.items?.map((faq: any) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-blue-300">
              <button
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-blue-50 flex justify-between items-center focus:outline-none"
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              >
                <span className="font-bold text-gray-900">{faq.question}</span>
                {openFaq === faq.id ? <ChevronUp className="text-[var(--color-primary)]" /> : <ChevronDown className="text-gray-400" />}
              </button>
              {openFaq === faq.id && (
                <div className="px-6 py-4 bg-white text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-12 flex flex-col sm:flex-row justify-center gap-4">
          {data.buttonText && (
            <Link to={data.buttonLink || '#'} className="inline-block bg-[var(--color-secondary)] text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors shadow-md">
              {data.buttonText}
            </Link>
          )}
          {data.secondaryButtonText && (
            <Link to={data.secondaryButtonLink || '#'} className="inline-block bg-white text-[var(--color-secondary)] border-2 border-[var(--color-secondary)] px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-md">
              {data.secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

const CtaSection: React.FC<{ data: any }> = ({ data }) => (
  <section className="py-20 bg-[var(--color-primary)] text-white text-center">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">{data.heading || 'Ready to Take the Next Step?'}</h2>
      <p className="text-xl text-blue-100 mb-10">{data.subtitle || 'Apply online today and get your funds as soon as tomorrow.'}</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {data.buttonText && (
          <Link to={data.buttonLink || '/apply'} className="inline-block bg-[var(--color-secondary)] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-colors shadow-lg">
            {data.buttonText}
          </Link>
        )}
        {data.secondaryButtonText && (
          <Link to={data.secondaryButtonLink || '#'} className="inline-block bg-transparent text-white border-2 border-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors shadow-lg">
            {data.secondaryButtonText}
          </Link>
        )}
      </div>
    </div>
  </section>
);

const ParagraphSection: React.FC<{ data: any }> = ({ data }) => (
  <section className="py-12 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        className="text-lg text-gray-700 leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  </section>
);

const ListSection: React.FC<{ data: any }> = ({ data }) => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {data.heading && (
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] font-heading mb-6">
          {data.heading}
        </h2>
      )}
      <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
        {(data.items || []).map((item: string, index: number) => (
          <li key={index} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    </div>
  </section>
);

// --- Main Home Component ---

export default function Home() {
  const cms = getStorageItem('cms', INITIAL_DATA.cms);
  
  // Migration logic for old data format
  let blocks = cms.blocks;
  if (!blocks) {
    blocks = [
      { id: 'hero-1', type: 'hero', data: cms.hero || INITIAL_DATA.cms.blocks[0].data },
      ...(cms.customSections || []).map((cs: any) => ({ id: `custom-${cs.id}`, type: 'custom', data: cs })),
      { id: 'howItWorks-1', type: 'howItWorks', data: {} },
      { id: 'testimonials-1', type: 'testimonials', data: { items: cms.testimonials || [] } },
      { id: 'faq-1', type: 'faq', data: { items: cms.faqs || [] } },
      { id: 'cta-1', type: 'cta', data: {} }
    ];
  }

  return (
    <div className="flex flex-col min-h-screen">
      {blocks.map((block: any, index: number) => {
        switch (block.type) {
          case 'hero': return <HeroSection key={block.id} data={block.data} />;
          case 'custom': return <CustomSection key={block.id} data={block.data} index={index} />;
          case 'paragraph': return <ParagraphSection key={block.id} data={block.data} />;
          case 'list': return <ListSection key={block.id} data={block.data} />;
          case 'howItWorks': return <HowItWorksSection key={block.id} data={block.data} />;
          case 'testimonials': return <TestimonialsSection key={block.id} data={block.data} />;
          case 'faq': return <FaqSection key={block.id} data={block.data} />;
          case 'cta': return <CtaSection key={block.id} data={block.data} />;
          default: return null;
        }
      })}
    </div>
  );
}
