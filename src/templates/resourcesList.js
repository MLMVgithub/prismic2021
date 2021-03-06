import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SeoZone from '/src/components/slices/seoZone'
import SliceZone from '/src/components/slices/sliceZone'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import ResourcesList from '/src/components/resources/list/'
import { linkResolver } from '../utils/linkResolver'

const ResourcesPageList = ({ data }) => {
  if (!data) return null

  const document = data.prismicResourcesList
  const pageIntro = document.data
  const dataList = document.data.body[0]

  const primaryNav = data.prismicMainNavigation.data.nav
  const footerNav = data.prismicFooterNavigation.data.nav
  const currentLang = data.prismicMainNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav} footerNav={footerNav}>
      <SeoZone currentLang={currentLang} seoZone={document.data.body1} />
      <SliceZone sliceZone={document.data.body} />
      <ResourcesList currentLang={currentLang} pageIntro={pageIntro} dataList={dataList} />
    </Layout>
  )
}

export default withPrismicPreview(ResourcesPageList, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
    linkResolver,
  },
])

export const query = graphql`
  query RecourcesList($uid: String, $locale: String) {
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

    prismicResourcesList(lang: { eq: $locale }, uid: { eq: $uid }) {
      lang
      type
      uid
      id
      _previewable

      data {
        title {
          text
        }
        show_grid_layout
        show_input
        show_sorting
        show_tags

        body {
          ... on PrismicResourcesListDataBodyAddResource {
            id
            items {
              name {
                text
              }

              item {
                id
                tags
                document {
                  ... on PrismicResources {
                    id
                    uid
                    type
                    tags
                    lang
                    data {
                      title {
                        text
                      }
                      content {
                        richText
                        text
                      }
                      web_address {
                        uid
                        url
                      }
                      phone
                      location
                    }
                  }
                }
              }
            }
            slice_type
          }
        }
        #Page data - ends

        #SEO Start
        body1 {
          ... on PrismicResourcesListDataBody1GeneralSeoCard {
            primary {
              no_index
              title {
                text
              }
              description {
                text
              }
              image {
                url
              }
            }
            slice_type
          }

          ... on PrismicResourcesListDataBody1OpenGraph {
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

          ... on PrismicResourcesListDataBody1TwitterCard {
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
`
