import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Upload } from 'lucide-react';
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
    setSettings(data);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
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
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Site Settings</h1>
      </div>

      {isSaved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center mb-6">
          <CheckCircle size={20} className="mr-3" />
          <p className="font-medium">Settings saved successfully!</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Logo</label>
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-2xl font-bold text-gray-400 font-heading">{settings.siteName.charAt(0)}</span>
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

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
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

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
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

        <div className="flex justify-end">
          <button 
            type="submit"
            className="flex items-center bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-bold hover:bg-[var(--color-primary-light)] transition-colors shadow-md"
          >
            <Save size={20} className="mr-2" /> Save All Settings
          </button>
        </div>

      </form>
    </div>
  );
}
