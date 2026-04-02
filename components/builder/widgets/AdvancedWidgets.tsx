'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, MapPin } from 'lucide-react';

export const CarouselWidget = ({ props }: { props: any }) => {
  const images = props.images || [
     'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
     'https://images.unsplash.com/photo-1454165833267-02300dec27a8?auto=format&fit=crop&q=80&w=800',
     'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  ];
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden group shadow-2xl border-2 border-white/50">
      <img src={images[index]} className="w-full h-full object-cover transition-all duration-1000 ease-in-out" alt="Slide" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2.5">
        {images.map((_: any, i: number) => (
           <div 
             key={i} 
             onClick={() => setIndex(i)}
             className={`cursor-pointer h-2 rounded-full transition-all duration-500 shadow-md ${index === i ? 'bg-white w-10' : 'bg-white/40 w-2 hover:bg-white/60'}`} 
           />
        ))}
      </div>
      <button 
        onClick={prev} 
        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 opacity-0 group-hover:opacity-100 hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button 
        onClick={next} 
        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 opacity-0 group-hover:opacity-100 hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export const FormWidget = ({ props }: { props: any }) => {
   const fields = props.fields || [
      { type: 'text', label: 'Full Name', placeholder: 'e.g. John Doe' },
      { type: 'email', label: 'Email Address', placeholder: 'your@email.com' },
      { type: 'textarea', label: 'Message', placeholder: 'Tell us what you need...' }
   ];

   return (
      <form 
        className="p-10 bg-white/70 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-8" 
        onSubmit={(e) => e.preventDefault()}
      >
         <div className="space-y-6">
            {fields.map((f: any, i: number) => (
               <div key={i} className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-[0.2em]">{f.label}</label>
                  {f.type === 'textarea' ? (
                     <textarea 
                       className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none min-h-[140px] text-slate-700 placeholder:text-slate-400 transition-all" 
                       placeholder={f.placeholder} 
                     />
                  ) : (
                     <input 
                       type={f.type} 
                       className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none text-slate-700 placeholder:text-slate-400 transition-all" 
                       placeholder={f.placeholder} 
                     />
                  )}
               </div>
            ))}
         </div>
         <button className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl shadow-[0_10px_20px_rgba(79,70,229,0.2)] hover:bg-indigo-700 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3 group active:translate-y-0">
            Submit Details <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:rotate-[-10deg]" />
         </button>
      </form>
   );
};

export const MapWidget = ({ props }: { props: any }) => {
   return (
      <div className="w-full aspect-[21/9] bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 shadow-inner flex flex-col items-center justify-center relative group">
         <div 
           className="absolute inset-0 bg-cover opacity-20 grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
           style={{ backgroundImage: `url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i2048!3i1344!2m3!1e0!2sm!3i352018844!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m3!1e12!2m1!1s1!4m59!1m2!1i4111!2i12345!2i12!3m40!2m3!1e0!2sm!3i352018844!3m9!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i1301875!28i1!29i1!30i1!31i1!32i1!33i1!34i1!35i1!38i1!39i1!40i1!41i1!42i1!43i1!44i1!45i1!48i1!49i1!50i1!51i1!52i1!53i1!54i1!55i1!56i1!57i1!58i1!59i1!60i1!61i1!62i1!63i1!115i1!120i1!123i1!129i1!130i1!131i1!132i1')` }}
         />
         <div className="relative z-10 flex flex-col items-center bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-2xl scale-90 group-hover:scale-100 transition-transform">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
               <MapPin className="w-8 h-8 text-white" />
            </div>
            <span className="font-black text-slate-800 text-lg uppercase tracking-wider">Map Component</span>
            <span className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.3rem]">Live Integration Pending</span>
         </div>
      </div>
   );
};

export const HtmlWidget = ({ props }: { props: any }) => {
   const code = props.code || '<div class="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300 rounded-3xl border border-slate-700 font-mono text-sm shadow-2xl"><span class="text-indigo-400">&lt;div&gt;</span> Custom HTML Code <span class="text-indigo-400">&lt;/div&gt;</span></div>';
   return <div className="w-full overflow-hidden rounded-2xl" dangerouslySetInnerHTML={{ __html: code }} />;
};
