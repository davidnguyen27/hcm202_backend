import { marked } from 'marked'

/**
 * Convert Markdown string to HTML
 */

export async function markdownToHtml(md: string): Promise<string> {
  return await marked.parse(md)
}
