import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SeoZone from '/src/components/slices/seoZone'
import SliceZone from '/src/components/slices/sliceZone'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { linkResolver } from '/src/utils/linkResolver'

import PeerSupportersList from '/src/components/supporters/list/'

const SupportersList = ({ data }) => {
  if (!data) return null

  const document = data.prismicPeerSupportersList
  const pageIntro = document.data
  const dataList = document.data.body[0]

  const primaryNav = data.prismicMainNavigation.data.nav
  const footerNav = data.prismicFooterNavigation.data.nav
  const currentLang = data.prismicMainNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav} footerNav={footerNav}>
      <SeoZone currentLang={currentLang} seoZone={document.data.body1} />
      <SliceZone sliceZone={document.data.body} />
      <PeerSupportersList currentLang={currentLang} pageIntro={pageIntro} dataList={dataList} />
    </Layout>
  )
}

export default withPrismicPreview(SupportersList, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
    linkResolver,
  },
])

export const query = graphql`
  query SupportersList($uid: String, $locale: String) {
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

    prismicPeerSupportersList(lang: { eq: $locale }, uid: { eq: $uid }) {
      lang
      type
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
          ... on PrismicPeerSupportersListDataBodyPeerSupporter {
            id
            items {
              name {
                text
              }
              item {
                id
                tags

                document {
                  ... on PrismicPeerSupporters {
                    tags
                    type
                    id
                    uid
                    lang
                    data {
                      first_name {
                        text
                      }
                      last_name {
                        text
                      }
                      intro {
                        text
                      }
                      location
                      image {
                        alt
                        gatsbyImageData(
                          # width: 576
                          # breakpoints: [576, 768, 992]
                          #layout: CONSTRAINED
                          placeholder: BLURRED
                          imgixParams: {
                            q: 100
                            fit: "clip"
                            w: 576
                            h: 1.0
                            fm: "jpg, avif, webp"
                            nr: 20
                            nrs: 50
                            dpr: 3
                            auto: "compress,enhance,format"
                          }
                        )
                      }
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
          ... on PrismicPeerSupportersListDataBody1GeneralSeoCard {
            primary {
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

          ... on PrismicPeerSupportersListDataBody1OpenGraph {
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

          ... on PrismicPeerSupportersListDataBody1TwitterCard {
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
