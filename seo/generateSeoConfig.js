const postTitle = 'Título predeterminado del sitio';
const description = 'Descripción predeterminada del sitio';
const imageUrl = 'URL de la imagen predeterminada del sitio'; 

export const generateSeoConfig = (title, metaDescription, thumbnail, url, author) => ({
  title: title || postTitle,
  description: metaDescription || description,
  openGraph: {
    title: title || postTitle,
    description: metaDescription || description,
    type: "website",
    url: url,
    images: [
      {
        url: thumbnail.url || imageUrl,
        width: 1200,
        height: 630,
        alt: title || postTitle,
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    site: '@Loo_veely',
    handle: '@Loo_veely',
  },
});