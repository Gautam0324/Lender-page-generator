import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Upload, Code, BarChart3, Image as ImageIcon, Layout as LayoutIcon } from 'lucide-react';
import { getStorageItem, setStorageItem, INITIAL_DATA } from '../../store/localStorage';

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    const data = getStorageItem('settings', INITIAL_DATA.settings);
    if (!data.adminPassword) {
      data.adminPassword = 'admin';
    }
    if (typeof data.customHeaderText !== 'string') {
      data.customHeaderText = INITIAL_DATA.settings.customHeaderText;
    }
    if (typeof data.customFooterText !== 'string') {
      data.customFooterText = INITIAL_DATA.settings.customFooterText;
    }
    if (typeof data.metaTitle !== 'string' || !data.metaTitle.trim()) {
      data.metaTitle = data.siteName || INITIAL_DATA.settings.siteName;
    }
    
    // Ensure default tracking and ad fields exist
    if (!data.headerScripts) data.headerScripts = '';
    if (!data.bodyScripts) data.bodyScripts = '';
    if (!data.ads) {
      data.ads = {
        belowHero: { enabled: false, type: 'html', code: '', imageUrl: '', linkUrl: '' },
        sidebar: { enabled: false, type: 'html', code: '', imageUrl: '', linkUrl: '' },
        aboveFooter: { enabled: false, type: 'html', code: '', imageUrl: '', linkUrl: '' }
      };
    }
    
    setSettings(data);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleAdChange = (slotId: string, field: string, value: any) => {
    setSettings({
      ...settings,
      ads: {
        ...settings.ads,
        [slotId]: {
          ...settings.ads[slotId],
          [field]: value
        }
      }
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setLogoPreview(event.target.result);
          // In a real app, we'd upload this. For demo, we just show preview.
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStorageItem('settings', settings);
    if (typeof document !== 'undefined') {
      document.title = (settings.metaTitle || settings.siteName || 'LendFlow').trim();
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!settings) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Site Settings</h1>
      </div>

      {isSaved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center mb-6 sticky top-20 z-10 shadow-sm animate-in fade-in slide-in-from-top-4">
          <CheckCircle size={20} className="mr-3" />
          <p className="font-medium">Settings saved successfully!</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <LayoutIcon size={20} className="mr-3 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900 font-heading">General Information</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                required
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
              />
              <p className="text-sm text-gray-500 mt-1">This appears in the header and footer.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={settings.metaTitle || ''}
                onChange={handleChange}
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                placeholder="Shown in browser tab and SEO title"
              />
              <p className="text-sm text-gray-500 mt-1">Used as the page title in browser tabs and downloaded export.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Logo</label>
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-2xl font-bold text-gray-400 font-heading">{settings.siteName?.charAt(0) || 'L'}</span>
                  )}
                </div>
                <div>
                  <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center">
                    <Upload size={18} className="mr-2" /> Upload New Logo
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">Recommended size: 200x50px (PNG or SVG)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking & Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <BarChart3 size={20} className="mr-3 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900 font-heading">Tracking & Analytics</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Header Scripts</label>
              <textarea
                name="headerScripts"
                value={settings.headerScripts || ''}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none font-mono text-xs"
                placeholder="<!-- Paste Clarity, Google Analytics, etc. here -->"
              />
              <p className="text-sm text-gray-500 mt-1">These scripts are injected into the &lt;head&gt; section.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body Scripts</label>
              <textarea
                name="bodyScripts"
                value={settings.bodyScripts || ''}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none font-mono text-xs"
                placeholder="<!-- Tracking pixels, chat widgets, etc. -->"
              />
              <p className="text-sm text-gray-500 mt-1">These scripts are injected at the end of the &lt;body&gt; section.</p>
            </div>
          </div>
        </div>

        {/* Ad Placements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <ImageIcon size={20} className="mr-3 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900 font-heading">Ad Placements</h2>
          </div>
          <div className="p-6 space-y-8 divide-y divide-gray-100">
            {['belowHero', 'sidebar', 'aboveFooter'].map((slotId) => (
              <div key={slotId} className={slotId === 'belowHero' ? '' : 'pt-8'}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-bold text-gray-800 capitalize">
                    {slotId.replace(/([A-Z])/g, ' $1').trim()} Slot
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={settings.ads[slotId]?.enabled || false}
                      onChange={(e) => handleAdChange(slotId, 'enabled', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">Enable Ad</span>
                  </label>
                </div>

                {settings.ads[slotId]?.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ad Type</label>
                        <select
                          value={settings.ads[slotId]?.type || 'html'}
                          onChange={(e) => handleAdChange(slotId, 'type', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                        >
                          <option value="html">Custom HTML / Script</option>
                          <option value="image">Image Banner</option>
                        </select>
                      </div>

                      {settings.ads[slotId]?.type === 'html' ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">HTML Code</label>
                          <textarea
                            value={settings.ads[slotId]?.code || ''}
                            onChange={(e) => handleAdChange(slotId, 'code', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none font-mono text-xs"
                            placeholder="<!-- Paste ad script or HTML here -->"
                          />
                        </div>
                      ) : (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                              type="text"
                              value={settings.ads[slotId]?.imageUrl || ''}
                              onChange={(e) => handleAdChange(slotId, 'imageUrl', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                              placeholder="https://example.com/ad-banner.jpg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                            <input
                              type="text"
                              value={settings.ads[slotId]?.linkUrl || ''}
                              onChange={(e) => handleAdChange(slotId, 'linkUrl', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                              placeholder="https://example.com/click-tracker"
                            />
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg border border-dashed border-gray-200 p-4 flex flex-col items-center justify-center min-h-[150px]">
                      <span className="text-xs font-bold text-gray-400 uppercase mb-2">Preview</span>
                      {settings.ads[slotId]?.type === 'image' && settings.ads[slotId]?.imageUrl ? (
                        <img src={settings.ads[slotId].imageUrl} alt="Ad Preview" className="max-w-full max-h-[120px] object-contain rounded" />
                      ) : settings.ads[slotId]?.type === 'html' && settings.ads[slotId]?.code ? (
                        <Code size={32} className="text-gray-300" />
                      ) : (
                        <span className="text-sm text-gray-400">No ad content configured</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <LayoutIcon size={20} className="mr-3 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900 font-heading">Contact Details</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
                <input
                  type="text"
                  name="contactPhone"
                  value={settings.contactPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Custom Header & Footer */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <LayoutIcon size={20} className="mr-3 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900 font-heading">Custom Header & Footer</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Custom Header Text</label>
              <input
                type="text"
                name="customHeaderText"
                value={settings.customHeaderText || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                placeholder="Text shown at the top of the website"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Custom Footer Text</label>
              <input
                type="text"
                name="customFooterText"
                value={settings.customFooterText || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                placeholder="Text shown in the footer of the website"
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <LayoutIcon size={20} className="mr-3 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900 font-heading">Security</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
              <input
                type="password"
                name="adminPassword"
                value={settings.adminPassword}
                onChange={handleChange}
                required
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
              />
              <p className="text-sm text-gray-500 mt-1">Used to log into this admin panel.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end sticky bottom-6 z-10">
          <button 
            type="submit"
            className="flex items-center bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-bold hover:bg-[var(--color-primary-light)] transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0"
          >
            <Save size={20} className="mr-2" /> Save All Settings
          </button>
        </div>

      </form>
    </div>
  );
}

