import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SeoZone from '/src/components/slices/seoZone'
import SliceZone from '/src/components/slices/sliceZone'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import EventsList from '/src/components/events/list/'
import { linkResolver } from '../utils/linkResolver'

const EventsPageList = ({ data }) => {
  if (!data) return null

  const document = data.prismicEventsList
  const pageIntro = document.data
  const dataList = document.data.body[0]
  // const animateScroll = document.data.body[0].primary.animate_scroll

  const primaryNav = data.prismicMainNavigation.data.nav
  const footerNav = data.prismicFooterNavigation.data.nav
  const currentLang = data.prismicMainNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav} footerNav={footerNav}>
      <SeoZone currentLang={currentLang} seoZone={document.data.body1} />
      <SliceZone sliceZone={document.data.body} />
      <EventsList currentLang={currentLang} pageIntro={pageIntro} dataList={dataList} />
    </Layout>
  )
}

export default withPrismicPreview(EventsPageList, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
    linkResolver,
  },
])

export const query = graphql`
  query EventsList($uid: String, $locale: String) {
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

    prismicEventsList(lang: { eq: $locale }, uid: { eq: $uid }) {
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
          ... on PrismicEventsListDataBodyAddResource {
            id
            items {
              name {
                text
              }
              item {
                id
                tags
                document {
                  ... on PrismicEvents {
                    id
                    uid
                    type
                    tags
                    lang
                    data {
                      type
                      title {
                        text
                      }
                      intro {
                        richText
                      }
                      content {
                        richText
                      }
                      location
                      # start_date_time(formatString: "LLLL")
                      start_date_time
                      end_date_time
                      show_duration
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
          ... on PrismicEventsListDataBody1GeneralSeoCard {
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

          ... on PrismicEventsListDataBody1OpenGraph {
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

          ... on PrismicEventsListDataBody1TwitterCard {
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
