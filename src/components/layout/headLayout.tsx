import Head from 'next/head'

type LayoutProps = {
  title?: string
  keywords?: string
  description?: string
  image?: string
  children: React.ReactNode
}

export default function HeadLayout({
  title = '',
  keywords = '',
  description = '',
  image = '/assets/vector/logo.svg',
  children,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={""} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content={'imageWidth'} />
        <meta property="og:image:height" content={'imageHeight'} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image:src" content={""} />
        <meta property="twitter:image:width" content={'imageWidth'} />
        <meta property="twitter:image:height" content={'imageHeight'} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {children}
    </>
  )
}
