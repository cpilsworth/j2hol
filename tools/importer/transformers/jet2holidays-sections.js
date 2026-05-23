/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Jet2holidays section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks for styled sections.
 * Uses payload.template.sections from page-templates.json.
 * All selectors validated against migration-work/cleaned.html DOM.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const doc = element.ownerDocument || document;

    // Process sections in reverse order to avoid position shifts
    const sections = [...template.sections].reverse();

    sections.forEach((section) => {
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) return;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before this section (except the first section)
      if (section.id !== 'section-1') {
        const hr = doc.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
