import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '/src/components/layout'
import HTMLHeader from '/src/components/common/htmlheader/'
import ResourceItem from '/src/components/resources/item'
import SeoZone from '/src/components/slices/seoZone'
import SecondaryNav from '/src/components/common/secondaryNav'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { validateString } from '/src/utils/helpers'
import { linkResolver } from '/src/utils/linkResolver'

const ResourcesPage = ({ data, pageContext }) => {
  if (!data) return null

  const { next, previous } = pageContext

  // Validate and create Next title
  var nextTitle
  if (!next) {
    nextTitle = null
  } else {
    nextTitle = validateString(next.data.title.text)
  }

  // Validate and create Previous title
  var previousTitle
  if (!previous) {
    previousTitle = null
  } else {
    previousTitle = validateString(previous.data.title.text)
  }

  const document = data.allPrismicResources.edges[0].node

  const primaryNav = data.prismicMainNavigation.data.nav
  const footerNav = data.prismicFooterNavigation.data.nav
  const currentLang = data.prismicMainNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav} footerNav={footerNav}>
      <HTMLHeader currentLang={currentLang} />
      <SeoZone seoZone={document.data.body} />
      <SecondaryNav
        currentLang={currentLang}
        next={next}
        nextTitle={nextTitle}
        previous={previous}
        previousTitle={previousTitle}
      />
      <ResourceItem currentLang={currentLang} itemData={document} />
    </Layout>
  )
}

export default withPrismicPreview(ResourcesPage, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
    linkResolver,
  },
])

export const query = graphql`
  query ResourcesPageQuery($uid: String, $locale: String) {
    ## Get the primary nav in local context
    prismicMainNavigation(lang: { eq: $locale }) {
      lang
      type
      id

      data {
        nav {
          ... on PrismicMainNavigationDataNavNavItem {
            id
            primary {
              label {
                text
              }
              link {
                uid
                raw
                lang
                type
              }
            }
            items {
              sub_nav_link {
                uid
                raw
                type
                lang
              }
              sub_nav_link_label {
                text
              }
            }
          }
        }
      }
    }

    ## Get the footer nav in local context
    prismicFooterNavigation(lang: { eq: $locale }) {
      lang
      type
      id

      data {
        nav {
          ... on PrismicFooterNavigationDataNavNavItem {
            id
            primary {
              label {
                text
              }
            }
            items {
              nav_link {
                uid
                raw
                type
                lang
                id
              }
              link_label {
                text
              }
            }
          }
        }
      }
    }

    ## Resources page
    allPrismicResources(filter: { lang: { eq: $locale }, uid: { eq: $uid } }) {
      edges {
        next {
          uid
          type
          lang
          data {
            title {
              text
            }
          }
        }
        previous {
          uid
          type
          lang
          data {
            title {
              text
            }
          }
        }
        node {
          lang
          type
          uid
          id
          tags
          _previewable

          data {
            #Page data

            title {
              text
            }
            content {
              richText
            }
            web_address {
              url
              uid
            }
            phone
            location

            #Page data - ends

            #SEO Start
            body {
              ... on PrismicResourcesDataBodyGeneralSeoCard {
                primary {
                  no_index
                  description {
                    text
                  }
                  title {
                    text
                  }
                  image {
                    url
                  }
                }
                slice_type
              }

              ... on PrismicResourcesDataBodyOpenGraph {
                primary {
                  availability
                  currency
                  description {
                    text
                  }
                  image {
                    url
                  }
                  price
                  title {
                    text
                  }
                  type
                }
                slice_type
              }

              ... on PrismicResourcesDataBodyTwitterCard {
                primary {
                  description {
                    text
                  }
                  image {
                    url
                  }
                  card_type
                  twitter_handle
                  title {
                    text
                  }
                }
                slice_type
              }
            }
            #SEO - ends
          }
        }
      }
    }
  }
`
