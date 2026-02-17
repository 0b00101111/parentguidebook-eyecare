/**
 * Rehype plugin that:
 * 1. Adds id="sources" to the Sources / 参考来源 heading
 * 2. Adds id="source-1", id="source-2", ... to each <li> in the numbered list under that heading
 * 3. Turns [Source: src1], [Sources: src2], [来源：src6] into links to #source-1, #source-2, etc.
 */
import type { Root, Element, Text } from 'hast';
import { visit } from 'unist-util-visit';

const SOURCES_HEADING = /^(Sources|参考来源|来源与参考文献|Sources\s*&\s*References)\s*$/i;

// Match [Source: src1], [Sources: src2], [Source: src1, src11], [来源：src6]
const CITATION = /\[(?:Sources?:\s*|来源[：:]\s*)(src\d+(?:\s*,\s*src\d+)*)\]/g;

function getTextContent(node: Element): string {
  return node.children
    .filter((c): c is Text => c.type === 'text')
    .map((c) => c.value)
    .join('')
    .trim();
}

function isSourcesHeading(node: Element): boolean {
  if (node.tagName !== 'h2') return false;
  return SOURCES_HEADING.test(getTextContent(node));
}

function addIdToSourcesHeading(node: Element) {
  if (!node.properties) node.properties = {};
  node.properties.id = 'sources';
}

/** Parse "src1" or "src1, src11" -> first number for link target */
function firstSourceNum(ref: string): number {
  const m = ref.match(/src(\d+)/);
  return m ? parseInt(m[1], 10) : 1;
}

function splitCitations(text: string): (Text | Element)[] {
  const parts: (Text | Element)[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  CITATION.lastIndex = 0;
  while ((m = CITATION.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push({
        type: 'text',
        value: text.slice(lastIndex, m.index),
      });
    }
    const fullMatch = m[0];
    const ref = m[1].trim(); // e.g. "src1" or "src1, src11"
    const num = firstSourceNum(ref);
    const href = `#source-${num}`;
    parts.push({
      type: 'element',
      tagName: 'a',
      properties: {
        href,
        className: ['source-citation'],
      },
      children: [{ type: 'text', value: fullMatch }],
    });
    lastIndex = m.index + fullMatch.length;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }
  return parts.length > 0 ? parts : [{ type: 'text', value: text }];
}

function processChildren(children: (Text | Element)[]): (Text | Element)[] {
  const out: (Text | Element)[] = [];
  for (const child of children) {
    if (child.type === 'text' && CITATION.test(child.value)) {
      CITATION.lastIndex = 0;
      out.push(...splitCitations(child.value));
    } else {
      if (
        child.type === 'element' &&
        (child as Element).tagName !== 'a' &&
        (child as Element).children?.length
      ) {
        (child as Element).children = processChildren(
          (child as Element).children as (Text | Element)[]
        ) as Element['children'];
      }
      out.push(child);
    }
  }
  return out;
}

function isCitationLink(node: Element): boolean {
  if (node.tagName !== 'a') return false;
  const cls = node.properties?.className;
  return Array.isArray(cls) && cls.includes('source-citation');
}

export default function rehypeSourceCitations() {
  return (tree: Root) => {
    // 1) Add id="sources" to Sources heading
    visit(tree, 'element', (node: Element) => {
      if (isSourcesHeading(node)) addIdToSourcesHeading(node);
    });

    // 2) Add id="source-1", "source-2", ... to the Sources list (the <ol> that immediately follows the Sources h2)
    visit(tree, 'element', (node: Element, index: number | undefined, parent: { children: unknown[] } | undefined) => {
      if (node.tagName !== 'ol') return;
      if (index == null || index < 1 || !parent?.children) return;
      const prev = parent.children[index - 1];
      if (prev?.type !== 'element' || (prev as Element).tagName !== 'h2') return;
      const prevEl = prev as Element;
      if ((prevEl.properties?.id as string) !== 'sources' && !SOURCES_HEADING.test(getTextContent(prevEl))) return;
      let n = 1;
      for (const child of node.children) {
        if (child.type === 'element' && (child as Element).tagName === 'li') {
          const li = child as Element;
          if (!li.properties) li.properties = {};
          (li.properties as Record<string, string>).id = `source-${n}`;
          n += 1;
        }
      }
    });

    // 3) Turn citation text into links
    visit(tree, 'element', (node: Element) => {
      if (isCitationLink(node)) return;
      if (node.children?.length) {
        CITATION.lastIndex = 0;
        const hasCitation = node.children.some(
          (c) => c.type === 'text' && CITATION.test((c as Text).value)
        );
        if (hasCitation) {
          CITATION.lastIndex = 0;
          node.children = processChildren(
            node.children as (Text | Element)[]
          ) as Element['children'];
        }
      }
    });
  };
}
