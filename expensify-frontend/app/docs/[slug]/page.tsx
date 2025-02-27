import { DocLayout } from '@/components/layouts/doc-layout'
import { MarkdownContent } from '@/components/markdown/markdown-content'
import { getMarkdownContent } from '@/lib/utils/process-markdown'
import { notFound } from 'next/navigation'

// Define valid slugs to prevent arbitrary file access
const validSlugs = ['privacy', 'eula'] as const
type ValidSlug = (typeof validSlugs)[number]

const slugToFile: Record<ValidSlug, string> = {
  privacy: 'PRIVACY_POLICY.md',
  eula: 'EULA.md'
}

const slugToTitle: Record<ValidSlug, string> = {
  privacy: 'Privacy Policy',
  eula: 'End User License Agreement'
}

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({
    slug
  }))
}

export default async function DocPage({ params }: Props) {
  const slug = params.slug as ValidSlug

  if (!validSlugs.includes(slug)) {
    notFound()
  }

  const content = await getMarkdownContent(slugToFile[slug])

  return (
    <DocLayout>
      <MarkdownContent content={content} />
    </DocLayout>
  )
}
