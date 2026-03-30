import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Trash2, Plus, Download, ExternalLink, RefreshCw, X, GripVertical, Image as ImageIcon, Upload, ChevronDown, ChevronUp, Layout, Video } from 'lucide-react';
import { getStorageItem, setStorageItem, INITIAL_DATA } from '../../store/localStorage';
import Editor from '../../components/tiptap/Editor';
import { CMS_TEMPLATES, FONT_FAMILIES, getAllFontCategories } from '../../store/cmsTemplates';

// --- Helper Functions ---

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
  const file = e.target.files?.[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      alert('Image is too large. Please upload an image smaller than 10MB.');
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
  if (type === 'hero') data = { title: 'New Hero', subtitle: 'Subtitle', ctaText: 'Click Here', ctaLink: '/', secondaryCtaText: '', secondaryCtaLink: '', image: '', videoUrl: '', backgroundType: 'image', buttonAlignment: 'center', animation: 'none', animationDuration: 0.5 };
  if (type === 'custom') data = { heading: 'New Section', content: 'Content...', image: '', imageAlignment: 'right', buttonText: '', buttonLink: '', secondaryButtonText: '', secondaryButtonLink: '', buttonAlignment: 'left', animation: 'none', animationDuration: 0.5 };
  if (type === 'announcement') data = { items: ['Low rates available now', 'Instant pre-approval in minutes', 'No hidden fees — 100% transparent'], speed: 30, countdownEnabled: false, countdownTarget: '', countdownLabel: 'Offer ends in' };
  if (type === 'saleCountdown') data = {
    eyebrow: 'SEASONAL URGENCY',
    heading: 'Storm Season Is Already Here. Is Your Roof Ready?',
    subtitle: 'Spring storms, hail, and heavy rainfall are among the leading causes of emergency repairs. Secure your financing before peak season.',
    targetDate: '',
    note: 'Time remaining before peak season',
    ctaText: 'Get My Free Quote Before It\'s Too Late',
    ctaLink: '/apply',
    bgFrom: '#991b1b',
    bgTo: '#b91c1c',
    textColor: '#ffffff',
    subtextColor: '#fee2e2',
    timerBoxBgColor: 'rgba(255,255,255,0.12)',
    timerBoxBorderColor: 'rgba(255,255,255,0.22)',
    ctaBgColor: '#ffffff',
    ctaTextColor: '#b91c1c'
  };
  if (type === 'customHeader') data = { text: 'Add your custom header text here...' };
  if (type === 'customFooter') data = { text: 'Add your custom footer text here...' };
  if (type === 'howItWorks') data = { heading: 'How It Works', subtitle: 'Subtitle', buttonText: '', buttonLink: '', secondaryButtonText: '', secondaryButtonLink: '' };
  if (type === 'testimonials') data = { heading: 'Testimonials', subtitle: 'Subtitle', buttonText: '', buttonLink: '', secondaryButtonText: '', secondaryButtonLink: '', items: [], animation: 'none', animationDuration: 0.5 };
  if (type === 'faq') data = { heading: 'FAQ', subtitle: 'Subtitle', buttonText: '', buttonLink: '', secondaryButtonText: '', secondaryButtonLink: '', items: [] };
  if (type === 'cta') data = { heading: 'Call to Action', subtitle: 'Subtitle', buttonText: 'Click Here', buttonLink: '/', secondaryButtonText: '', secondaryButtonLink: '', buttonAlignment: 'center', animation: 'none', animationDuration: 0.5 };
  if (type === 'paragraph') data = { content: 'Your paragraph text here...' };
  if (type === 'list') data = { heading: 'List Heading', items: ['Item 1', 'Item 2'] };
  if (type === 'video') data = { videoUrl: '', heading: 'Video Title', subtitle: 'Video description', videoType: 'embed', autoplay: false, controls: true };
  if (type === 'rawHtml') data = { html: '<section>\n  <h2>Your HTML section</h2>\n  <p>Paste your custom HTML here...</p>\n</section>' };
  return { id, type, data };
};

const editorHtmlToPlainText = (html: string) => {
  if (typeof window === 'undefined') return html;
  const container = document.createElement('div');
  container.innerHTML = html;
  return (container.textContent || container.innerText || '').replace(/\s+/g, ' ').trim();
};

const EditorTextField = ({
  label,
  value,
  onChange,
  helper
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Editor
        content={value || ''}
        onChange={(html: string) => onChange(editorHtmlToPlainText(html))}
      />
      {helper && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
    </div>
  );
};

// --- Block Editor Component ---

const BlockEditor = ({ block, updateData }: { block: any, updateData: (data: any) => void }) => {
  const { type, data } = block;

  if (type === 'hero') {
    return (
      <div className="space-y-4">
        <EditorTextField
          label="Headline"
          value={data.title || ''}
          onChange={(value) => updateData({ ...data, title: value })}
        />
        <EditorTextField
          label="Subheadline"
          value={data.subtitle || ''}
          onChange={(value) => updateData({ ...data, subtitle: value })}
        />
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
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-sm text-gray-900 mb-3">Background Options</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" checked={data.backgroundType === 'image'} onChange={() => updateData({ ...data, backgroundType: 'image' })} className="mr-2 text-[var(--color-primary)]" />
                  <span className="text-sm text-gray-700">Image</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" checked={data.backgroundType === 'video'} onChange={() => updateData({ ...data, backgroundType: 'video' })} className="mr-2 text-[var(--color-primary)]" />
                  <span className="text-sm text-gray-700">Video</span>
                </label>
              </div>
            </div>

            {data.backgroundType === 'image' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
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
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Video URL</label>
                <input 
                  type="text" 
                  value={data.videoUrl || ''} 
                  onChange={(e) => updateData({ ...data, videoUrl: e.target.value })} 
                  placeholder="e.g., https://example.com/video.mp4" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none mb-2" 
                />
                <p className="text-xs text-gray-500">Supports MP4, WebM, Ogg formats. Video will loop and autoplay. Max 10MB.</p>
                <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fallback Image (if video fails to load)</label>
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
                        <img src={data.image} alt="Fallback Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Animation</label>
          <select 
            value={data.animation || 'none'} 
            onChange={(e) => updateData({ ...data, animation: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none mb-3"
          >
            <option value="none">No Animation</option>
            <option value="fade-in">Fade In</option>
            <option value="fade-out">Fade Out</option>
            <option value="slide-in-up">Slide In (Up)</option>
            <option value="slide-in-down">Slide In (Down)</option>
            <option value="slide-in-left">Slide In (Left)</option>
            <option value="slide-in-right">Slide In (Right)</option>
            <option value="zoom-in">Zoom In</option>
            <option value="zoom-out">Zoom Out</option>
            <option value="bounce-in">Bounce In</option>
            <option value="rotate-in">Rotate In</option>
            <option value="pulse">Pulse</option>
          </select>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Animation Duration (seconds)</label>
            <input 
              type="number" 
              min="0.1" 
              max="5" 
              step="0.1"
              value={data.animationDuration || 0.5} 
              onChange={(e) => updateData({ ...data, animationDuration: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'custom') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <EditorTextField
            label="Heading"
            value={data.heading || ''}
            onChange={(value) => updateData({ ...data, heading: value })}
          />
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Alignment</label>
              <div className="flex space-x-4">
                <label className="flex items-center"><input type="radio" checked={data.imageAlignment === 'left'} onChange={() => updateData({ ...data, imageAlignment: 'left' })} className="mr-2 text-[var(--color-primary)]" /> Image Left</label>
                <label className="flex items-center"><input type="radio" checked={data.imageAlignment === 'right'} onChange={() => updateData({ ...data, imageAlignment: 'right' })} className="mr-2 text-[var(--color-primary)]" /> Image Right</label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Alignment</label>
              <div className="flex space-x-4">
                <label className="flex items-center"><input type="radio" checked={data.buttonAlignment === 'left'} onChange={() => updateData({ ...data, buttonAlignment: 'left' })} className="mr-2 text-[var(--color-primary)]" /> Left</label>
                <label className="flex items-center"><input type="radio" checked={data.buttonAlignment === 'center'} onChange={() => updateData({ ...data, buttonAlignment: 'center' })} className="mr-2 text-[var(--color-primary)]" /> Center</label>
                <label className="flex items-center"><input type="radio" checked={data.buttonAlignment === 'right'} onChange={() => updateData({ ...data, buttonAlignment: 'right' })} className="mr-2 text-[var(--color-primary)]" /> Right</label>
              </div>
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Animation</label>
          <select 
            value={data.animation || 'none'} 
            onChange={(e) => updateData({ ...data, animation: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none mb-3"
          >
            <option value="none">No Animation</option>
            <option value="fade-in">Fade In</option>
            <option value="fade-out">Fade Out</option>
            <option value="slide-in-up">Slide In (Up)</option>
            <option value="slide-in-down">Slide In (Down)</option>
            <option value="slide-in-left">Slide In (Left)</option>
            <option value="slide-in-right">Slide In (Right)</option>
            <option value="zoom-in">Zoom In</option>
            <option value="zoom-out">Zoom Out</option>
            <option value="bounce-in">Bounce In</option>
            <option value="rotate-in">Rotate In</option>
            <option value="pulse">Pulse</option>
          </select>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Animation Duration (seconds)</label>
            <input 
              type="number" 
              min="0.1" 
              max="5" 
              step="0.1"
              value={data.animationDuration || 0.5} 
              onChange={(e) => updateData({ ...data, animationDuration: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'customHeader' || type === 'customFooter') {
    return (
      <div className="space-y-4">
        <EditorTextField
          label={type === 'customHeader' ? 'Header Text' : 'Footer Text'}
          value={data.text || ''}
          onChange={(value) => updateData({ ...data, text: value })}
          helper={type === 'customHeader' ? 'Displayed as the custom site header strip.' : 'Displayed as the custom site footer strip.'}
        />
      </div>
    );
  }

  if (type === 'announcement') {
    const items = data.items || [];

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Announcement Items</label>
          <div className="space-y-2">
            {items.map((item: string, index: number) => (
              <div key={index} className="space-y-2">
                <Editor
                  content={item || ''}
                  onChange={(html: string) => {
                    const newItems = [...items];
                    newItems[index] = editorHtmlToPlainText(html);
                    updateData({ ...data, items: newItems });
                  }}
                />
                <button
                  type="button"
                  onClick={() => updateData({ ...data, items: items.filter((_: string, i: number) => i !== index) })}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => updateData({ ...data, items: [...items, 'New announcement item'] })}
              className="flex items-center text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-light)] transition-colors"
            >
              <Plus size={16} className="mr-1" /> Add Announcement Item
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Scroll Speed (seconds)</label>
            <input
              type="number"
              min={10}
              max={120}
              value={data.speed || 30}
              onChange={(e) => updateData({ ...data, speed: Number(e.target.value) || 30 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            />
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={Boolean(data.countdownEnabled)}
                onChange={(e) => updateData({ ...data, countdownEnabled: e.target.checked })}
                className="mr-2"
              />
              Enable Countdown
            </label>
          </div>
        </div>

        {data.countdownEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Countdown Label</label>
              <input
                type="text"
                value={data.countdownLabel || ''}
                onChange={(e) => updateData({ ...data, countdownLabel: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                placeholder="Offer ends in"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Countdown Target</label>
              <input
                type="datetime-local"
                value={data.countdownTarget || ''}
                onChange={(e) => updateData({ ...data, countdownTarget: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (type === 'saleCountdown') {
    return (
      <div className="space-y-4">
        <EditorTextField
          label="Eyebrow Text"
          value={data.eyebrow || ''}
          onChange={(value) => updateData({ ...data, eyebrow: value })}
          helper="SEASONAL URGENCY"
        />
        <EditorTextField
          label="Heading"
          value={data.heading || ''}
          onChange={(value) => updateData({ ...data, heading: value })}
        />
        <EditorTextField
          label="Subtitle"
          value={data.subtitle || ''}
          onChange={(value) => updateData({ ...data, subtitle: value })}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sale End Date & Time</label>
          <input
            type="datetime-local"
            value={data.targetDate || ''}
            onChange={(e) => updateData({ ...data, targetDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
          />
        </div>
        <EditorTextField
          label="Countdown Note"
          value={data.note || ''}
          onChange={(value) => updateData({ ...data, note: value })}
          helper="Time remaining before peak season"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={data.ctaText || ''}
              onChange={(e) => updateData({ ...data, ctaText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
            <input
              type="text"
              value={data.ctaLink || ''}
              onChange={(e) => updateData({ ...data, ctaLink: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">Color Controls</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background From</label>
              <input
                type="color"
                value={data.bgFrom || '#991b1b'}
                onChange={(e) => updateData({ ...data, bgFrom: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg bg-white cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background To</label>
              <input
                type="color"
                value={data.bgTo || '#b91c1c'}
                onChange={(e) => updateData({ ...data, bgTo: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg bg-white cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Text</label>
              <input
                type="color"
                value={data.textColor || '#ffffff'}
                onChange={(e) => updateData({ ...data, textColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg bg-white cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtext</label>
              <input
                type="color"
                value={data.subtextColor || '#fee2e2'}
                onChange={(e) => updateData({ ...data, subtextColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg bg-white cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Background</label>
              <input
                type="color"
                value={data.ctaBgColor || '#ffffff'}
                onChange={(e) => updateData({ ...data, ctaBgColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg bg-white cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input
                type="color"
                value={data.ctaTextColor || '#b91c1c'}
                onChange={(e) => updateData({ ...data, ctaTextColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg bg-white cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timer Box Background</label>
              <input
                type="text"
                value={data.timerBoxBgColor || 'rgba(255,255,255,0.12)'}
                onChange={(e) => updateData({ ...data, timerBoxBgColor: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                placeholder="rgba(255,255,255,0.12)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timer Box Border</label>
              <input
                type="text"
                value={data.timerBoxBorderColor || 'rgba(255,255,255,0.22)'}
                onChange={(e) => updateData({ ...data, timerBoxBorderColor: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                placeholder="rgba(255,255,255,0.22)"
              />
            </div>
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
          <EditorTextField
            label="Section Heading"
            value={data.heading || ''}
            onChange={(value) => updateData({ ...data, heading: value })}
          />
          <EditorTextField
            label="Section Subtitle"
            value={data.subtitle || ''}
            onChange={(value) => updateData({ ...data, subtitle: value })}
          />
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
              <Editor
                content={item.text || ''}
                onChange={(html: string) => updateData({
                  ...data,
                  items: items.map((i: any) => i.id === item.id ? { ...i, text: editorHtmlToPlainText(html) } : i)
                })}
              />
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
          <EditorTextField
            label="Section Heading"
            value={data.heading || ''}
            onChange={(value) => updateData({ ...data, heading: value })}
          />
          <EditorTextField
            label="Section Subtitle"
            value={data.subtitle || ''}
            onChange={(value) => updateData({ ...data, subtitle: value })}
          />
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
                <Editor
                  content={item.question || ''}
                  onChange={(html: string) => updateData({
                    ...data,
                    items: items.map((i: any) => i.id === item.id ? { ...i, question: editorHtmlToPlainText(html) } : i)
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <Editor
                  content={item.answer || ''}
                  onChange={(html: string) => updateData({
                    ...data,
                    items: items.map((i: any) => i.id === item.id ? { ...i, answer: editorHtmlToPlainText(html) } : i)
                  })}
                />
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
          <EditorTextField
            label="Section Heading"
            value={data.heading || ''}
            onChange={(value) => updateData({ ...data, heading: value })}
          />
          <EditorTextField
            label="Section Subtitle"
            value={data.subtitle || ''}
            onChange={(value) => updateData({ ...data, subtitle: value })}
          />
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Alignment</label>
          <div className="flex space-x-4">
            <label className="flex items-center"><input type="radio" checked={data.buttonAlignment === 'left'} onChange={() => updateData({ ...data, buttonAlignment: 'left' })} className="mr-2 text-[var(--color-primary)]" /> Left</label>
            <label className="flex items-center"><input type="radio" checked={data.buttonAlignment === 'center'} onChange={() => updateData({ ...data, buttonAlignment: 'center' })} className="mr-2 text-[var(--color-primary)]" /> Center</label>
            <label className="flex items-center"><input type="radio" checked={data.buttonAlignment === 'right'} onChange={() => updateData({ ...data, buttonAlignment: 'right' })} className="mr-2 text-[var(--color-primary)]" /> Right</label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Animation</label>
          <select 
            value={data.animation || 'none'} 
            onChange={(e) => updateData({ ...data, animation: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none mb-3"
          >
            <option value="none">No Animation</option>
            <option value="fade-in">Fade In</option>
            <option value="fade-out">Fade Out</option>
            <option value="slide-in-up">Slide In (Up)</option>
            <option value="slide-in-down">Slide In (Down)</option>
            <option value="slide-in-left">Slide In (Left)</option>
            <option value="slide-in-right">Slide In (Right)</option>
            <option value="zoom-in">Zoom In</option>
            <option value="zoom-out">Zoom Out</option>
            <option value="bounce-in">Bounce In</option>
            <option value="rotate-in">Rotate In</option>
            <option value="pulse">Pulse</option>
          </select>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Animation Duration (seconds)</label>
            <input 
              type="number" 
              min="0.1" 
              max="5" 
              step="0.1"
              value={data.animationDuration || 0.5} 
              onChange={(e) => updateData({ ...data, animationDuration: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            />
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
        <EditorTextField
          label="Heading"
          value={data.heading || ''}
          onChange={(value) => updateData({ ...data, heading: value })}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">List Items</label>
          <div className="space-y-2">
            {(data.items || []).map((item: string, index: number) => (
              <div key={index} className="space-y-2">
                <Editor
                  content={item || ''}
                  onChange={(html: string) => {
                    const newItems = [...(data.items || [])];
                    newItems[index] = editorHtmlToPlainText(html);
                    updateData({ ...data, items: newItems });
                  }}
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

  if (type === 'video') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (YouTube/Vimeo Embed)</label>
          <input 
            type="text" 
            value={data.videoUrl || ''} 
            onChange={(e) => updateData({ ...data, videoUrl: e.target.value })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            placeholder="e.g., https://www.youtube.com/embed/dQw4w9WgXcQ"
          />
          <p className="text-xs text-gray-500 mt-1">Use embed URLs: youtube.com/embed/... or vimeo.com/video/...</p>
        </div>
        <EditorTextField
          label="Video Title"
          value={data.heading || ''}
          onChange={(value) => updateData({ ...data, heading: value })}
        />
        <EditorTextField
          label="Video Description"
          value={data.subtitle || ''}
          onChange={(value) => updateData({ ...data, subtitle: value })}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Type</label>
            <select 
              value={data.videoType || 'embed'} 
              onChange={(e) => updateData({ ...data, videoType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            >
              <option value="embed">Embed</option>
              <option value="url">Direct URL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Aspect Ratio</label>
            <select 
              value={data.aspectRatio || '16/9'} 
              onChange={(e) => updateData({ ...data, aspectRatio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            >
              <option value="16/9">16:9 (Widescreen)</option>
              <option value="4/3">4:3 (Standard)</option>
              <option value="1/1">1:1 (Square)</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={data.autoplay || false}
              onChange={(e) => updateData({ ...data, autoplay: e.target.checked })}
              id="autoplay"
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="autoplay" className="ml-2 text-sm font-medium text-gray-700">Autoplay</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={data.controls !== false}
              onChange={(e) => updateData({ ...data, controls: e.target.checked })}
              id="controls"
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="controls" className="ml-2 text-sm font-medium text-gray-700">Show Controls</label>
          </div>
        </div>
        {data.videoUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <div className="relative w-full" style={{ paddingBottom: data.aspectRatio === '4/3' ? '75%' : data.aspectRatio === '1/1' ? '100%' : '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-200"
                src={data.videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (type === 'rawHtml') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Custom HTML</label>
          <textarea
            value={data.html || ''}
            onChange={(e) => updateData({ ...data, html: e.target.value })}
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            placeholder="Paste full HTML snippet here..."
          />
          <p className="text-xs text-gray-500 mt-2">
            This HTML will be rendered on the website exactly as provided.
          </p>
        </div>
      </div>
    );
  }

  return <div>Unknown block type</div>;
};


// --- Main CMS Component ---

export default function AdminCMS() {
  const [cms, setCms] = useState<any>(null);
  const [legalPages, setLegalPages] = useState<any>(INITIAL_DATA.legalPages);
  const [selectedPage, setSelectedPage] = useState<'home' | 'privacyPolicy' | 'termsAndConditions'>('home');
  const [isSaved, setIsSaved] = useState(false);
  const [previewKey, setPreviewKey] = useState(Date.now());
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);
  
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFontCategory, setSelectedFontCategory] = useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState<string>('system-ui');
  const [showFontSelector, setShowFontSelector] = useState(false);
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
  const [templateHtmlModal, setTemplateHtmlModal] = useState<{ open: boolean; name: string; html: string }>({ open: false, name: '', html: '' });
  const [customTemplates, setCustomTemplates] = useState<any[]>([]);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDescription, setNewTemplateDescription] = useState('');
  const [newTemplateCategory, setNewTemplateCategory] = useState('My Templates');
  const [showHtmlTemplateModal, setShowHtmlTemplateModal] = useState(false);
  const [htmlTemplateName, setHtmlTemplateName] = useState('');
  const [htmlTemplateDescription, setHtmlTemplateDescription] = useState('');
  const [htmlTemplateCategory, setHtmlTemplateCategory] = useState('My Templates');
  const [htmlTemplateCode, setHtmlTemplateCode] = useState('<section>\n  <h1>My Custom HTML Template</h1>\n  <p>Welcome to my page.</p>\n</section>');

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

    const storedLegalPages = getStorageItem('legalPages', INITIAL_DATA.legalPages);
    const normalizedLegalPages = {
      privacyPolicy: {
        ...INITIAL_DATA.legalPages.privacyPolicy,
        ...(storedLegalPages?.privacyPolicy || {})
      },
      termsAndConditions: {
        ...INITIAL_DATA.legalPages.termsAndConditions,
        ...(storedLegalPages?.termsAndConditions || {})
      }
    };
    setLegalPages(normalizedLegalPages);
    setStorageItem('legalPages', normalizedLegalPages);

    const savedCustomTemplates = getStorageItem('cms-custom-templates', []);
    setCustomTemplates(Array.isArray(savedCustomTemplates) ? savedCustomTemplates : []);
    
    // Load and apply saved font
    const savedFont = getStorageItem('pageFont', 'system-ui');
    setSelectedFont(savedFont);
    document.body.style.fontFamily = savedFont;
    document.documentElement.style.setProperty('--font-sans', savedFont);
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
        cms: cms || getStorageItem('cms', INITIAL_DATA.cms),
        legalPages: legalPages || getStorageItem('legalPages', INITIAL_DATA.legalPages),
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
    e.dataTransfer.setData('application/x-block-type', type);
    e.dataTransfer.setData('text/plain', `newBlock:${type}`);
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

    const plainText = e.dataTransfer.getData('text/plain');
    const parsedTypeFromText = plainText.startsWith('newBlock:')
      ? plainText.replace('newBlock:', '')
      : '';
    const newBlockType =
      e.dataTransfer.getData('newBlockType') ||
      e.dataTransfer.getData('application/x-block-type') ||
      parsedTypeFromText;

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

  const addBlock = (type: string) => {
    const newBlock = createNewBlock(type);
    const newBlocks = [...cms.blocks, newBlock];
    setCms({ ...cms, blocks: newBlocks });
    setExpandedBlockId(newBlock.id);
  };

  const cloneTemplateBlocks = (blocks: any[]) => {
    const base = Date.now();
    return (blocks || []).map((block: any, index: number) => {
      const cloned = JSON.parse(JSON.stringify(block));
      return {
        ...cloned,
        id: `${cloned.type || 'block'}-${base}-${index}`
      };
    });
  };

  const getTemplateById = (templateId: string) => {
    return [...CMS_TEMPLATES, ...customTemplates].find((t: any) => t.id === templateId);
  };

  // --- Template Functions ---

  const loadTemplate = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (template) {
      const newCms = { ...cms, blocks: cloneTemplateBlocks(template.blocks) };
      setCms(newCms);
      setShowTemplateModal(false);
    }
  };

  const applyTemplateBlocksToEnd = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (template) {
      // Add template blocks to the end of current blocks
      const newBlocks = [...cms.blocks, ...cloneTemplateBlocks(template.blocks)];
      setCms({ ...cms, blocks: newBlocks });
      setShowTemplateModal(false);
    }
  };

  const saveCurrentAsTemplate = () => {
    if (!newTemplateName.trim()) {
      alert('Please enter a template name.');
      return;
    }

    if (!cms?.blocks?.length) {
      alert('Add at least one block before saving a template.');
      return;
    }

    const template = {
      id: `custom-${Date.now()}`,
      name: newTemplateName.trim(),
      description: (newTemplateDescription || 'Custom user template').trim(),
      category: (newTemplateCategory || 'My Templates').trim(),
      blocks: cloneTemplateBlocks(cms.blocks)
    };

    const updated = [template, ...customTemplates];
    setCustomTemplates(updated);
    setStorageItem('cms-custom-templates', updated);

    setShowSaveTemplateModal(false);
    setNewTemplateName('');
    setNewTemplateDescription('');
    setNewTemplateCategory('My Templates');
    alert('Template saved to My Templates.');
  };

  const saveHtmlAsTemplate = () => {
    if (!htmlTemplateName.trim()) {
      alert('Please enter a template name.');
      return;
    }

    if (!htmlTemplateCode.trim()) {
      alert('Please paste HTML code.');
      return;
    }

    const template = {
      id: `custom-html-${Date.now()}`,
      name: htmlTemplateName.trim(),
      description: (htmlTemplateDescription || 'Custom HTML template').trim(),
      category: (htmlTemplateCategory || 'My Templates').trim(),
      blocks: [
        {
          id: `rawHtml-${Date.now()}`,
          type: 'rawHtml',
          data: { html: htmlTemplateCode }
        }
      ]
    };

    const updated = [template, ...customTemplates];
    setCustomTemplates(updated);
    setStorageItem('cms-custom-templates', updated);

    setShowHtmlTemplateModal(false);
    setHtmlTemplateName('');
    setHtmlTemplateDescription('');
    setHtmlTemplateCategory('My Templates');
    setHtmlTemplateCode('<section>\n  <h1>My Custom HTML Template</h1>\n  <p>Welcome to my page.</p>\n</section>');
    alert('HTML template saved to My Templates.');
  };

  const escapeHtml = (value: string = '') =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const generateTemplateHtml = (template: any) => {
    const sections = (template.blocks || []).map((block: any) => {
      const data = block.data || {};

      if (block.type === 'hero') {
        const videoBackground = data.videoUrl ? `style="background: url('${escapeHtml(data.image || '')}') center/cover no-repeat;"` : '';
        const videoElement = data.videoUrl ? `<video autoplay muted loop playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; opacity: 0.2;">
        <source src="${escapeHtml(data.videoUrl)}" type="video/mp4">
      </video>` : '';
        return `
  <section class="hero" style="position: relative; overflow: hidden;">
    ${videoElement}
    ${!data.videoUrl && data.image ? `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('${escapeHtml(data.image)}') center/cover no-repeat; z-index: 0; opacity: 0.2;"></div>` : ''}
    <div style="position: relative; z-index: 1;">
      <h1>${escapeHtml(data.title || 'Hero Title')}</h1>
      <p>${escapeHtml(data.subtitle || '')}</p>
      <div class="actions">
        <a href="${escapeHtml(data.ctaLink || '#')}" class="btn primary">${escapeHtml(data.ctaText || 'Get Started')}</a>
        ${data.secondaryCtaText ? `<a href="${escapeHtml(data.secondaryCtaLink || '#')}" class="btn secondary">${escapeHtml(data.secondaryCtaText)}</a>` : ''}
      </div>
    </div>
  </section>`;
      }

      if (block.type === 'video') {
        return `
  <section class="video" id="video">
    <h2>${escapeHtml(data.heading || 'Video Section')}</h2>
    <p>${escapeHtml(data.subtitle || '')}</p>
    <div class="video-wrap">
      <iframe src="${escapeHtml(data.videoUrl || '')}" title="Video" allowfullscreen></iframe>
    </div>
  </section>`;
      }

      if (block.type === 'custom') {
        return `
  <section class="content">
    <h2>${escapeHtml(data.heading || 'Section Heading')}</h2>
    <p>${escapeHtml(data.content || '')}</p>
  </section>`;
      }

      if (block.type === 'paragraph') {
        return `
  <section class="paragraph">
    <p>${escapeHtml(data.content || '')}</p>
  </section>`;
      }

      if (block.type === 'list') {
        const items = (data.items || []).map((item: string) => `<li>${escapeHtml(item)}</li>`).join('');
        return `
  <section class="list">
    <h2>${escapeHtml(data.heading || 'List')}</h2>
    <ul>${items}</ul>
  </section>`;
      }

      if (block.type === 'testimonials') {
        const items = (data.items || []).map((item: any) => `
      <article class="card">
        <p>“${escapeHtml(item.text || '')}”</p>
        <strong>${escapeHtml(item.name || '')}</strong>
        <small>${escapeHtml(item.role || '')}</small>
      </article>`).join('');
        return `
  <section class="testimonials">
    <h2>${escapeHtml(data.heading || 'Testimonials')}</h2>
    <p>${escapeHtml(data.subtitle || '')}</p>
    <div class="grid">${items}</div>
  </section>`;
      }

      if (block.type === 'faq') {
        const items = (data.items || []).map((item: any) => `
      <details>
        <summary>${escapeHtml(item.question || '')}</summary>
        <p>${escapeHtml(item.answer || '')}</p>
      </details>`).join('');
        return `
  <section class="faq">
    <h2>${escapeHtml(data.heading || 'FAQ')}</h2>
    ${items}
  </section>`;
      }

      if (block.type === 'cta') {
        return `
  <section class="cta">
    <h2>${escapeHtml(data.heading || 'Ready to start?')}</h2>
    <p>${escapeHtml(data.subtitle || '')}</p>
    <a href="${escapeHtml(data.buttonLink || '#')}" class="btn primary">${escapeHtml(data.buttonText || 'Start')}</a>
  </section>`;
      }

      if (block.type === 'announcement') {
        const firstMessage = (data.items || [])[0] || 'Announcement';
        return `
  <section class="announcement">${escapeHtml(firstMessage)}</section>`;
      }

      if (block.type === 'rawHtml') {
        return `
      ${data.html || ''}`;
      }

      return `
  <!-- ${escapeHtml(block.type || 'unknown')} block -->`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(template.name || 'Template')}</title>
  <style>
    body { font-family: ${selectedFont}, Arial, sans-serif; margin: 0; color: #1f2937; }
    section { padding: 48px 24px; max-width: 1100px; margin: 0 auto; }
    .hero { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; text-align: center; }
    .announcement { background: #7c3aed; color: white; text-align: center; padding: 12px; font-weight: 600; }
    .cta { background: #f3f4f6; text-align: center; }
    .btn { display: inline-block; padding: 10px 16px; border-radius: 8px; text-decoration: none; margin: 6px; }
    .btn.primary { background: #111827; color: white; }
    .btn.secondary { border: 1px solid #d1d5db; color: #111827; }
    .video-wrap { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; }
    .video-wrap iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
    .card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; background: white; }
    details { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 10px; }
  </style>
</head>
<body>
${sections}
</body>
</html>`;
  };

  const openTemplateHtmlModal = (template: any) => {
    const html = generateTemplateHtml(template);
    setTemplateHtmlModal({ open: true, name: template.name || 'Template', html });
  };

  const copyTemplateHtml = async () => {
    try {
      await navigator.clipboard.writeText(templateHtmlModal.html);
      alert('Template HTML copied.');
    } catch {
      alert('Could not copy HTML. Please copy manually from the box.');
    }
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
    if (selectedPage === 'home') {
      setStorageItem('cms', cms);
    } else {
      setStorageItem('legalPages', legalPages);
    }
    setStorageItem('pageFont', selectedFont);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!cms) return <div>Loading...</div>;

  // --- Template Selection Modal ---

  const allTemplates = [...CMS_TEMPLATES, ...customTemplates];
  const categories = Array.from(new Set(allTemplates.map((t: any) => t.category || 'General')));
  const filteredTemplates = selectedCategory 
    ? allTemplates.filter((t: any) => t.category === selectedCategory)
    : allTemplates;

  // --- Template Preview Component ---

  const TemplatePreview = ({ template }: { template: any }) => {
    // Render a mini preview of the template
    return (
      <div className="h-48 bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col text-xs">
        {template.blocks.map((block: any, idx: number) => {
          const height = `${Math.max(20, 180 / template.blocks.length)}px`;
          
          if (block.type === 'customHeader' || block.type === 'hero') {
            return (
              <div key={idx} style={{ height }} className="bg-gradient-to-r from-blue-600 to-blue-400 text-white flex items-center justify-center px-2 text-center font-bold truncate">
                {block.data?.title || block.data?.text || 'Hero Section'}
              </div>
            );
          }
          if (block.type === 'announcement') {
            return (
              <div key={idx} style={{ height }} className="bg-red-500 text-white flex items-center justify-center px-2 text-center font-semibold">
                Announcement
              </div>
            );
          }
          if (block.type === 'saleCountdown') {
            return (
              <div key={idx} style={{ height }} className="bg-gradient-to-r from-orange-600 to-orange-400 text-white flex items-center justify-center px-2 text-center font-bold">
                ⏱ Countdown
              </div>
            );
          }
          if (block.type === 'video') {
            return (
              <div key={idx} style={{ height }} className="bg-gray-700 text-white flex items-center justify-center px-2 text-center font-bold">
                🎬 Video
              </div>
            );
          }
          if (block.type === 'rawHtml') {
            return (
              <div key={idx} style={{ height }} className="bg-black text-white flex items-center justify-center px-2 text-center font-bold">
                {'</>'} Custom HTML
              </div>
            );
          }
          if (block.type === 'custom') {
            return (
              <div key={idx} style={{ height }} className="bg-purple-500 text-white flex items-center justify-center px-2 text-center font-semibold">
                {block.data?.heading || 'Content Section'}
              </div>
            );
          }
          if (block.type === 'paragraph') {
            return (
              <div key={idx} style={{ height }} className="bg-gray-100 text-gray-800 flex items-center justify-center px-2 text-center line-clamp-2">
                {block.data?.content?.substring(0, 50) || 'Text Content'}...
              </div>
            );
          }
          if (block.type === 'list') {
            return (
              <div key={idx} style={{ height }} className="bg-green-500 text-white flex items-center justify-center px-2 text-center font-semibold">
                📋 {block.data?.heading || 'List'}
              </div>
            );
          }
          if (block.type === 'howItWorks') {
            return (
              <div key={idx} style={{ height }} className="bg-cyan-500 text-white flex items-center justify-center px-2 text-center font-semibold">
                {block.data?.heading || 'How It Works'}
              </div>
            );
          }
          if (block.type === 'testimonials') {
            return (
              <div key={idx} style={{ height }} className="bg-pink-500 text-white flex items-center justify-center px-2 text-center font-semibold">
                ⭐ {block.data?.heading || 'Testimonials'}
              </div>
            );
          }
          if (block.type === 'faq') {
            return (
              <div key={idx} style={{ height }} className="bg-indigo-500 text-white flex items-center justify-center px-2 text-center font-semibold">
                ❓ {block.data?.heading || 'FAQ'}
              </div>
            );
          }
          if (block.type === 'cta') {
            return (
              <div key={idx} style={{ height }} className="bg-yellow-500 text-gray-900 flex items-center justify-center px-2 text-center font-bold">
                🎯 {block.data?.heading || 'Call to Action'}
              </div>
            );
          }
          if (block.type === 'customFooter') {
            return (
              <div key={idx} style={{ height }} className="bg-slate-700 text-white flex items-center justify-center px-2 text-center font-semibold">
                Footer
              </div>
            );
          }
          
          return (
            <div key={idx} style={{ height }} className="bg-gray-300 text-gray-700 flex items-center justify-center px-2 text-center">
              {block.type}
            </div>
          );
        })}
      </div>
    );
  };

  const TemplateModal = () => (
    <>
      {/* Modal Backdrop */}
      {showTemplateModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowTemplateModal(false)}
        />
      )}

      {/* Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-6 py-4 flex justify-between items-center">
              <div className="flex items-center text-white">
                <Layout size={24} className="mr-3" />
                <div>
                  <h2 className="text-xl font-bold">Choose a Template</h2>
                  <p className="text-sm opacity-90">Select a predefined template to get started quickly</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHtmlTemplateModal(true)}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  {'</>'} Add HTML Template
                </button>
                <button
                  onClick={() => setShowSaveTemplateModal(true)}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  + Save Current as Template
                </button>
                <button 
                  onClick={() => setShowTemplateModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {/* Category Filter */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex gap-2 overflow-x-auto">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === null
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  All Templates
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Templates Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map(template => (
                  <div 
                    key={template.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all group"
                  >
                    {/* Preview */}
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <TemplatePreview template={template} />
                    </div>
                    
                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      
                      {/* Block Summary */}
                      <div className="mb-4 text-xs text-gray-500">
                        <p className="font-medium mb-2">Includes:</p>
                        <div className="flex flex-wrap gap-1">
                          {Array.from(new Set(template.blocks.map((b: any) => b.type))).map((type: any) => {
                            const blockType = String(type || 'section');
                            return (
                            <span key={blockType} className="px-2 py-1 bg-gray-100 rounded">
                              {blockType.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2 flex-col">
                        <button
                          onClick={() => setPreviewTemplateId(template.id)}
                          className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
                        >
                          👁️ Preview Full Page
                        </button>
                        <button
                          onClick={() => openTemplateHtmlModal(template)}
                          className="w-full bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-medium hover:bg-emerald-200 transition-colors text-sm"
                        >
                          {'</>'} Get HTML Code
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => loadTemplate(template.id)}
                            className="flex-1 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-primary-light)] transition-colors text-sm"
                          >
                            Use Template
                          </button>
                          <button
                            onClick={() => applyTemplateBlocksToEnd(template.id)}
                            className="flex-1 border border-[var(--color-primary)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm"
                          >
                            Add Blocks
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // --- Full Template Preview Modal ---

  const FullTemplatePreviewModal = () => {
    const previewTemplate = allTemplates.find((t: any) => t.id === previewTemplateId);
    
    if (!previewTemplate) return null;

    return (
      <>
        {/* Modal Backdrop */}
        {previewTemplateId && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setPreviewTemplateId(null)}
          />
        )}

        {/* Modal */}
        {previewTemplateId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-6 py-4 flex justify-between items-center">
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{previewTemplate.name} - Full Preview</h2>
                  <p className="text-sm opacity-90">{previewTemplate.description}</p>
                </div>
                <button 
                  onClick={() => setPreviewTemplateId(null)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Preview Content */}
              <div className="flex-1 overflow-auto bg-gray-50">
                <div className="p-8 max-w-4xl mx-auto">
                  {previewTemplate.blocks.map((block: any, idx: number) => {
                    if (block.type === 'customHeader') {
                      return null;
                    }
                    if (block.type === 'announcement') {
                      return (
                        <div key={idx} className="bg-red-500 text-white py-3 px-6 mb-6 rounded-lg text-center font-semibold">
                          🔔 {block.data?.items?.[0] || 'Important Announcement'}
                        </div>
                      );
                    }
                    if (block.type === 'saleCountdown') {
                      return (
                        <div key={idx} className="bg-gradient-to-r from-red-600 to-red-500 text-white py-6 px-8 mb-6 rounded-lg">
                          <p className="text-sm font-semibold mb-1">{block.data?.eyebrow}</p>
                          <h2 className="text-2xl font-bold mb-2">{block.data?.heading}</h2>
                          <p className="text-sm opacity-90 mb-4">{block.data?.subtitle}</p>
                          <div className="bg-white/20 rounded-lg p-3 text-center">
                            <p className="text-sm">⏱️ {block.data?.note}</p>
                            <p className="font-bold">2 Days 5 Hours</p>
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'hero') {
                      const alignment = block.data?.buttonAlignment || 'center';
                      const alignmentClass = alignment === 'left' ? 'justify-start' : alignment === 'right' ? 'justify-end' : 'justify-center';
                      return (
                        <div key={idx} className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-12 px-8 mb-6 rounded-lg">
                          <h1 className="text-4xl font-bold mb-4 text-center">{block.data?.title}</h1>
                          <p className="text-lg opacity-90 mb-6 text-center">{block.data?.subtitle}</p>
                          <div className={`flex ${alignmentClass}`}>
                            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 mr-3">
                              {block.data?.ctaText}
                            </button>
                            {block.data?.secondaryCtaText && (
                              <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-bold hover:bg-white/10">
                                {block.data?.secondaryCtaText}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'video') {
                      return (
                        <div key={idx} className="mb-6">
                          <h2 className="text-2xl font-bold mb-3">{block.data?.heading}</h2>
                          <p className="text-gray-600 mb-4">{block.data?.subtitle}</p>
                          <div className="bg-gray-300 rounded-lg aspect-video flex items-center justify-center">
                            <span className="text-gray-600 text-2xl">🎬 Video Player</span>
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'rawHtml') {
                      return (
                        <div key={idx} className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                          <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: block.data?.html || '' }}
                          />
                        </div>
                      );
                    }
                    if (block.type === 'custom') {
                      const alignment = block.data?.buttonAlignment || 'left';
                      const alignmentClass = alignment === 'left' ? 'justify-start' : alignment === 'right' ? 'justify-end' : 'justify-center';
                      return (
                        <div key={idx} className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
                          <h2 className="text-2xl font-bold mb-3">{block.data?.heading}</h2>
                          <p className="text-gray-700">{block.data?.content}</p>
                          <div className={`mt-4 flex ${alignmentClass} gap-3`}>
                            {block.data?.buttonText && (
                              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
                                {block.data?.buttonText}
                              </button>
                            )}
                            {block.data?.secondaryButtonText && (
                              <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50">
                                {block.data?.secondaryButtonText}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'paragraph') {
                      return (
                        <div key={idx} className="mb-6 p-4 bg-white rounded-lg">
                          <p className="text-gray-700 leading-relaxed">{block.data?.content}</p>
                        </div>
                      );
                    }
                    if (block.type === 'list') {
                      return (
                        <div key={idx} className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
                          <h3 className="text-xl font-bold mb-4">{block.data?.heading}</h3>
                          <ul className="space-y-2">
                            {block.data?.items?.map((item: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-3 text-green-600 font-bold">✓</span>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    if (block.type === 'testimonials') {
                      return (
                        <div key={idx} className="mb-6">
                          <h2 className="text-2xl font-bold mb-2">{block.data?.heading}</h2>
                          <p className="text-gray-600 mb-6">{block.data?.subtitle}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {block.data?.items?.slice(0, 3).map((item: any, i: number) => (
                              <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg">
                                <p className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</p>
                                <p className="text-gray-700 mb-3 italic">"{item.text}"</p>
                                <p className="font-bold text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-600">{item.role}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'howItWorks') {
                      return (
                        <div key={idx} className="mb-6">
                          <h2 className="text-2xl font-bold mb-2">{block.data?.heading}</h2>
                          <p className="text-gray-600 mb-6">{block.data?.subtitle}</p>
                          <div className="flex justify-around items-center">
                            {[1, 2, 3].map((num) => (
                              <div key={num} className="text-center flex-1">
                                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">
                                  {num}
                                </div>
                                <p className="text-sm text-gray-600">Step {num}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'faq') {
                      return (
                        <div key={idx} className="mb-6">
                          <h2 className="text-2xl font-bold mb-2">{block.data?.heading}</h2>
                          <p className="text-gray-600 mb-6">{block.data?.subtitle}</p>
                          <div className="space-y-3">
                            {block.data?.items?.slice(0, 3).map((item: any, i: number) => (
                              <div key={i} className="border border-gray-200 rounded-lg p-4">
                                <p className="font-semibold text-gray-900">{item.question}</p>
                                <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'cta') {
                      const alignment = block.data?.buttonAlignment || 'center';
                      const alignmentClass = alignment === 'left' ? 'justify-start' : alignment === 'right' ? 'justify-end' : 'justify-center';
                      return (
                        <div key={idx} className="mb-6 bg-yellow-500 text-gray-900 py-12 px-8 rounded-lg">
                          <h2 className="text-3xl font-bold mb-3 text-center">{block.data?.heading}</h2>
                          <p className="text-lg opacity-90 mb-6 text-center">{block.data?.subtitle}</p>
                          <div className={`flex ${alignmentClass} gap-3`}>
                            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800">
                              {block.data?.buttonText}
                            </button>
                            {block.data?.secondaryButtonText && (
                              <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
                                {block.data?.secondaryButtonText}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'customFooter') {
                      return null;
                    }
                    return null;
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setPreviewTemplateId(null)}
                  className="px-6 py-2 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    loadTemplate(previewTemplate.id);
                    setPreviewTemplateId(null);
                  }}
                  className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-light)] transition-colors"
                >
                  Use This Template
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // --- Font Selector Modal ---

  const fontCategories = getAllFontCategories();
  const filteredFonts = selectedFontCategory 
    ? FONT_FAMILIES.filter(f => f.category === selectedFontCategory)
    : FONT_FAMILIES;

  const FontSelectorModal = () => (
    <>
      {/* Modal Backdrop */}
      {showFontSelector && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowFontSelector(false)}
        />
      )}

      {/* Modal */}
      {showFontSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-6 py-4 flex justify-between items-center">
              <div className="text-white">
                <h2 className="text-xl font-bold">Select Page Font</h2>
                <p className="text-sm opacity-90">Choose a font family for your entire page</p>
              </div>
              <button 
                onClick={() => setShowFontSelector(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {/* Category Filter */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex gap-2 overflow-x-auto">
                <button
                  onClick={() => setSelectedFontCategory(null)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedFontCategory === null
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  All Fonts
                </button>
                {fontCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedFontCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedFontCategory === category
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Fonts Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {filteredFonts.map(font => (
                  <button
                    key={font.value}
                    onClick={() => {
                      setSelectedFont(font.value);
                      setStorageItem('pageFont', font.value);
                      // Apply to parent document
                      document.body.style.fontFamily = font.value;
                      document.documentElement.style.setProperty('--font-sans', font.value);
                      // Refresh preview to apply font change
                      setPreviewKey(Date.now());
                    }}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedFont === font.value
                        ? 'border-[var(--color-primary)] bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div 
                      className="text-lg font-semibold mb-1 truncate"
                      style={{ fontFamily: font.value }}
                    >
                      {font.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {font.category}
                    </div>
                    <div 
                      className="text-sm text-gray-600 mt-2"
                      style={{ fontFamily: font.value }}
                    >
                      The quick brown fox jumps
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Selected: <span className="font-semibold">{FONT_FAMILIES.find(f => f.value === selectedFont)?.name}</span>
              </div>
              <button
                onClick={() => {
                  setShowFontSelector(false);
                  setPreviewKey(Date.now());
                }}
                className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-light)] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const SaveTemplateModal = () => (
    <>
      {showSaveTemplateModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowSaveTemplateModal(false)}
        />
      )}
      {showSaveTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 flex justify-between items-center">
              <div className="text-white">
                <h2 className="text-lg font-bold">Save as My Template</h2>
                <p className="text-sm opacity-90">Create your own reusable template</p>
              </div>
              <button
                onClick={() => setShowSaveTemplateModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                <input
                  type="text"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  placeholder="e.g. My Real Estate Landing"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newTemplateDescription}
                  onChange={(e) => setNewTemplateDescription(e.target.value)}
                  placeholder="Short description for this template"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newTemplateCategory}
                  onChange={(e) => setNewTemplateCategory(e.target.value)}
                  placeholder="e.g. My Templates"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                />
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-600">
                This will save your current page blocks as a reusable template.
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowSaveTemplateModal(false)}
                className="px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveCurrentAsTemplate}
                className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const HtmlTemplateModal = () => (
    <>
      {showHtmlTemplateModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowHtmlTemplateModal(false)}
        />
      )}
      {showHtmlTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 flex justify-between items-center">
              <div className="text-white">
                <h2 className="text-lg font-bold">Add HTML Template</h2>
                <p className="text-sm opacity-90">Paste your HTML and save for future use</p>
              </div>
              <button
                onClick={() => setShowHtmlTemplateModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                  <input
                    type="text"
                    value={htmlTemplateName}
                    onChange={(e) => setHtmlTemplateName(e.target.value)}
                    placeholder="e.g. My HTML Landing"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={htmlTemplateCategory}
                    onChange={(e) => setHtmlTemplateCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={htmlTemplateDescription}
                  onChange={(e) => setHtmlTemplateDescription(e.target.value)}
                  placeholder="Describe your template"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HTML Code</label>
                <textarea
                  value={htmlTemplateCode}
                  onChange={(e) => setHtmlTemplateCode(e.target.value)}
                  className="w-full h-72 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                  placeholder="Paste your HTML here..."
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowHtmlTemplateModal(false)}
                className="px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveHtmlAsTemplate}
                className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                Save HTML Template
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const TemplateHtmlModal = () => (
    <>
      {templateHtmlModal.open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setTemplateHtmlModal({ open: false, name: '', html: '' })}
        />
      )}
      {templateHtmlModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 flex justify-between items-center">
              <div className="text-white">
                <h2 className="text-xl font-bold">{templateHtmlModal.name} HTML</h2>
                <p className="text-sm opacity-90">Reusable HTML template code for future use</p>
              </div>
              <button
                onClick={() => setTemplateHtmlModal({ open: false, name: '', html: '' })}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-auto">
              <textarea
                value={templateHtmlModal.html}
                readOnly
                className="w-full h-[55vh] p-4 border border-gray-300 rounded-lg font-mono text-xs bg-gray-50"
              />
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setTemplateHtmlModal({ open: false, name: '', html: '' })}
                className="px-6 py-2 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={copyTemplateHtml}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Copy HTML
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const availableBlocks = [
    { type: 'customHeader', label: 'Custom Header' },
    { type: 'announcement', label: 'Announcement Bar' },
    { type: 'saleCountdown', label: 'Sale Countdown' },
    { type: 'hero', label: 'Hero Section' },
    { type: 'video', label: 'Video Section' },
    { type: 'rawHtml', label: 'Custom HTML' },
    { type: 'custom', label: 'Text & Image Section' },
    { type: 'paragraph', label: 'Paragraph' },
    { type: 'list', label: 'List' },
    { type: 'howItWorks', label: 'How It Works' },
    { type: 'testimonials', label: 'Testimonials' },
    { type: 'faq', label: 'FAQ Section' },
    { type: 'cta', label: 'Call to Action' },
    { type: 'customFooter', label: 'Custom Footer' }
  ];

  const selectedPageLabel =
    selectedPage === 'home'
      ? 'Home'
      : selectedPage === 'privacyPolicy'
        ? 'Privacy Policy'
        : 'Terms & Conditions';

  const selectedPagePreviewPath =
    selectedPage === 'home'
      ? '/'
      : selectedPage === 'privacyPolicy'
        ? '/privacy-policy'
        : '/terms-and-conditions';

  const selectedLegalPageKey =
    selectedPage === 'privacyPolicy' || selectedPage === 'termsAndConditions'
      ? selectedPage
      : null;

  const loadHardcodedLegalTemplate = () => {
    if (!selectedLegalPageKey) return;
    const hardcodedTemplate = INITIAL_DATA.legalPages[selectedLegalPageKey];
    setLegalPages({
      ...legalPages,
      [selectedLegalPageKey]: {
        ...hardcodedTemplate
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Page Builder</h1>
          <p className="text-sm text-gray-500 mt-1">Editing: <span className="font-semibold text-gray-700">{selectedPageLabel}</span></p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowFontSelector(true)}
            className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors shadow-sm"
          >
            <span className="mr-2 text-lg">𝐀</span> Fonts
          </button>
          <button 
            onClick={() => setShowTemplateModal(true)}
            className="flex items-center bg-[var(--color-secondary)] text-gray-900 px-6 py-2.5 rounded-lg font-medium hover:bg-yellow-400 transition-colors shadow-sm"
          >
            <Layout size={18} className="mr-2" /> Templates
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[var(--color-primary-light)] transition-colors shadow-sm"
          >
            <Save size={18} className="mr-2" /> Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedPage('home')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${selectedPage === 'home' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Home
          </button>
          <button
            onClick={() => setSelectedPage('privacyPolicy')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${selectedPage === 'privacyPolicy' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setSelectedPage('termsAndConditions')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${selectedPage === 'termsAndConditions' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            T&C
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center mb-6">
          <CheckCircle size={20} className="mr-3" />
          <p className="font-medium">Content saved successfully! Changes are now live on the website.</p>
        </div>
      )}

      {selectedPage === 'home' ? (
      <>
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
                className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-colors flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center cursor-grab">
                  <GripVertical size={16} className="text-gray-400 mr-3" />
                  <span className="font-medium text-sm text-gray-700">{block.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => addBlock(block.type)}
                  className="ml-3 text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] transition-colors"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Area: Page Layout */}
        <div
          className="flex-1 bg-gray-100 rounded-xl border border-gray-200 overflow-y-auto p-6 relative shadow-inner"
          onDragOver={(e) => handleDragOver(e, cms.blocks.length)}
          onDrop={(e) => handleDrop(e, cms.blocks.length)}
        >
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
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3">Radius Controls</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Section Border Radius (px)</label>
                          <input
                            type="number"
                            min={0}
                            value={block.data?.sectionBorderRadius ?? ''}
                            onChange={(e) => updateBlockData(block.id, {
                              ...block.data,
                              sectionBorderRadius: e.target.value === '' ? '' : Number(e.target.value)
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                            placeholder="e.g. 16"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Image Border Radius (px)</label>
                          <input
                            type="number"
                            min={0}
                            value={block.data?.imageBorderRadius ?? ''}
                            onChange={(e) => updateBlockData(block.id, {
                              ...block.data,
                              imageBorderRadius: e.target.value === '' ? '' : Number(e.target.value)
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                            placeholder="e.g. 20"
                          />
                        </div>
                      </div>
                    </div>
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
      </>
      ) : (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h2 className="text-xl font-bold text-gray-900 font-heading">{selectedPageLabel} Content</h2>
          <button
            type="button"
            onClick={loadHardcodedLegalTemplate}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            Use Hardcoded Template
          </button>
        </div>
        <div className="mb-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          This page starts from your hardcoded default template and remains fully editable here. Use <span className="font-semibold">Use Hardcoded Template</span> anytime to reload the original text.
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
            <input
              type="text"
              value={legalPages?.[selectedPage]?.title || ''}
              onChange={(e) => setLegalPages({
                ...legalPages,
                [selectedPage]: {
                  ...legalPages[selectedPage],
                  title: e.target.value
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Content</label>
            <Editor
              content={legalPages?.[selectedPage]?.content || ''}
              onChange={(html: string) => setLegalPages({
                ...legalPages,
                [selectedPage]: {
                  ...legalPages[selectedPage],
                  content: html
                }
              })}
            />
          </div>
        </div>
      </div>
      )}

      {/* Live Preview & Export Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 font-heading">Live Preview & Export</h2>
          <div className="flex space-x-4">
            <button onClick={() => setPreviewKey(Date.now())} className="text-gray-500 hover:text-[var(--color-primary)] flex items-center text-sm font-medium transition-colors">
              <RefreshCw size={16} className="mr-1" /> Refresh Preview
            </button>
            <a href={selectedPagePreviewPath} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[var(--color-primary)] flex items-center text-sm font-medium transition-colors">
              <ExternalLink size={16} className="mr-1" /> Open in New Tab
            </a>
          </div>
        </div>
        <div className="p-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden h-[600px] mb-6 relative bg-gray-50 shadow-inner">
            <iframe 
              key={previewKey} 
              src={selectedPagePreviewPath} 
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

      {/* Template Modal */}
      {selectedPage === 'home' && <TemplateModal />}

      {/* Full Template Preview Modal */}
      {selectedPage === 'home' && <FullTemplatePreviewModal />}

      {/* Font Selector Modal */}
      <FontSelectorModal />

      {/* Save Custom Template Modal */}
      <SaveTemplateModal />

      {/* Add HTML Template Modal */}
      <HtmlTemplateModal />

      {/* Template HTML Modal */}
      <TemplateHtmlModal />
    </div>
  );
}
