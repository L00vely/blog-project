import { client } from "../../contentfulApi";

// Obtenemos solo los datos relevantes para los PostCards, se utiliza en los SLUGS para un enrutamiento correcto 
const getPostsByCategory= async (slug, offset = 0, locale = 'es', altLocale = "en-US", limit) => {
  const postQuery = `query{
    siteCollection {
      items {
        postsCollection(limit: ${ limit }, order: [creationDate_DESC], skip: ${ offset }, locale: "${ locale }", where: { category: { slug: "${ slug }", sys:{id_exists:true} } } ) {
          items {
            title
            slug
            altSlug: slug(locale: "${ altLocale }")
            creationDate
            thumbnail{
              title
              url
            }
            author{
              slug
              fullName
              photo{
                title
                url
              }
            }
            readingTime
            category{
              slug
              name
            }
          }
        }
      }
    }
  }`;

  try {
    const data = await client.request(postQuery);
    const { siteCollection: { items } } = data;
    return items[0].postsCollection.items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  getPostsByCategory
};
