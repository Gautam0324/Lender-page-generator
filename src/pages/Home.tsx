import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, DollarSign, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { getStorageItem, INITIAL_DATA } from '../store/localStorage';

// --- Section Components ---

const getAnimationStyle = (data: any): React.CSSProperties => {
  const animation = data?.animation;
  const duration = data?.animationDuration || 0.5;
  
  if (!animation || animation === 'none') return {};
  
  const animationMap: { [key: string]: string } = {
    'fade-in': 'animate-fade-in',
    'fade-out': 'animate-fade-out',
    'slide-in-up': 'animate-slide-in-up',
    'slide-in-down': 'animate-slide-in-down',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
    'zoom-in': 'animate-zoom-in',
    'zoom-out': 'animate-zoom-out',
    'bounce-in': 'animate-bounce-in',
    'rotate-in': 'animate-rotate-in',
    'pulse': 'animate-pulse',
  };
  
  return {
    animation: `${animationMap[animation] || animation} ${duration}s ease-in-out`,
  };
};

const getAnimationClassName = (data: any): string => {
  const animation = data?.animation;
  
  if (!animation || animation === 'none') return '';
  
  const animationMap: { [key: string]: string } = {
    'fade-in': 'animate-fade-in',
    'fade-out': 'animate-fade-out',
    'slide-in-up': 'animate-slide-in-up',
    'slide-in-down': 'animate-slide-in-down',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
    'zoom-in': 'animate-zoom-in',
    'zoom-out': 'animate-zoom-out',
    'bounce-in': 'animate-bounce-in',
    'rotate-in': 'animate-rotate-in',
    'pulse': 'animate-pulse',
  };
  
  return animationMap[animation] || '';
};

const getRadiusValue = (value: any) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return undefined;
  return `${parsed}px`;
};

const getSectionRadiusStyle = (data: any): React.CSSProperties | undefined => {
  const radius = getRadiusValue(data?.sectionBorderRadius);
  if (!radius) return undefined;
  return { borderRadius: radius, overflow: 'hidden' };
};

const getImageRadiusStyle = (data: any): React.CSSProperties | undefined => {
  const radius = getRadiusValue(data?.imageBorderRadius);
  if (!radius) return undefined;
  return { borderRadius: radius };
};

const HeroSection: React.FC<{ data: any }> = ({ data }) => {
  const alignment = data.buttonAlignment || 'center';
  const justifyClass = alignment === 'left' ? 'justify-start' : alignment === 'right' ? 'justify-end' : 'justify-center';
  const animationClass = getAnimationClassName(data);
  const duration = data?.animationDuration || 0.5;
  
  return (
  <section 
    className={`relative bg-[var(--color-primary)] text-white py-24 lg:py-32 overflow-hidden ${animationClass}`}
    style={{...getSectionRadiusStyle(data), animationDuration: `${duration}s`}}
  >
    <div className="absolute inset-0 z-0 opacity-20">
      {data.videoUrl ? (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          style={getImageRadiusStyle(data)}
        >
          <source src={data.videoUrl} type="video/mp4" />
          {data.image && (
            <img 
              src={data.image} 
              alt="Hero Background" 
              className="w-full h-full object-cover"
              style={getImageRadiusStyle(data)}
              referrerPolicy="no-referrer" 
            />
          )}
        </video>
      ) : (
        <img 
          src={data.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"} 
          alt="Hero Background" 
          className="w-full h-full object-cover" 
          style={getImageRadiusStyle(data)}
          referrerPolicy="no-referrer" 
        />
      )}
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight">
        {data.title}
      </h1>
      <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
        {data.subtitle}
      </p>
      <div className={`flex flex-col sm:flex-row ${justifyClass} gap-4`}>
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
};

const CustomSection: React.FC<{ data: any, index: number }> = ({ data, index }) => {
  const alignment = data.buttonAlignment || 'left';
  const justifyClass = alignment === 'left' ? 'justify-start' : alignment === 'right' ? 'justify-end' : 'justify-center';
  const animationClass = getAnimationClassName(data);
  const duration = data?.animationDuration || 0.5;
  
  return (
  <section
    className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${animationClass}`}
    style={{ ...getSectionRadiusStyle(data), animationDuration: `${duration}s` }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`flex flex-col ${data.imageAlignment === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] font-heading mb-6">{data.heading}</h2>
          <div 
            className="text-lg text-gray-600 leading-relaxed mb-8 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
          <div className={`flex flex-col sm:flex-row ${justifyClass} gap-4`}>
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
            <img src={data.image} alt={data.heading} className="w-full h-auto rounded-xl shadow-lg object-cover max-h-[500px]" style={getImageRadiusStyle(data)} referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400" style={getImageRadiusStyle(data)}>
              No Image Provided
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
  );
};

const HowItWorksSection: React.FC<{ data: any }> = ({ data }) => (
  <section
    className={`py-20 bg-white ${getAnimationClassName(data)}`}
    style={{ ...getSectionRadiusStyle(data), animationDuration: `${data?.animationDuration || 0.5}s` }}
  >
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
  <section className="py-20 bg-gray-50" style={getSectionRadiusStyle(data)}>
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
    <section className="py-20 bg-white" style={getSectionRadiusStyle(data)}>
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

const CtaSection: React.FC<{ data: any }> = ({ data }) => {
  const alignment = data.buttonAlignment || 'center';
  const justifyClass = alignment === 'left' ? 'justify-start' : alignment === 'right' ? 'justify-end' : 'justify-center';
  const animationClass = getAnimationClassName(data);
  const duration = data?.animationDuration || 0.5;
  
  return (
  <section
    className={`py-20 bg-[var(--color-primary)] text-white text-center ${animationClass}`}
    style={{ ...getSectionRadiusStyle(data), animationDuration: `${duration}s` }}
  >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">{data.heading || 'Ready to Take the Next Step?'}</h2>
      <p className="text-xl text-blue-100 mb-10">{data.subtitle || 'Apply online today and get your funds as soon as tomorrow.'}</p>
      <div className={`flex flex-col sm:flex-row ${justifyClass} gap-4`}>
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
};

const ParagraphSection: React.FC<{ data: any }> = ({ data }) => (
  <section className="py-12 bg-white" style={getSectionRadiusStyle(data)}>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        className="text-lg text-gray-700 leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  </section>
);

const ListSection: React.FC<{ data: any }> = ({ data }) => (
  <section className="py-12 bg-gray-50" style={getSectionRadiusStyle(data)}>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {data.heading && (
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] font-heading mb-6">
          {data.heading}
        </h2>
      )}
      <ul className="space-y-3 text-lg text-gray-700">
        {(data.items || []).map((item: string, index: number) => (
          <li key={index} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    </div>
  </section>
);

const RawHtmlSection: React.FC<{ data: any }> = ({ data }) => (
  <section className="py-0 bg-white" style={getSectionRadiusStyle(data)}>
    <div
      className="custom-html-block"
      dangerouslySetInnerHTML={{ __html: data?.html || '' }}
    />
  </section>
);

const AnnouncementBarSection: React.FC<{ data: any }> = ({ data }) => {
  const [countdownText, setCountdownText] = React.useState('');

  React.useEffect(() => {
    if (!data.countdownEnabled || !data.countdownTarget) {
      setCountdownText('');
      return;
    }

    const updateCountdown = () => {
      const targetTime = new Date(data.countdownTarget).getTime();
      if (Number.isNaN(targetTime)) {
        setCountdownText('Invalid date');
        return;
      }

      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setCountdownText('00d 00h 00m 00s');
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (value: number) => String(value).padStart(2, '0');
      setCountdownText(`${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`);
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, [data.countdownEnabled, data.countdownTarget]);

  const items = (data.items || []).filter((item: string) => item?.trim());
  const repeatedItems = [...items, ...items];
  const speed = Math.max(10, Number(data.speed) || 30);

  return (
    <section className="bg-[var(--color-secondary)] text-white py-2.5" style={getSectionRadiusStyle(data)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
        <div className="overflow-hidden flex-1">
          {items.length > 0 ? (
            <div
              className="announcement-marquee-track flex items-center gap-8 min-w-max"
              style={{ animationDuration: `${speed}s` }}
            >
              {repeatedItems.map((item: string, index: number) => (
                <div key={`${item}-${index}`} className="flex items-center gap-3 text-sm font-semibold whitespace-nowrap">
                  <span>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm font-semibold">Add announcement items from CMS.</div>
          )}
        </div>
        {data.countdownEnabled && data.countdownTarget && (
          <div className="shrink-0 bg-black/20 px-3 py-1 rounded-md text-xs sm:text-sm font-bold whitespace-nowrap">
            {(data.countdownLabel || 'Offer ends in')}: {countdownText || '00d 00h 00m 00s'}
          </div>
        )}
      </div>
    </section>
  );
};

const SaleCountdownSection: React.FC<{ data: any }> = ({ data }) => {
  const [timeParts, setTimeParts] = React.useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    statusText: ''
  });

  React.useEffect(() => {
    const updateCountdown = () => {
      const targetTime = new Date(data.targetDate).getTime();
      if (!data.targetDate || Number.isNaN(targetTime)) {
        setTimeParts({ days: '00', hours: '00', minutes: '00', seconds: '00', statusText: 'Set sale end date in CMS' });
        return;
      }

      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setTimeParts({ days: '00', hours: '00', minutes: '00', seconds: '00', statusText: 'Sale ended' });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (value: number) => String(value).padStart(2, '0');
      setTimeParts({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
        statusText: ''
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, [data.targetDate]);

  const ctaLink = data.ctaLink || '/apply';
  const bgFrom = data.bgFrom || '#991b1b';
  const bgTo = data.bgTo || '#b91c1c';
  const textColor = data.textColor || '#ffffff';
  const subtextColor = data.subtextColor || '#fee2e2';
  const timerBoxBgColor = data.timerBoxBgColor || 'rgba(255,255,255,0.12)';
  const timerBoxBorderColor = data.timerBoxBorderColor || 'rgba(255,255,255,0.22)';
  const ctaBgColor = data.ctaBgColor || '#ffffff';
  const ctaTextColor = data.ctaTextColor || '#b91c1c';

  return (
    <section
      className="py-16 md:py-20"
      style={{
        background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})`,
        color: textColor,
        ...getSectionRadiusStyle(data)
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {data.eyebrow && (
          <p className="uppercase tracking-[0.35em] text-xs md:text-sm mb-5 font-semibold" style={{ color: subtextColor }}>
            {data.eyebrow}
          </p>
        )}

        <h2 className="text-4xl md:text-6xl font-extrabold font-heading leading-tight mb-6">
          {data.heading || 'Storm Season Is Already Here. Is Your Roof Ready?'}
        </h2>

        <p className="text-xl md:text-3xl italic leading-relaxed max-w-4xl mx-auto mb-10 font-serif" style={{ color: subtextColor }}>
          {data.subtitle || 'Spring storms, hail, and heavy rainfall are among the leading causes of emergency repairs.'}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { label: 'Days', value: timeParts.days },
            { label: 'Hours', value: timeParts.hours },
            { label: 'Minutes', value: timeParts.minutes },
            { label: 'Seconds', value: timeParts.seconds }
          ].map((part) => (
            <div
              key={part.label}
              className="rounded-lg backdrop-blur-sm py-5 md:py-6 border"
              style={{ backgroundColor: timerBoxBgColor, borderColor: timerBoxBorderColor }}
            >
              <div className="text-5xl md:text-6xl font-extrabold font-heading leading-none">{part.value}</div>
              <div className="mt-2 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold" style={{ color: subtextColor }}>{part.label}</div>
            </div>
          ))}
        </div>

        <p className="italic text-base md:text-lg mb-8" style={{ color: subtextColor }}>
          {data.note || 'Time remaining before peak season'}
          {data.targetDate ? ` (${new Date(data.targetDate).toLocaleDateString()})` : ''}
        </p>

        {timeParts.statusText && (
          <p className="mb-6 font-semibold" style={{ color: subtextColor }}>{timeParts.statusText}</p>
        )}

        {data.ctaText && (
          ctaLink.startsWith('http') ? (
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto md:min-w-[620px] justify-center items-center px-8 py-5 rounded-md font-extrabold text-xl uppercase tracking-wide transition-opacity hover:opacity-90"
              style={{ backgroundColor: ctaBgColor, color: ctaTextColor }}
            >
              {data.ctaText} <span className="ml-2">→</span>
            </a>
          ) : (
            <Link
              to={ctaLink}
              className="inline-flex w-full md:w-auto md:min-w-[620px] justify-center items-center px-8 py-5 rounded-md font-extrabold text-xl uppercase tracking-wide transition-opacity hover:opacity-90"
              style={{ backgroundColor: ctaBgColor, color: ctaTextColor }}
            >
              {data.ctaText} <span className="ml-2">→</span>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

const CustomHeaderSection: React.FC<{ data: any }> = ({ data }) => (
  <section className="bg-[var(--color-primary)] text-white py-3" style={getSectionRadiusStyle(data)}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-medium">
      {data.text}
    </div>
  </section>
);

const CustomFooterSection: React.FC<{ data: any }> = ({ data }) => (
  <section className="bg-gray-900 text-gray-200 py-4" style={getSectionRadiusStyle(data)}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
      {data.text}
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
          case 'customHeader': return <CustomHeaderSection key={block.id} data={block.data} />;
          case 'announcement': return <AnnouncementBarSection key={block.id} data={block.data} />;
          case 'saleCountdown': return <SaleCountdownSection key={block.id} data={block.data} />;
          case 'hero': return <HeroSection key={block.id} data={block.data} />;
          case 'rawHtml': return <RawHtmlSection key={block.id} data={block.data} />;
          case 'custom': return <CustomSection key={block.id} data={block.data} index={index} />;
          case 'paragraph': return <ParagraphSection key={block.id} data={block.data} />;
          case 'list': return <ListSection key={block.id} data={block.data} />;
          case 'howItWorks': return <HowItWorksSection key={block.id} data={block.data} />;
          case 'testimonials': return <TestimonialsSection key={block.id} data={block.data} />;
          case 'faq': return <FaqSection key={block.id} data={block.data} />;
          case 'cta': return <CtaSection key={block.id} data={block.data} />;
          case 'customFooter': return <CustomFooterSection key={block.id} data={block.data} />;
          default: return null;
        }
      })}
    </div>
  );
}
