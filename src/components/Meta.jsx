import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

function Meta() {
    const { t, i18n } = useTranslation();

    return (
      <Helmet>
        <title>{t('title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta itemprop="name" content={t('meta.name')} />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_URL} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href={`${t('PUBLIC_URL')}/favicon.ico`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${t('PUBLIC_URL')}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${t('PUBLIC_URL')}/favicon-16x16.png`} />
        <link rel="mask-icon" href={`${t('PUBLIC_URL')}/safari-pinned-tab.svg`} color="#5bbad5" />
        <link rel="apple-touch-icon" href={`${t('PUBLIC_URL')}/apple-touch-icon.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${t('PUBLIC_URL')}/apple-touch-icon.png`} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#121212" />

        <meta itemprop="image" content={`${t('PUBLIC_URL')}/logo192.png`} />

        <meta property="og:url" content={process.env.REACT_APP_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={i18n.language} />
        <meta property="og:title" content={t('meta.name')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:image" content={`${process.env.REACT_APP_PUBLIC_URL}/og-image-1200-600.jpg?${process.env.REACT_APP_VERSION}`} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content={t('meta.alt')} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.name')} />
        <meta name="twitter:description" content={t('meta.description2')} />
        <meta name="twitter:image" content={`${process.env.REACT_APP_PUBLIC_URL}/og-image-1200-600.jpg?${process.env.REACT_APP_VERSION}`} />
        <meta name="twitter:image:type" content="image/jpg" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="600" />
        <meta name="twitter:image:alt" content={t('meta.alt')} />

        <meta name="twitter:text:app_country" content={i18n.language.toUpperCase()} />
        <meta name="twitter:text:app_name" content={t('title')} />
      </ Helmet>
    );
}

export { Meta }
