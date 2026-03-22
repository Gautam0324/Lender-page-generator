import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Trash2, Plus, Download, ExternalLink, RefreshCw, X, GripVertical, Image as ImageIcon, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { getStorageItem, setStorageItem, INITIAL_DATA } from '../../store/localStorage';
import Editor from '../../components/tiptap/Editor';

// --- Helper Functions ---

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
  const file = e.target.files?.[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('Image is too large. Please upload an image smaller than 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

const createNewBlock = (type: string) => {
  const id = `${type}-${Date.now()}`;
  let data = {};
  if (type === 'hero') data = { title: 'New Hero', subtitle: 'Subtitle', ctaText: 'Click Here', ctaLink: '/', secondaryCtaText: '', secondaryCtaLink: '', image: '' };
  if (type === 'custom') data = { heading: 'New Section', content: 'Content...', image: '', imageAlignment: 'right', buttonText: '', buttonLink: '', secondaryButtonText: '', secondaryButtonLink: '' };
  if (type === 'howItWorks') data = { heading: 'How It Works', subtitle: 'Subtitle', buttonText: '', buttonLink: '', secondaryButtonText: '', secondaryButtonLink: '' };
  if (type === 'testimonials') data = { heading: 'Testimonials', subtitle: 'Subtitle', buttonText: '', buttonLink: '', secondaryButtonText: '', secondaryButtonLink: '', items: [] };
  if (type === 'faq') data = { heading: 'FAQ', subtitle: 'Subtitle', buttonText: '', buttonLink: '', secondaryButtonText: '', secondaryButtonLink: '', items: [] };
  if (type === 'cta') data = { heading: 'Call to Action', subtitle: 'Subtitle', buttonText: 'Click Here', buttonLink: '/', secondaryButtonText: '', secondaryButtonLink: '' };
  if (type === 'paragraph') data = { content: 'Your paragraph text here...' };
  if (type === 'list') data = { heading: 'List Heading', items: ['Item 1', 'Item 2'] };
  return { id, type, data };
};

// --- Block Editor Component ---

const BlockEditor = ({ block, updateData }: { block: any, updateData: (data: any) => void }) => {
  const { type, data } = block;

  if (type === 'hero') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
          <input type="text" value={data.title || ''} onChange={(e) => updateData({ ...data, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subheadline</label>
          <textarea value={data.subtitle || ''} onChange={(e) => updateData({ ...data, subtitle: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none resize-none"></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
            <input type="text" value={data.ctaText || ''} onChange={(e) => updateData({ ...data, ctaText: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Link</label>
            <input type="text" value={data.ctaLink || ''} onChange={(e) => updateData({ ...data, ctaLink: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
            <input type="text" value={data.secondaryCtaText || ''} onChange={(e) => updateData({ ...data, secondaryCtaText: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
            <input type="text" value={data.secondaryCtaLink || ''} onChange={(e) => updateData({ ...data, secondaryCtaLink: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <input type="text" value={data.image || ''} onChange={(e) => updateData({ ...data, image: e.target.value })} placeholder="Image URL or upload below..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none mb-2" />
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload size={16} className="mr-2 text-gray-500" />
                <span className="text-sm text-gray-600 font-medium">Upload from computer</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => updateData({ ...data, image: base64 }))} />
              </label>
            </div>
            {data.image && (
              <div className="w-32 h-24 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'custom') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input type="text" value={data.heading || ''} onChange={(e) => updateData({ ...data, heading: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (Text)</label>
            <Editor 
              content={data.content || ''} 
              onChange={(html: string) => updateData({ ...data, content: html })} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
              <input type="text" value={data.buttonText || ''} onChange={(e) => updateData({ ...data, buttonText: e.target.value })} placeholder="e.g. Read More" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Link</label>
              <input type="text" value={data.buttonLink || ''} onChange={(e) => updateData({ ...data, buttonLink: e.target.value })} placeholder="e.g. /about or https://..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
              <input type="text" value={data.secondaryButtonText || ''} onChange={(e) => updateData({ ...data, secondaryButtonText: e.target.value })} placeholder="e.g. Contact Us" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
              <input type="text" value={data.secondaryButtonLink || ''} onChange={(e) => updateData({ ...data, secondaryButtonLink: e.target.value })} placeholder="e.g. /contact" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image Alignment</label>
            <div className="flex space-x-4">
              <label className="flex items-center"><input type="radio" checked={data.imageAlignment === 'left'} onChange={() => updateData({ ...data, imageAlignment: 'left' })} className="mr-2 text-[var(--color-primary)]" /> Image Left</label>
              <label className="flex items-center"><input type="radio" checked={data.imageAlignment === 'right'} onChange={() => updateData({ ...data, imageAlignment: 'right' })} className="mr-2 text-[var(--color-primary)]" /> Image Right</label>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-48 flex flex-col items-center justify-center relative overflow-hidden bg-white">
            {data.image ? (
              <>
                <img src={data.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                <div className="relative z-10 bg-white/90 p-3 rounded-lg shadow-sm backdrop-blur-sm">
                  <label className="cursor-pointer flex items-center text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)]">
                    <Upload size={16} className="mr-2" /> Change Image
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => updateData({ ...data, image: base64 }))} />
                  </label>
                </div>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center text-gray-500 hover:text-[var(--color-primary)] transition-colors">
                <ImageIcon size={32} className="mb-2" />
                <span className="text-sm font-medium">Click to upload image</span>
                <span className="text-xs text-gray-400 mt-1">Max 2MB (JPEG/PNG)</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => updateData({ ...data, image: base64 }))} />
              </label>
            )}
          </div>
          <div className="mt-2">
            <input type="text" value={data.image || ''} onChange={(e) => updateData({ ...data, image: e.target.value })} placeholder="Or paste image URL here..." className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'testimonials') {
    const items = data.items || [];
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
            <input type="text" value={data.heading || ''} onChange={(e) => updateData({ ...data, heading: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
            <input type="text" value={data.subtitle || ''} onChange={(e) => updateData({ ...data, subtitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
            <input type="text" value={data.buttonText || ''} onChange={(e) => updateData({ ...data, buttonText: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Link</label>
            <input type="text" value={data.buttonLink || ''} onChange={(e) => updateData({ ...data, buttonLink: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
            <input type="text" value={data.secondaryButtonText || ''} onChange={(e) => updateData({ ...data, secondaryButtonText: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
            <input type="text" value={data.secondaryButtonLink || ''} onChange={(e) => updateData({ ...data, secondaryButtonLink: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
        <button onClick={() => updateData({ ...data, items: [...items, { id: Date.now(), name: 'New Client', role: 'Role', text: 'Testimonial text...' }] })} className="text-[var(--color-secondary)] hover:text-yellow-600 font-medium flex items-center text-sm">
          <Plus size={16} className="mr-1" /> Add Testimonial
        </button>
        {items.map((item: any, index: number) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50">
            <button onClick={() => updateData({ ...data, items: items.filter((i: any) => i.id !== item.id) })} className="absolute top-4 right-4 text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input type="text" value={item.name || ''} onChange={(e) => updateData({ ...data, items: items.map((i: any) => i.id === item.id ? { ...i, name: e.target.value } : i) })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Role</label>
                <input type="text" value={item.role || ''} onChange={(e) => updateData({ ...data, items: items.map((i: any) => i.id === item.id ? { ...i, role: e.target.value } : i) })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Text</label>
              <textarea value={item.text || ''} onChange={(e) => updateData({ ...data, items: items.map((i: any) => i.id === item.id ? { ...i, text: e.target.value } : i) })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none resize-none"></textarea>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'faq') {
    const items = data.items || [];
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
            <input type="text" value={data.heading || ''} onChange={(e) => updateData({ ...data, heading: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
            <input type="text" value={data.subtitle || ''} onChange={(e) => updateData({ ...data, subtitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
            <input type="text" value={data.buttonText || ''} onChange={(e) => updateData({ ...data, buttonText: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Link</label>
            <input type="text" value={data.buttonLink || ''} onChange={(e) => updateData({ ...data, buttonLink: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
            <input type="text" value={data.secondaryButtonText || ''} onChange={(e) => updateData({ ...data, secondaryButtonText: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
            <input type="text" value={data.secondaryButtonLink || ''} onChange={(e) => updateData({ ...data, secondaryButtonLink: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
        <button onClick={() => updateData({ ...data, items: [...items, { id: Date.now(), question: 'New Question', answer: 'New Answer' }] })} className="text-[var(--color-secondary)] hover:text-yellow-600 font-medium flex items-center text-sm">
          <Plus size={16} className="mr-1" /> Add FAQ
        </button>
        {items.map((item: any, index: number) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50">
            <button onClick={() => updateData({ ...data, items: items.filter((i: any) => i.id !== item.id) })} className="absolute top-4 right-4 text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
            <div className="space-y-4 pr-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <input type="text" value={item.question || ''} onChange={(e) => updateData({ ...data, items: items.map((i: any) => i.id === item.id ? { ...i, question: e.target.value } : i) })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <textarea value={item.answer || ''} onChange={(e) => updateData({ ...data, items: items.map((i: any) => i.id === item.id ? { ...i, answer: e.target.value } : i) })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none resize-none"></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'howItWorks' || type === 'cta') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
            <input type="text" value={data.heading || ''} onChange={(e) => updateData({ ...data, heading: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
            <input type="text" value={data.subtitle || ''} onChange={(e) => updateData({ ...data, subtitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
            <input type="text" value={data.buttonText || ''} onChange={(e) => updateData({ ...data, buttonText: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Link</label>
            <input type="text" value={data.buttonLink || ''} onChange={(e) => updateData({ ...data, buttonLink: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
            <input type="text" value={data.secondaryButtonText || ''} onChange={(e) => updateData({ ...data, secondaryButtonText: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
            <input type="text" value={data.secondaryButtonLink || ''} onChange={(e) => updateData({ ...data, secondaryButtonLink: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'paragraph') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <Editor 
            content={data.content || ''} 
            onChange={(html: string) => updateData({ ...data, content: html })} 
          />
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input 
            type="text" 
            value={data.heading || ''} 
            onChange={(e) => updateData({ ...data, heading: e.target.value })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">List Items</label>
          <div className="space-y-2">
            {(data.items || []).map((item: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input 
                  type="text" 
                  value={item} 
                  onChange={(e) => {
                    const newItems = [...(data.items || [])];
                    newItems[index] = e.target.value;
                    updateData({ ...data, items: newItems });
                  }} 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" 
                />
                <button 
                  onClick={() => {
                    const newItems = [...(data.items || [])];
                    newItems.splice(index, 1);
                    updateData({ ...data, items: newItems });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button 
              onClick={() => {
                const newItems = [...(data.items || []), 'New Item'];
                updateData({ ...data, items: newItems });
              }}
              className="flex items-center text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-light)] transition-colors mt-2"
            >
              <Plus size={16} className="mr-1" /> Add Item
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div>Unknown block type</div>;
};


// --- Main CMS Component ---

export default function AdminCMS() {
  const [cms, setCms] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [previewKey, setPreviewKey] = useState(Date.now());
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);

  useEffect(() => {
    let data = getStorageItem('cms', INITIAL_DATA.cms);
    if (!data.blocks) {
      // Migrate old data
      data.blocks = [
        { id: 'hero-1', type: 'hero', data: data.hero || INITIAL_DATA.cms.blocks[0].data },
        ...(data.customSections || []).map((cs: any) => ({ id: `custom-${cs.id}`, type: 'custom', data: cs })),
        { id: 'howItWorks-1', type: 'howItWorks', data: {} },
        { id: 'testimonials-1', type: 'testimonials', data: { items: data.testimonials || [] } },
        { id: 'faq-1', type: 'faq', data: { items: data.faqs || [] } },
        { id: 'cta-1', type: 'cta', data: {} }
      ];
      setStorageItem('cms', data);
    }
    setCms(data);
  }, []);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      const theme = localStorage.getItem('theme') || 'default';
      const themeCustom = localStorage.getItem('theme-custom');
      let themeColors = { primary: '#0A1931', secondary: '#F5A623' };
      
      if (theme === 'custom' && themeCustom) {
        const parsed = JSON.parse(themeCustom);
        themeColors = { primary: parsed.primary, secondary: parsed.secondary };
      } else {
        // Find in THEMES (imported from Context)
        // Hardcoded fallback for now to avoid complex imports in CMS if not needed
        const themes: any = {
          'ocean': { primary: '#0C4A6E', secondary: '#38BDF8' },
          'emerald': { primary: '#064E3B', secondary: '#10B981' },
          'purple': { primary: '#3B0764', secondary: '#A855F7' },
          'sunset': { primary: '#7C2D12', secondary: '#F97316' },
          'default': { primary: '#0A1931', secondary: '#F5A623' }
        };
        themeColors = themes[theme] || themes.default;
      }

      const data = {
        cms: getStorageItem('cms', INITIAL_DATA.cms),
        settings: {
          ...getStorageItem('settings', INITIAL_DATA.settings),
          themeColors
        }
      };

      const response = await fetch('/api/download-source', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'static-website.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading source:', error);
      alert('Failed to download source code. This might be due to a large project size or a connection issue. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // --- Drag & Drop Handlers ---

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.stopPropagation();
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString()); // Required for Firefox
  };

  const handleSidebarDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('newBlockType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent, index: number | null = null) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (index !== null) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(null);

    const newBlockType = e.dataTransfer.getData('newBlockType');

    if (newBlockType) {
      // Add new block from sidebar
      const newBlock = createNewBlock(newBlockType);
      const newBlocks = [...cms.blocks];
      newBlocks.splice(targetIndex, 0, newBlock);
      setCms({ ...cms, blocks: newBlocks });
      setExpandedBlockId(newBlock.id);
    } else if (draggedIndex !== null && draggedIndex !== targetIndex) {
      // Reorder existing blocks
      const newBlocks = [...cms.blocks];
      const [removed] = newBlocks.splice(draggedIndex, 1);
      newBlocks.splice(targetIndex, 0, removed);
      setCms({ ...cms, blocks: newBlocks });
    }
    setDraggedIndex(null);
  };

  // --- Actions ---

  const updateBlockData = (id: string, newData: any) => {
    setCms({
      ...cms,
      blocks: cms.blocks.map((b: any) => b.id === id ? { ...b, data: newData } : b)
    });
  };

  const deleteBlock = (id: string) => {
    setCms({
      ...cms,
      blocks: cms.blocks.filter((b: any) => b.id !== id)
    });
  };

  const handleSave = () => {
    setStorageItem('cms', cms);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!cms) return <div>Loading...</div>;

  const availableBlocks = [
    { type: 'hero', label: 'Hero Section' },
    { type: 'custom', label: 'Text & Image Section' },
    { type: 'paragraph', label: 'Paragraph' },
    { type: 'list', label: 'List' },
    { type: 'howItWorks', label: 'How It Works' },
    { type: 'testimonials', label: 'Testimonials' },
    { type: 'faq', label: 'FAQ Section' },
    { type: 'cta', label: 'Call to Action' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Page Builder</h1>
        <button 
          onClick={handleSave}
          className="flex items-center bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[var(--color-primary-light)] transition-colors shadow-sm"
        >
          <Save size={18} className="mr-2" /> Save Changes
        </button>
      </div>

      {isSaved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center mb-6">
          <CheckCircle size={20} className="mr-3" />
          <p className="font-medium">Content saved successfully! Changes are now live on the website.</p>
        </div>
      )}

      {/* Builder Layout */}
      <div className="flex flex-col lg:flex-row gap-6 h-[700px]">
        
        {/* Sidebar: Available Blocks */}
        <div className="w-full lg:w-72 bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full overflow-y-auto">
          <h2 className="font-bold text-gray-900 mb-2 font-heading">Available Blocks</h2>
          <p className="text-xs text-gray-500 mb-6">Drag blocks into the page area to add them.</p>
          <div className="space-y-3">
            {availableBlocks.map(block => (
              <div
                key={block.type}
                draggable
                onDragStart={(e) => handleSidebarDragStart(e, block.type)}
                className="p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-100 hover:border-gray-300 transition-colors flex items-center shadow-sm"
              >
                <GripVertical size={16} className="text-gray-400 mr-3" />
                <span className="font-medium text-sm text-gray-700">{block.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Area: Page Layout */}
        <div className="flex-1 bg-gray-100 rounded-xl border border-gray-200 overflow-y-auto p-6 relative shadow-inner">
          <div className="max-w-3xl mx-auto space-y-4 pb-32">
            {cms.blocks.map((block: any, index: number) => (
              <div
                key={block.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                className={`bg-white rounded-xl shadow-sm border transition-all ${draggedIndex === index ? 'opacity-40 border-dashed border-gray-400 scale-95' : 'border-gray-200'} ${dragOverIndex === index && draggedIndex !== index ? 'border-t-4 border-t-blue-500' : ''}`}
              >
                {/* Block Header */}
                <div className="px-5 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between cursor-grab hover:bg-gray-100 transition-colors rounded-t-xl">
                  <div className="flex items-center flex-1" onClick={() => setExpandedBlockId(expandedBlockId === block.id ? null : block.id)}>
                    <GripVertical size={18} className="text-gray-400 mr-3" />
                    <span className="font-bold text-gray-700 capitalize">{block.type.replace(/([A-Z])/g, ' $1').trim()} Section</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => setExpandedBlockId(expandedBlockId === block.id ? null : block.id)} className="p-1 text-gray-500 hover:text-[var(--color-primary)] transition-colors">
                      {expandedBlockId === block.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <button onClick={() => deleteBlock(block.id)} className="p-1 text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Block Content (Expanded) */}
                {expandedBlockId === block.id && (
                  <div className="p-6">
                    <BlockEditor block={block} updateData={(data) => updateBlockData(block.id, data)} />
                  </div>
                )}
              </div>
            ))}

            {/* Drop zone at the bottom */}
            <div
              onDragOver={(e) => handleDragOver(e, cms.blocks.length)}
              onDrop={(e) => handleDrop(e, cms.blocks.length)}
              className={`h-24 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500 font-medium transition-colors ${dragOverIndex === cms.blocks.length ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 bg-gray-50/50 hover:bg-gray-100'}`}
            >
              Drag blocks here to add to the bottom of the page
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview & Export Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 font-heading">Live Preview & Export</h2>
          <div className="flex space-x-4">
            <button onClick={() => setPreviewKey(Date.now())} className="text-gray-500 hover:text-[var(--color-primary)] flex items-center text-sm font-medium transition-colors">
              <RefreshCw size={16} className="mr-1" /> Refresh Preview
            </button>
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[var(--color-primary)] flex items-center text-sm font-medium transition-colors">
              <ExternalLink size={16} className="mr-1" /> Open in New Tab
            </a>
          </div>
        </div>
        <div className="p-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden h-[600px] mb-6 relative bg-gray-50 shadow-inner">
            <iframe 
              key={previewKey} 
              src="/" 
              className="w-full h-full border-0"
              title="Live Preview"
            />
          </div>
          <div className="flex justify-end">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className={`flex items-center text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-md ${isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'}`}
            >
              {isDownloading ? (
                <><RefreshCw size={20} className="mr-2 animate-spin" /> Preparing ZIP...</>
              ) : (
                <><Download size={20} className="mr-2" /> Export Static Website</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
