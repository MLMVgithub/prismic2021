import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '/src/components/layout'
import EventItem from '/src/components/events/item'
import SeoZone from '/src/components/slices/seoZone'
import SecondaryNav from '../components/common/secondaryNav'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { validateString } from '/src/utils/helpers'
import { linkResolver } from '/src/utils/linkResolver'

const EventsPage = ({ data, pageContext }) => {
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

  const document = data.allPrismicEvents.edges[0].node

  const primaryNav = data.prismicMainNavigation.data.nav
  const footerNav = data.prismicFooterNavigation.data.nav
  const currentLang = data.prismicMainNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav} footerNav={footerNav}>
      <SeoZone currentLang={currentLang} seoZone={document.data.body} />
      <SecondaryNav
        currentLang={currentLang}
        next={next}
        nextTitle={nextTitle}
        previous={previous}
        previousTitle={previousTitle}
      />
      <EventItem currentLang={currentLang} itemData={document} />
    </Layout>
  )
}

export default withPrismicPreview(EventsPage, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
    linkResolver,
  },
])

export const query = graphql`
  query EventsQuery($uid: String, $locale: String) {
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
                type
                lang
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

    allPrismicEvents(filter: { lang: { eq: $locale }, uid: { eq: $uid } }) {
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
            type
            intro {
              richText
            }
            content {
              richText
            }
            location
            start_date_time
            end_date_time
            show_duration

            ## Forms
            select_form {
              document {
                ... on PrismicForms {
                  data {
                    form_name {
                      text
                    }
                    from_content {
                      richText
                    }
                    body {
                      ## Button
                      ... on PrismicFormsDataBodyButton {
                        id
                        slice_type
                        primary {
                          button_type
                          button_name {
                            text
                          }
                        }
                      }

                      ## Text area
                      ... on PrismicFormsDataBodyTextAreaInput {
                        id
                        slice_type
                        primary {
                          described_by
                          required
                          field_name {
                            text
                          }
                        }
                      }

                      ## Text input
                      ... on PrismicFormsDataBodyTextInput {
                        id
                        slice_type
                        primary {
                          described_by
                          required
                          field_type
                          field_name {
                            text
                          }
                        }
                      }

                      ## Rich text area
                      ... on PrismicFormsDataBodyRichText {
                        id
                        slice_type
                        primary {
                          described
                          align_with_input
                          text {
                            text
                            richText
                          }
                        }
                      }

                      ## Checkbox
                      ... on PrismicFormsDataBodyCheckbox {
                        id
                        slice_type
                        primary {
                          title {
                            text
                          }
                          described_by
                          required
                          align
                        }
                        items {
                          item {
                            text
                          }
                        }
                      }

                      ## Radio buttons
                      ... on PrismicFormsDataBodyRadioButton {
                        id
                        slice_type
                        items {
                          item {
                            text
                          }
                        }
                        primary {
                          title {
                            text
                          }
                          described_by
                          required
                          align
                        }
                      }

                      ## Select list
                      ... on PrismicFormsDataBodySelectList {
                        id
                        items {
                          item {
                            text
                          }
                        }
                        primary {
                          title {
                            text
                          }
                          described_by
                          required
                        }
                        slice_type
                      }
                    }
                  }
                }
              }
            }
            ## End Forms

            #Page data - ends

            #SEO Start
            body {
              ... on PrismicEventsDataBodyGeneralSeoCard {
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

              ... on PrismicEventsDataBodyOpenGraph {
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

              ... on PrismicEventsDataBodyTwitterCard {
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
