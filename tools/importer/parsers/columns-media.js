/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-media
 * Base block: columns
 * Source: https://www.jet2holidays.com/
 * Selectors: .media-block.brand-background:not(.media-block--reverse):not(.brand--rfci), .media-block.brand-background.brand--rfci
 * Description: Two-column media block with image on one side and text content
 *   (heading, paragraph, optional CTA button) on the other.
 * Generated: 2026-05-23
 */
export default function parse(element, { document }) {
  // Get the two column containers
  const columns = element.querySelectorAll(':scope .media-block__column');

  // Column 1: Image
  const imageCol = columns[0];
  const image = imageCol ? imageCol.querySelector('img.media-content-block__image, img') : null;

  // Column 2: Text content
  const textCol = columns[1];
  const heading = textCol ? textCol.querySelector('h2.media-block__heading, h2, h3') : null;
  const contentDiv = textCol ? textCol.querySelector('.media-block__content') : null;

  // Extract paragraphs (skip empty ones and skip form elements)
  const paragraphs = contentDiv
    ? Array.from(contentDiv.querySelectorAll(':scope > p')).filter(
        (p) => p.textContent.trim().length > 0,
      )
    : [];

  // Extract CTA links (buttons or standalone links outside paragraphs)
  const ctaLinks = textCol
    ? Array.from(
        textCol.querySelectorAll(
          'a.btn, a.button, a.cta, .media-block__cta a, a[class*="btn"]',
        ),
      )
    : [];

  // Build the image cell
  const imageCell = [];
  if (image) {
    imageCell.push(image);
  }

  // Build the content cell: heading + paragraphs + CTA links
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

  // Build cells array: single row with two columns matching library example
  const cells = [[imageCell, contentCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-media', cells });
  element.replaceWith(block);
}
