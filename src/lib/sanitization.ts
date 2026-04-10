import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML strings to prevent XSS attacks.
 * This is used for content originating from rich text editors.
 */
export const sanitizeHtml = (html: string): string => {
  if (typeof window === 'undefined') return html; // Return as is during SSR
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'p', 'br', 'strong', 'em', 'u', 's', 'ul', 'ol', 'li', 
      'blockquote', 'pre', 'code', 
      'a', 'img', 'span', 'div',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'style', 'target', 'rel'
    ],
  });
};
