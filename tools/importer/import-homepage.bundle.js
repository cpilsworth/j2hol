/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    const cells = [];
    const slides = element.querySelectorAll(".carousel-slide");
    slides.forEach((slide) => {
      const picture = slide.querySelector("picture.banner-v2-slide__img");
      const img = slide.querySelector("img.banner-v2-slide__img");
      const link = slide.querySelector(".banner-v2-slide__content a");
      const cellContent = [];
      if (picture) {
        cellContent.push(picture);
      } else if (img) {
        cellContent.push(img);
      }
      if (link && link.getAttribute("href")) {
        const linkClone = document.createElement("a");
        linkClone.setAttribute("href", link.getAttribute("href"));
        linkClone.textContent = link.id || "Learn more";
        cellContent.push(linkClone);
      }
      if (cellContent.length > 0) {
        cells.push(cellContent);
      }
    });
    const cards = element.querySelectorAll(".hero-banner-cards .hero-banner-card");
    cards.forEach((card) => {
      const cardPicture = card.querySelector(".hero-banner-card--img picture");
      const cardImg = card.querySelector(".hero-banner-card--img img");
      const cardHeading = card.querySelector(".hero-banner-card--text h4, .hero-banner-card--text .title-and-text__heading");
      const cellContent = [];
      if (cardPicture) {
        cellContent.push(cardPicture);
      } else if (cardImg) {
        cellContent.push(cardImg);
      }
      if (cardHeading) {
        const linkEl = document.createElement("a");
        linkEl.setAttribute("href", card.getAttribute("href") || "#");
        linkEl.textContent = cardHeading.textContent.trim();
        cellContent.push(linkEl);
      } else if (card.getAttribute("href")) {
        const linkEl = document.createElement("a");
        linkEl.setAttribute("href", card.getAttribute("href"));
        linkEl.textContent = card.id || "Learn more";
        cellContent.push(linkEl);
      }
      if (cellContent.length > 0) {
        cells.push(cellContent);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-promo.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll(".promo-card-item");
    const cells = [];
    cards.forEach((card) => {
      const link = card.querySelector("a[href]");
      const img = card.querySelector("img.promo-card-item__img, img");
      const line1 = card.querySelector(".promo-card-copy__line1");
      const line2 = card.querySelector(".promo-card-copy__line2");
      if (!link && !img) return;
      const cardCell = [];
      if (img) {
        cardCell.push(img);
      }
      if (line1) {
        const titleText = line1.textContent.trim();
        if (titleText) {
          const strong = document.createElement("strong");
          strong.textContent = titleText;
          cardCell.push(strong);
        }
      }
      if (line2) {
        const descText = line2.textContent.trim();
        if (descText) {
          const p = document.createElement("p");
          p.textContent = descText;
          cardCell.push(p);
        }
      }
      if (link) {
        const href = link.getAttribute("href");
        const linkText = line1 ? line1.textContent.trim() : "Learn more";
        const a = document.createElement("a");
        a.href = href;
        a.textContent = linkText;
        cardCell.push(a);
      }
      if (cardCell.length > 0) {
        cells.push(cardCell);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-media.js
  function parse3(element, { document }) {
    const columns = element.querySelectorAll(":scope .media-block__column");
    const imageCol = columns[0];
    const image = imageCol ? imageCol.querySelector("img.media-content-block__image, img") : null;
    const textCol = columns[1];
    const heading = textCol ? textCol.querySelector("h2.media-block__heading, h2, h3") : null;
    const contentDiv = textCol ? textCol.querySelector(".media-block__content") : null;
    const paragraphs = contentDiv ? Array.from(contentDiv.querySelectorAll(":scope > p")).filter(
      (p) => p.textContent.trim().length > 0
    ) : [];
    const ctaLinks = textCol ? Array.from(
      textCol.querySelectorAll(
        'a.btn, a.button, a.cta, .media-block__cta a, a[class*="btn"]'
      )
    ) : [];
    const imageCell = [];
    if (image) {
      imageCell.push(image);
    }
    const contentCell = [];
    if (heading) {
      contentCell.push(heading);
    }
    paragraphs.forEach((p) => {
      contentCell.push(p);
    });
    ctaLinks.forEach((link) => {
      contentCell.push(link);
    });
    const cells = [[imageCell, contentCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-media", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-feature.js
  function parse4(element, { document }) {
    const heading = element.querySelector(".why-book-with-us__banner-title, h2");
    const items = element.querySelectorAll(".why-book-with-us__items");
    const cells = [];
    items.forEach((item) => {
      const icon = item.querySelector(".why-book-with-us__icon img");
      const title = item.querySelector(".why-book-with-us__title, h3");
      const subtitle = item.querySelector(".why-book-with-us__sub-title, p");
      if (icon) {
        cells.push([icon]);
      }
      const textContent = [];
      if (title) textContent.push(title);
      if (subtitle) textContent.push(subtitle);
      if (textContent.length > 0) {
        cells.push(textContent);
      }
    });
    if (cells.length === 0) {
      const fallbackItems = element.querySelectorAll('[class*="__items"]');
      fallbackItems.forEach((item) => {
        const icon = item.querySelector("img");
        const title = item.querySelector("h3");
        const subtitle = item.querySelector("p");
        if (icon) {
          cells.push([icon]);
        }
        const textContent = [];
        if (title) textContent.push(title);
        if (subtitle) textContent.push(subtitle);
        if (textContent.length > 0) {
          cells.push(textContent);
        }
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-signup.js
  function parse5(element, { document }) {
    const bgImage = element.querySelector("picture.email-signup__image, img.email-signup__image");
    const leftCol = element.querySelector(".email-signup__col--left, .email-signup__rich-media");
    const headings = leftCol ? Array.from(leftCol.querySelectorAll('h2, h3, [class*="title-container"] *')).filter((el) => el.matches("h2, h3")) : [];
    const rightCol = element.querySelector(".email-signup__col--right, .email-signup__input-box");
    const formTitle = rightCol ? rightCol.querySelector('.email-signup__input-box-title, [class*="input-box-title"]') : null;
    const formSubtitle = rightCol ? rightCol.querySelector('.email-signup__input-box-subtitle, [class*="input-box-subtitle"]') : null;
    const signupButton = rightCol ? rightCol.querySelector('.email-signup__button, button[id="btn-email"], .bttn--primary') : null;
    const leftContent = [];
    if (headings.length > 0) {
      headings.forEach((h) => leftContent.push(h));
    }
    const rightContent = [];
    if (formTitle) rightContent.push(formTitle);
    if (formSubtitle) rightContent.push(formSubtitle);
    if (signupButton) {
      const cta = document.createElement("p");
      const link = document.createElement("a");
      link.href = "#email-signup";
      link.textContent = signupButton.textContent.trim() || "Sign up";
      cta.appendChild(link);
      rightContent.push(cta);
    }
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    cells.push([leftContent, rightContent]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-signup", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/advanced-tabs.js
  function parse6(element, { document }) {
    const title = element.querySelector("p.section-head__title, .section-head__title");
    const select = element.querySelector("select#airport-select, select");
    const options = select ? Array.from(select.querySelectorAll("option")) : [];
    const ul = document.createElement("ul");
    options.forEach((option) => {
      const text = option.textContent.trim();
      if (text) {
        const li = document.createElement("li");
        li.textContent = text;
        ul.append(li);
      }
    });
    const cells = [];
    if (ul.children.length > 0) {
      cells.push([ul]);
    }
    if (title) {
      const heading = document.createElement("h2");
      heading.textContent = title.textContent.trim();
      element.before(heading);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "advanced-tabs", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/jet2holidays-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        ".modal",
        ".modal-box",
        ".close-menu-overlay",
        '[class*="inpage-loader"]',
        ".search-panel--v2",
        ".hub",
        ".shortlist-villas",
        ".j2h-modal-page",
        '[class*="shortlist-menu"]',
        ".hero-recent-searches",
        ".hero-recent-searches-banner-wrapper .hero-recent-searches",
        "script",
        "style",
        "iframe",
        "header",
        "nav",
        ".r-desktop-header",
        ".nav-bar",
        ".mega-menu",
        '[class*="myjet2"]',
        ".information-bar",
        "footer",
        ".back-to-top",
        ".ui-helper-hidden-accessible",
        ".component-tooltip",
        "link",
        "noscript",
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
        'img[src*="adnxs.com"]'
      ]);
    }
    if (hookName === H.after) {
      const sections = element.querySelectorAll(":scope > div");
      if (sections.length > 0) {
        const firstSection = sections[0];
        const firstBlockTable = firstSection.querySelector('div[class*="carousel-hero"], div[class*="cards-promo"], div[class*="columns-media"], div[class*="carousel-feature"]');
        if (firstBlockTable) {
          while (firstBlockTable.previousSibling) {
            firstBlockTable.previousSibling.remove();
          }
        }
      }
      element.querySelectorAll("h2").forEach((h2) => {
        if (h2.textContent.trim() === "Still interested in?") h2.remove();
      });
      WebImporter.DOMUtils.remove(element, [
        ".footer-links",
        '[class*="need-help"]',
        '[class*="live-chat"]',
        'img[src*="bat.bing"]',
        'img[src*="adnxs.com"]',
        'img[src*="bing.com/action"]',
        'img[src*="setuid"]'
      ]);
      element.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || "";
        if (src.includes("bat.bing") || src.includes("adnxs.com") || src.includes("setuid") || src.includes("action/0?")) {
          const parent = img.closest("picture") || img.closest("p") || img;
          parent.remove();
        }
      });
      element.querySelectorAll('a[href*="optimizely"], a[href*="criteo"], a[href*="gum.criteo"]').forEach((a) => {
        const parent = a.closest("p") || a;
        parent.remove();
      });
      element.querySelectorAll('a[href="#"]').forEach((a) => {
        const text = a.textContent || "";
        if (text.includes("Need some help") || text.includes("Close")) {
          const parent = a.closest("p") || a.closest("div") || a;
          parent.remove();
        }
      });
      element.querySelectorAll("h3").forEach((h3) => {
        const text = h3.textContent || "";
        if (text.includes("FAQs") || text.includes("WhatsApp") || text.includes("Request a call back") || text.includes("Report an issue") || text.includes("Book with one of our friendly")) {
          const listItem = h3.closest("li") || h3.closest("ul");
          if (listItem) {
            const ul = listItem.closest("ul");
            if (ul) ul.remove();
          }
        }
      });
    }
  }

  // tools/importer/transformers/jet2holidays-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const doc = element.ownerDocument || document;
      const sections = [...template.sections].reverse();
      sections.forEach((section) => {
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (section.id !== "section-1") {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-hero": parse,
    "cards-promo": parse2,
    "columns-media": parse3,
    "carousel-feature": parse4,
    "columns-signup": parse5,
    "advanced-tabs": parse6
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Jet2holidays homepage with hero, search, deals, and promotional content",
    urls: ["https://www.jet2holidays.com/"],
    blocks: [
      {
        name: "carousel-hero",
        instances: [".hero-recent-searches-banner-wrapper"]
      },
      {
        name: "cards-promo",
        instances: [
          ".promo-cards-choose-favourite .promo-card-wrapper--alternate",
          ".promo-cards-other-ways .promo-card-wrapper--alternate",
          ".things-we-think-component ~ .content-scrollable .promo-card-wrapper--alternate"
        ]
      },
      {
        name: "columns-media",
        instances: [
          ".media-block.brand-background:not(.media-block--reverse):not(.brand--rfci)",
          ".media-block.brand-background.brand--rfci"
        ]
      },
      {
        name: "carousel-feature",
        instances: [".why-book-with-us"]
      },
      {
        name: "columns-signup",
        instances: [".media-block.brand-background.media-block--reverse", ".email-signup"]
      },
      {
        name: "advanced-tabs",
        instances: [".information-card-component"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: ".hero-recent-searches-banner-wrapper",
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Holidays to Suit You",
        selector: ".promo-cards-choose-favourite",
        style: null,
        blocks: ["cards-promo"],
        defaultContent: [".promo-cards-choose-favourite .title-and-text__content h2", ".promo-cards-choose-favourite .title-and-text__content p"]
      },
      {
        id: "section-3",
        name: "Hotel in Mind",
        selector: ".media-block.brand-background:not(.media-block--reverse):not(.brand--rfci)",
        style: "branded",
        blocks: ["columns-media"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Why Book With Us",
        selector: ".why-book-with-us",
        style: null,
        blocks: ["carousel-feature"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "myJet2 Signup",
        selector: ".media-block-table",
        style: null,
        blocks: ["columns-media"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Our Destinations",
        selector: ".information-card-component",
        style: null,
        blocks: ["advanced-tabs"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Other Ways to Book",
        selector: ".promo-cards-other-ways",
        style: null,
        blocks: ["cards-promo"],
        defaultContent: [".promo-cards-other-ways h2"]
      },
      {
        id: "section-8",
        name: "Email Signup",
        selector: ".email-signup",
        style: "branded",
        blocks: ["columns-signup"],
        defaultContent: []
      },
      {
        id: "section-9",
        name: "Things We Think Youll Love",
        selector: ".things-we-think-component",
        style: null,
        blocks: ["columns-media", "cards-promo"],
        defaultContent: [".things-we-think-component h2"]
      },
      {
        id: "section-10",
        name: "SEO Content",
        selector: ".title-and-text.footer-links",
        style: null,
        blocks: [],
        defaultContent: [".title-and-text.footer-links h1", ".title-and-text.footer-links p"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
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
            section: blockDef.section || null
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const heroWrapper = main.querySelector(".hero-recent-searches-banner-wrapper");
      if (heroWrapper) {
        let node = heroWrapper.previousSibling;
        while (node) {
          const prev = node.previousSibling;
          node.remove();
          node = prev;
        }
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
