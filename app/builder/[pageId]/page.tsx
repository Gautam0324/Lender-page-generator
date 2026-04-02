'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Sidebar } from '../../../components/builder/Sidebar';
import { Canvas } from '../../../components/builder/Canvas';
import { StylePanel } from '../../../components/builder/StylePanel';
import { MobilePreview } from '../../../components/builder/MobilePreview';
import { useBuilderStore } from '../../../lib/builderStore';
import { useParams } from 'next/navigation';
import { 
  Save, 
  Download, 
  Upload, 
  AlertCircle, 
  Loader2, 
  Settings,
  Trash2,
  CheckCircle,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '../../../lib/style-utils';

export default function BuilderPage() {
  const params = useParams();
  const pageId = params?.pageId as string;
  const { setPageId, setCanvas, canvas, responsiveMode, setResponsiveMode, isPreviewMode, setPreviewMode } = useBuilderStore();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pageId) {
      setPageId(pageId);
      // Mock fetch or actual API call
      fetch(`/api/builder?pageId=${pageId}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.content && Array.isArray(data.content)) {
            setCanvas(data.content);
          }
        })
        .catch(err => console.error("Could not load page:", err))
        .finally(() => setLoading(false));
    }
  }, [pageId, setPageId, setCanvas]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch('/api/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, content: canvas }),
      });
      
      if (!response.ok) {
        throw new Error('Save failed. Database connection might not be configured.');
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(canvas, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `lendflow-page-${pageId}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          setCanvas(json);
        } else {
          throw new Error('Invalid page structure');
        }
      } catch (err) {
        setError('Failed to import: Invalid JSON format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white selection:bg-indigo-100 selection:text-indigo-900 font-inter">
      {/* Sidebar */}
      {!isPreviewMode && <Sidebar />}

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/50">
         {/* Builder Header - Mobile Responsive */}
         <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-4 md:px-8 z-30 shadow-sm overflow-x-auto">
            <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
               <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl shadow-indigo-100 transform -rotate-6 flex-shrink-0">
                  L
               </div>
               <div className="hidden md:block h-8 w-px bg-slate-100" />
               <div className="hidden md:block">
                  <h1 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-0.5">LendFlow Builder</h1>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                     {loading ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                     Editor v1.0 • {pageId}
                  </span>
               </div>
            </div>

            {/* Center Controls: Responsive Breakpoints - Mobile Responsive */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex bg-slate-100/80 backdrop-blur-md p-1 rounded-2xl border border-slate-200 gap-1">
               <button 
                  onClick={() => setResponsiveMode('desktop')}
                  className={cn("px-3 md:px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold", responsiveMode === 'desktop' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400')}
               >
                  <Monitor className="w-3.5 h-3.5" /> 
                  <span className="hidden lg:inline">Desktop</span>
               </button>
               <button 
                  onClick={() => setResponsiveMode('tablet')}
                  className={cn("px-3 md:px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold", responsiveMode === 'tablet' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400')}
               >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Tablet</span>
               </button>
               <button 
                  onClick={() => setResponsiveMode('mobile')}
                  className={cn("px-3 md:px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold", responsiveMode === 'mobile' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400')}
               >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Mobile</span>
               </button>
            </div>

            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
               {error && (
                 <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl border border-red-100 animate-in fade-in slide-in-from-right-4">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{error}</span>
                 </div>
               )}

               {showSuccess && (
                 <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-right-4">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Saved Successfully</span>
                 </div>
               )}

               <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setMobilePreviewOpen(true)}
                    className="p-3 hover:bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all" 
                    title="Mobile Preview (iPhone 17 Pro)"
                  >
                     <Smartphone className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setPreviewMode(!isPreviewMode)}
                    className={cn(
                      "p-3 rounded-xl transition-all",
                      isPreviewMode ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "hover:bg-slate-50 text-slate-400 hover:text-indigo-600"
                    )} 
                    title={isPreviewMode ? "Exit Preview" : "Preview Mode"}
                  >
                     {isPreviewMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={handleExport}
                    className="p-3 hover:bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all" 
                    title="Export JSON"
                  >
                     <Download className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 hover:bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all" 
                    title="Import JSON"
                  >
                     <Upload className="w-5 h-5" />
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleImport} className="hidden" accept=".json" />
               </div>

               <button 
                 onClick={handleSave}
                 disabled={saving}
                 className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-700 hover:translate-y-[-2px] transition-all shadow-xl shadow-indigo-100 flex items-center gap-3 active:translate-y-0 disabled:opacity-50"
               >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Page
               </button>
            </div>
         </header>

         {/* Canvas Area */}
         <Canvas />
      </main>

      {/* Style Panel */}
      {!isPreviewMode && <StylePanel />}

      {/* Mobile Preview Modal */}
      <MobilePreview isOpen={mobilePreviewOpen} onClose={() => setMobilePreviewOpen(false)} />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
