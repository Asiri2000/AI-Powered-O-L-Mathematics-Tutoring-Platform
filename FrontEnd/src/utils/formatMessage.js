/**
 * Formats raw AI chat text for safe HTML rendering in the chat bubble.
 *
 * Handles:
 *  - Stripping residual LaTeX $...$ delimiters (safety net)
 *  - **bold** → <strong>
 *  - `code` → <code>
 *  - --- or ___ → horizontal rule
 *  - Plain line breaks → <br/>
 *  - XSS-safe: no raw HTML passed through
 */

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape user-visible text to prevent XSS */
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (ch) => ENTITIES[ch] || ch);
}

/**
 * Strip any $...$ or $$...$$ LaTeX wrappers, keeping only the inner math text.
 * This is a safety net — the prompt tells the model not to use LaTeX,
 * but if any slips through we render the inner content as plain Unicode.
 */
function stripLatexDelimiters(text) {
  // Block math: $$ ... $$ → just the inner content
  text = text.replace(/\$\$\s*([^$]+?)\s*\$\$/g, (_m, inner) => inner.trim());
  // Inline math: $...$ → just the inner content (only if not preceded by \$)
  text = text.replace(/(?<!\\)\$\s*([^$]+?)\s*\$/g, (_m, inner) => inner.trim());
  // Escaped dollar signs \$ → $
  text = text.replace(/\\\$/g, '$');
  return text;
}

/**
 * Convert plain-text math/formatting into safe HTML.
 *
 * @param {string} raw - The raw text from the AI
 * @returns {string} HTML string safe for dangerouslySetInnerHTML
 */
export function formatMessage(raw) {
  if (!raw || typeof raw !== 'string') return '';

  let text = raw;

  // 1. Strip LaTeX delimiters (safety net)
  text = stripLatexDelimiters(text);

  // 2. Escape all HTML entities first (security baseline)
  text = escapeHtml(text);

  // 3. **bold** → <strong> (must run before other rules)
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // 4. `code` → <code>
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 5. --- or ___ on their own line → <hr/>
  text = text.replace(/^[ \t]*(---|___)[ \t]*$/gm, '<hr class="my-2 border-green-200" />');

  // 6. Double newlines → paragraph break; single newlines → <br/>
  // Split by double newlines, wrap each block in <p> or use <br/> for single breaks
  const blocks = text.split(/\n\n+/);
  const processed = blocks.map((block) => {
    if (!block.trim()) return '';
    // Check if block is already an <hr/>
    if (/^<hr\s/.test(block)) return block;
    const lines = block.split('\n').join('<br/>');
    return `<p class="mb-2 last:mb-0">${lines}</p>`;
  });

  return processed.filter(Boolean).join('');
}

export default formatMessage;
