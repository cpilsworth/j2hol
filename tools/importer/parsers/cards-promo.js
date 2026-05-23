/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-promo
 * Base block: cards
 * Source: https://www.jet2holidays.com/
 * Generated: 2026-05-23
 *
 * Horizontally scrollable row of promotional cards, each with a portrait image
 * and text overlay label. Used in multiple sections (Holidays to Suit You,
 * Other Ways to Book, Things We Think You'll Love).
 *
 * Source structure:
 *   .promo-card-wrapper--alternate
 *     .promo-card-item (repeated)
 *       a[href]
 *         img.promo-card-item__img
 *         .promo-card-copy
 *           .promo-card-copy__line1 (primary label)
 *           .promo-card-copy__line2 (secondary label, often empty)
 *
 * Target structure (per card):
 *   Row: [image, title, description (if present), link]
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.promo-card-item');
  const cells = [];

  cards.forEach((card) => {
    const link = card.querySelector('a[href]');
    const img = card.querySelector('img.promo-card-item__img, img');
    const line1 = card.querySelector('.promo-card-copy__line1');
    const line2 = card.querySelector('.promo-card-copy__line2');

    if (!link && !img) return;

    const cardCell = [];

    // Image
    if (img) {
      cardCell.push(img);
    }

    // Title (line1 text as bold heading)
    if (line1) {
      const titleText = line1.textContent.trim();
      if (titleText) {
        const strong = document.createElement('strong');
        strong.textContent = titleText;
        cardCell.push(strong);
      }
    }

    // Description (line2 text, only if non-empty)
    if (line2) {
      const descText = line2.textContent.trim();
      if (descText) {
        const p = document.createElement('p');
        p.textContent = descText;
        cardCell.push(p);
      }
    }

    // Link
    if (link) {
      const href = link.getAttribute('href');
      const linkText = line1 ? line1.textContent.trim() : 'Learn more';
      const a = document.createElement('a');
      a.href = href;
      a.textContent = linkText;
      cardCell.push(a);
    }

    if (cardCell.length > 0) {
      cells.push(cardCell);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });
  element.replaceWith(block);
}
