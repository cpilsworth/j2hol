/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-hero
 * Base block: carousel
 * Source: https://www.jet2holidays.com/
 * Selector: .hero-recent-searches-banner-wrapper
 * Generated: 2026-05-23
 *
 * Full-width hero banner carousel with rotating slides (background image + link)
 * plus overlaid promotional cards (image + heading + link).
 * Each slide and each card becomes a row in the carousel block table.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Extract carousel slides - each has a background image and a link
  const slides = element.querySelectorAll('.carousel-slide');
  slides.forEach((slide) => {
    const picture = slide.querySelector('picture.banner-v2-slide__img');
    const img = slide.querySelector('img.banner-v2-slide__img');
    const link = slide.querySelector('.banner-v2-slide__content a');

    const cellContent = [];

    // Use the picture element if available, otherwise fallback to img
    if (picture) {
      cellContent.push(picture);
    } else if (img) {
      cellContent.push(img);
    }

    // Add the slide link if present
    if (link && link.getAttribute('href')) {
      // Create a visible link element since the source link has no text
      const linkClone = document.createElement('a');
      linkClone.setAttribute('href', link.getAttribute('href'));
      linkClone.textContent = link.id || 'Learn more';
      cellContent.push(linkClone);
    }

    if (cellContent.length > 0) {
      cells.push(cellContent);
    }
  });

  // Extract hero banner cards - each is a linked card with image and heading
  const cards = element.querySelectorAll('.hero-banner-cards .hero-banner-card');
  cards.forEach((card) => {
    const cardPicture = card.querySelector('.hero-banner-card--img picture');
    const cardImg = card.querySelector('.hero-banner-card--img img');
    const cardHeading = card.querySelector('.hero-banner-card--text h4, .hero-banner-card--text .title-and-text__heading');

    const cellContent = [];

    // Card image
    if (cardPicture) {
      cellContent.push(cardPicture);
    } else if (cardImg) {
      cellContent.push(cardImg);
    }

    // Card heading and link - card itself is an anchor element
    if (cardHeading) {
      const linkEl = document.createElement('a');
      linkEl.setAttribute('href', card.getAttribute('href') || '#');
      linkEl.textContent = cardHeading.textContent.trim();
      cellContent.push(linkEl);
    } else if (card.getAttribute('href')) {
      const linkEl = document.createElement('a');
      linkEl.setAttribute('href', card.getAttribute('href'));
      linkEl.textContent = card.id || 'Learn more';
      cellContent.push(linkEl);
    }

    if (cellContent.length > 0) {
      cells.push(cellContent);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
