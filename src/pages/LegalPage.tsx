import React from 'react';
import { getStorageItem, INITIAL_DATA } from '../store/localStorage';
import { applyDomainPlaceholder, getDomainFromMetaTitle } from '../store/legalContent';

type LegalPageType = 'privacyPolicy' | 'termsAndConditions';

interface LegalPageProps {
  pageType: LegalPageType;
}

export default function LegalPage({ pageType }: LegalPageProps) {
  const legalPages = getStorageItem('legalPages', INITIAL_DATA.legalPages);
  const settings = getStorageItem('settings', INITIAL_DATA.settings);
  const pageData = legalPages?.[pageType] || INITIAL_DATA.legalPages[pageType];
  const domainName = getDomainFromMetaTitle(settings?.metaTitle, settings?.siteName);
  const renderedContent = applyDomainPlaceholder(pageData?.content || '', domainName);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] font-heading mb-6">
            {pageData?.title}
          </h1>
          <div
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />
        </div>
      </div>
    </div>
  );
}
