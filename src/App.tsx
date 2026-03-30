/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { initializeData, getStorageItem } from './store/localStorage';
import { ThemeProvider } from './store/ThemeContext';

// Public Pages
import Home from './pages/Home';
import LoanDetails from './pages/LoanDetails';
import Apply from './pages/Apply';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminApplications from './pages/admin/Applications';
import AdminUsers from './pages/admin/Users';
import AdminLenders from './pages/admin/Lenders';
import AdminCMS from './pages/admin/CMS';
import AdminSettings from './pages/admin/Settings';

export default function App() {
  useEffect(() => {
    initializeData();

    const applyMetaTitle = () => {
      const settings = getStorageItem('settings', {});
      const title = (settings?.metaTitle || settings?.siteName || 'LendFlow').trim();
      document.title = title;
    };
    
    // Apply selected font to the page
    const selectedFont = getStorageItem('pageFont', 'system-ui');
    const applyFont = (fontValue: string) => {
      document.body.style.fontFamily = fontValue;
      document.documentElement.style.setProperty('--font-sans', fontValue);
    };
    
    applyFont(selectedFont);
    applyMetaTitle();
    
    // Listen for storage changes (from other tabs or components)
    const handleStorageChange = () => {
      const updatedFont = getStorageItem('pageFont', 'system-ui');
      applyFont(updatedFont);
      applyMetaTitle();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="loan/:type" element={<LoanDetails />} />
            <Route path="apply" element={<Apply />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          </Route>

          {/* Admin Panel */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="lenders" element={<AdminLenders />} />
            <Route path="cms" element={<AdminCMS />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
