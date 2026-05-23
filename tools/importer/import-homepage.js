/* eslint-disable */
/* global WebImporter */

import carouselHeroParser from './parsers/carousel-hero.js';
import cardsPromoParser from './parsers/cards-promo.js';
import columnsMediaParser from './parsers/columns-media.js';
import carouselFeatureParser from './parsers/carousel-feature.js';
import columnsSignupParser from './parsers/columns-signup.js';
import advancedTabsParser from './parsers/advanced-tabs.js';

import jet2holidaysCleanupTransformer from './transformers/jet2holidays-cleanup.js';
import jet2holidaysSectionsTransformer from './transformers/jet2holidays-sections.js';

const parsers = {
  'carousel-hero': carouselHeroParser,
  'cards-promo': cardsPromoParser,
  'columns-media': columnsMediaParser,
  'carousel-feature': carouselFeatureParser,
  'columns-signup': columnsSignupParser,
  'advanced-tabs': advancedTabsParser,
};

const transformers = [
  jet2holidaysCleanupTransformer,
  jet2holidaysSectionsTransformer,
];

const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Jet2holidays homepage with hero, search, deals, and promotional content',
  urls: ['https://www.jet2holidays.com/'],
  blocks: [
    {
      name: 'carousel-hero',
      instances: ['.hero-recent-searches-banner-wrapper'],
    },
    {
      name: 'cards-promo',
      instances: [
        '.promo-cards-choose-favourite .promo-card-wrapper--alternate',
        '.promo-cards-other-ways .promo-card-wrapper--alternate',
        '.things-we-think-component ~ .content-scrollable .promo-card-wrapper--alternate',
      ],
    },
    {
      name: 'columns-media',
      instances: [
        '.media-block.brand-background:not(.media-block--reverse):not(.brand--rfci)',
        '.media-block.brand-background.brand--rfci',
      ],
    },
    {
      name: 'carousel-feature',
      instances: ['.why-book-with-us'],
    },
    {
      name: 'columns-signup',
      instances: ['.media-block.brand-background.media-block--reverse', '.email-signup'],
    },
    {
      name: 'advanced-tabs',
      instances: ['.information-card-component'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner',
      selector: '.hero-recent-searches-banner-wrapper',
      style: null,
      blocks: ['carousel-hero'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Holidays to Suit You',
      selector: '.promo-cards-choose-favourite',
      style: null,
      blocks: ['cards-promo'],
      defaultContent: ['.promo-cards-choose-favourite .title-and-text__content h2', '.promo-cards-choose-favourite .title-and-text__content p'],
    },
    {
      id: 'section-3',
      name: 'Hotel in Mind',
      selector: '.media-block.brand-background:not(.media-block--reverse):not(.brand--rfci)',
      style: 'branded',
      blocks: ['columns-media'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Why Book With Us',
      selector: '.why-book-with-us',
      style: null,
      blocks: ['carousel-feature'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'myJet2 Signup',
      selector: '.media-block-table',
      style: null,
      blocks: ['columns-media'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Our Destinations',
      selector: '.information-card-component',
      style: null,
      blocks: ['advanced-tabs'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'Other Ways to Book',
      selector: '.promo-cards-other-ways',
      style: null,
      blocks: ['cards-promo'],
      defaultContent: ['.promo-cards-other-ways h2'],
    },
    {
      id: 'section-8',
      name: 'Email Signup',
      selector: '.email-signup',
      style: 'branded',
      blocks: ['columns-signup'],
      defaultContent: [],
    },
    {
      id: 'section-9',
      name: 'Things We Think Youll Love',
      selector: '.things-we-think-component',
      style: null,
      blocks: ['columns-media', 'cards-promo'],
      defaultContent: ['.things-we-think-component h2'],
    },
    {
      id: 'section-10',
      name: 'SEO Content',
      selector: '.title-and-text.footer-links',
      style: null,
      blocks: [],
      defaultContent: ['.title-and-text.footer-links h1', '.title-and-text.footer-links p'],
    },
  ],
};

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    // Remove everything before the hero carousel wrapper
    const heroWrapper = main.querySelector('.hero-recent-searches-banner-wrapper');
    if (heroWrapper) {
      let node = heroWrapper.previousSibling;
      while (node) {
        const prev = node.previousSibling;
        node.remove();
        node = prev;
      }
      // Also remove parent siblings before the hero's parent
      let parent = heroWrapper.parentElement;
      while (parent && parent !== main) {
        let sib = parent.previousSibling;
        while (sib) {
          const prevSib = sib.previousSibling;
          sib.remove();
          sib = prevSib;
        }
        parent = parent.parentElement;
      }
    }

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
