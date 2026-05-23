/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-signup
 * Base block: columns
 * Source: https://www.jet2holidays.com/
 * Description: Two-column email signup layout with promotional text on left
 *              and email signup form content on right, with beach background image.
 * Generated: 2026-05-23
 */
export default function parse(element, { document }) {
  // Background image for the signup section
  const bgImage = element.querySelector('picture.email-signup__image, img.email-signup__image');

  // Left column: promotional headings
  const leftCol = element.querySelector('.email-signup__col--left, .email-signup__rich-media');
  const headings = leftCol
    ? Array.from(leftCol.querySelectorAll('h2, h3, [class*="title-container"] *'))
        .filter((el) => el.matches('h2, h3'))
    : [];

  // Right column: signup form content
  const rightCol = element.querySelector('.email-signup__col--right, .email-signup__input-box');
  const formTitle = rightCol
    ? rightCol.querySelector('.email-signup__input-box-title, [class*="input-box-title"]')
    : null;
  const formSubtitle = rightCol
    ? rightCol.querySelector('.email-signup__input-box-subtitle, [class*="input-box-subtitle"]')
    : null;
  const signupButton = rightCol
    ? rightCol.querySelector('.email-signup__button, button[id="btn-email"], .bttn--primary')
    : null;

  // Build left content cell (promotional text)
  const leftContent = [];
  if (headings.length > 0) {
    headings.forEach((h) => leftContent.push(h));
  }

  // Build right content cell (form description + CTA)
  const rightContent = [];
  if (formTitle) rightContent.push(formTitle);
  if (formSubtitle) rightContent.push(formSubtitle);
  if (signupButton) {
    // Convert button to a link-style CTA for the block
    const cta = document.createElement('p');
    const link = document.createElement('a');
    link.href = '#email-signup';
    link.textContent = signupButton.textContent.trim() || 'Sign up';
    cta.appendChild(link);
    rightContent.push(cta);
  }

  // Build cells array matching Columns library example: | col1 | col2 |
  const cells = [];

  // Optional background image row (if present, add as first row)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Main content row: left column (headings) | right column (form text + CTA)
  cells.push([leftContent, rightContent]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-signup', cells });
  element.replaceWith(block);
}
