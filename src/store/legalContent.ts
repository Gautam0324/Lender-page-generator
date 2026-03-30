export const DOMAIN_PLACEHOLDER = '{{DOMAIN_NAME}}';

const DOMAIN_REGEX = /((?:[a-z0-9-]+\.)+[a-z]{2,})/i;

export const getDomainFromMetaTitle = (metaTitle?: string, siteName?: string): string => {
  const source = String(metaTitle || siteName || '').trim();
  if (!source) return 'yourdomain.com';

  const directDomainMatch = source.match(DOMAIN_REGEX);
  if (directDomainMatch?.[1]) {
    return directDomainMatch[1].toLowerCase();
  }

  const baseToken = source
    .split('|')[0]
    .split('-')[0]
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

  return baseToken ? `${baseToken}.com` : 'yourdomain.com';
};

export const applyDomainPlaceholder = (html: string, domainName: string): string => {
  return String(html || '').split(DOMAIN_PLACEHOLDER).join(domainName);
};
