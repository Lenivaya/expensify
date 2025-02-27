import { remark } from 'remark'
import html from 'remark-html'
import fs from 'fs'
import path from 'path'

export async function getMarkdownContent(filename: string) {
  const fullPath = path.join(process.cwd(), 'public', filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(fileContents)
  const contentHtml = processedContent.toString()

  return contentHtml
}
