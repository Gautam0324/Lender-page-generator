'use client';

import React from 'react';

export const HeadingWidget = ({ props }: { props: any }) => {
  const content = props.content || 'Add your heading text here';
  const tag = props.tag || 'h2';

  return React.createElement(tag, {
    className: 'm-0 font-bold leading-tight',
  }, content);
};

export const TextWidget = ({ props }: { props: any }) => {
  const content = props.content || 'Enter your text content here. This is a rich text area where you can add paragraphs, bullet points, and more formatting to describe your product or service.';

  return <div 
    className="prose prose-sm max-w-none text-gray-600"
    dangerouslySetInnerHTML={{ __html: content }} 
  />;
};

export const ImageWidget = ({ props }: { props: any }) => {
  const src = props.src || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';
  const alt = props.alt || 'Placeholder';

  return (
    <div className="w-full relative group">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-auto rounded-lg shadow-sm" 
      />
    </div>
  );
};

export const ButtonWidget = ({ props }: { props: any }) => {
  const label = props.label || 'Click Here';
  const type = props.type || 'primary';

  const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all shadow-md active:scale-95 inline-block";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg",
    secondary: "bg-gray-800 text-white hover:bg-gray-900",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-gray-600 hover:bg-gray-100 shadow-none"
  };

  return (
    <button className={`${baseStyles} ${variants[type as keyof typeof variants] || variants.primary}`}>
      {label}
    </button>
  );
};
