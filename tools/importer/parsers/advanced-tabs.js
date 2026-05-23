/* eslint-disable */
/* global WebImporter */

/**
 * Parser for advanced-tabs
 * Base block: advanced-tabs
 * Source: https://www.jet2holidays.com/
 * Generated: 2026-05-23
 *
 * Interactive tabbed component with a dropdown filter switching between
 * sets of destination cards. Each tab represents a category (Popular spots,
 * Hidden gems, Idyllic islands, Top city breaks).
 *
 * Source structure:
 *   .information-card-component
 *     .section-head.section-head--late-deals
 *       .section-head__container
 *         p.section-head__title ("Our destinations")
 *         .section-head__airport-select
 *           select#airport-select
 *             option (repeated - tab names)
 *
 * Target structure:
 *   The advanced-tabs block expects a single cell containing a <ul> with
 *   tab names as <li> items. The block JS converts these into interactive
 *   tab buttons. Tab panel content comes from subsequent sections.
 *
 *   Row 1: [unordered list of tab names]
 */
export default function parse(element, { document }) {
  // Extract the section title (used as heading before the block)
  const title = element.querySelector('p.section-head__title, .section-head__title');

  // Extract tab names from the select dropdown options
  const select = element.querySelector('select#airport-select, select');
  const options = select ? Array.from(select.querySelectorAll('option')) : [];

  // Build an unordered list of tab names for the advanced-tabs block
  const ul = document.createElement('ul');
  options.forEach((option) => {
    const text = option.textContent.trim();
    if (text) {
      const li = document.createElement('li');
      li.textContent = text;
      ul.append(li);
    }
  });

  const cells = [];

  // Single cell containing the tab list
  if (ul.children.length > 0) {
    cells.push([ul]);
  }

  // If there's a title, include it before the tab list in the cell
  // so it becomes a heading in the block content
  if (title) {
    const heading = document.createElement('h2');
    heading.textContent = title.textContent.trim();
    element.before(heading);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'advanced-tabs', cells });
  element.replaceWith(block);
}
