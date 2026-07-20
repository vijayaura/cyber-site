import { Helmet } from 'react-helmet-async'

type SEOProps = {
  title: string
  description: string
  noindex?: boolean
}

export function SEO({ title, description, noindex }: SEOProps) {
  const fullTitle = title.includes('Sentrix') ? title : `${title} — Sentrix`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
