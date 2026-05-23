/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-feature
 * Base block: carousel
 * Source: https://www.jet2holidays.com/
 * Selector: .why-book-with-us
 * Description: Paginated carousel of feature/USP items with icons, titles, and subtitles.
 *              Each item becomes a slide row with icon image and text content.
 * Generated: 2026-05-23
 */
export default function parse(element, { document }) {
  // Extract section heading
  const heading = element.querySelector('.why-book-with-us__banner-title, h2');

  // Extract all feature items from slick carousel slides
  // Items are within .why-book-with-us__items containers inside .slick-slide divs
  const items = element.querySelectorAll('.why-book-with-us__items');

  const cells = [];

  // Each item becomes a slide row per the carousel block library structure:
  // Row pattern: [icon image] then [title + subtitle text]
  items.forEach((item) => {
    const icon = item.querySelector('.why-book-with-us__icon img');
    const title = item.querySelector('.why-book-with-us__title, h3');
    const subtitle = item.querySelector('.why-book-with-us__sub-title, p');

    // Build slide content - icon in first row, text in second row
    // per carousel library example: image row then text content row
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

  // If no items found via specific selector, try broader fallback
  if (cells.length === 0) {
    const fallbackItems = element.querySelectorAll('[class*="__items"]');
    fallbackItems.forEach((item) => {
      const icon = item.querySelector('img');
      const title = item.querySelector('h3');
      const subtitle = item.querySelector('p');

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

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-feature', cells });
  element.replaceWith(block);
}
