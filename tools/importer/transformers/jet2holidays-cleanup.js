/* eslint-disable */
/* global WebImporter */

const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '.modal',
      '.modal-box',
      '.close-menu-overlay',
      '[class*="inpage-loader"]',
      '.search-panel--v2',
      '.hub',
      '.shortlist-villas',
      '.j2h-modal-page',
      '[class*="shortlist-menu"]',
      '.hero-recent-searches',
      '.hero-recent-searches-banner-wrapper .hero-recent-searches',
      'script',
      'style',
      'iframe',
      'header',
      'nav',
      '.r-desktop-header',
      '.nav-bar',
      '.mega-menu',
      '[class*="myjet2"]',
      '.information-bar',
      'footer',
      '.back-to-top',
      '.ui-helper-hidden-accessible',
      '.component-tooltip',
      'link',
      'noscript',
      '[class*="need-help"]',
      '[class*="live-chat"]',
      '[class*="optimizely"]',
      '[class*="criteo"]',
      '[src*="optimizely"]',
      '[src*="criteo"]',
      '[src*="bing.com"]',
      '[src*="adnxs.com"]',
      '[src*="bat.bing"]',
      'img[src*="bat.bing"]',
      'img[src*="adnxs.com"]',
    ]);
  }

  if (hookName === H.after) {
    // Remove all sibling nodes before the first block table in the first section div
    const sections = element.querySelectorAll(':scope > div');
    if (sections.length > 0) {
      const firstSection = sections[0];
      const firstBlockTable = firstSection.querySelector('div[class*="carousel-hero"], div[class*="cards-promo"], div[class*="columns-media"], div[class*="carousel-feature"]');
      if (firstBlockTable) {
        while (firstBlockTable.previousSibling) {
          firstBlockTable.previousSibling.remove();
        }
      }
    }

    // Remove "Still interested in?" orphan heading
    element.querySelectorAll('h2').forEach((h2) => {
      if (h2.textContent.trim() === 'Still interested in?') h2.remove();
    });

    WebImporter.DOMUtils.remove(element, [
      '.footer-links',
      '[class*="need-help"]',
      '[class*="live-chat"]',
      'img[src*="bat.bing"]',
      'img[src*="adnxs.com"]',
      'img[src*="bing.com/action"]',
      'img[src*="setuid"]',
    ]);

    // Remove tracking pixel images
    element.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (src.includes('bat.bing') || src.includes('adnxs.com') || src.includes('setuid') || src.includes('action/0?')) {
        const parent = img.closest('picture') || img.closest('p') || img;
        parent.remove();
      }
    });

    // Remove empty paragraphs with only tracking links
    element.querySelectorAll('a[href*="optimizely"], a[href*="criteo"], a[href*="gum.criteo"]').forEach((a) => {
      const parent = a.closest('p') || a;
      parent.remove();
    });

    // Remove help widget content that may have survived
    element.querySelectorAll('a[href="#"]').forEach((a) => {
      const text = a.textContent || '';
      if (text.includes('Need some help') || text.includes('Close')) {
        const parent = a.closest('p') || a.closest('div') || a;
        parent.remove();
      }
    });

    // Remove the help widget list (FAQs, WhatsApp, Request a call back, Report an issue)
    element.querySelectorAll('h3').forEach((h3) => {
      const text = h3.textContent || '';
      if (text.includes('FAQs') || text.includes('WhatsApp') || text.includes('Request a call back') || text.includes('Report an issue') || text.includes('Book with one of our friendly')) {
        const listItem = h3.closest('li') || h3.closest('ul');
        if (listItem) {
          const ul = listItem.closest('ul');
          if (ul) ul.remove();
        }
      }
    });
  }
}
