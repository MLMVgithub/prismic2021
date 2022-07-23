import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SupportersItem from '../components/supporters/item/'
import SeoZone from '/src/components/slices/seoZone'
import SecondaryNav from '../components/common/secondaryNav'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { linkResolver } from '/src/utils/linkResolver'
import { validateString } from '/src/utils/helpers'

const SupportersPage = ({ data, pageContext }) => {
  if (!data) return null

  const { next, previous } = pageContext

  // Validate and create Next title
  var nextTitle = null
  // console.log(next)
  if (next) {
    nextTitle = validateString(next.data.first_name.text)
    //  + ' ' + validateString(next.data.last_name.text)
  }

  // Validate and create Previous title
  var previousTitle = null
  if (previous) {
    previousTitle = validateString(previous.data.first_name.text)
    // ' ' + validateString(previous.data.last_name.text)
  }
  // console.log(pageContext)

  const document = data.allPrismicPeerSupporters.edges[0].node

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
      <SupportersItem currentLang={currentLang} itemData={document} />
    </Layout>
  )
}

export default withPrismicPreview(SupportersPage, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
    linkResolver,
  },
])

export const query = graphql`
  query SupportersQuery($uid: String, $locale: String) {
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

    allPrismicPeerSupporters(
      filter: { lang: { eq: $locale }, uid: { eq: $uid } }
      sort: { fields: data___first_name___text, order: ASC }
    ) {
      edges {
        next {
          uid
          type
          lang
          data {
            first_name {
              text
            }
            last_name {
              text
            }
          }
        }

        previous {
          uid
          type
          lang
          data {
            first_name {
              text
            }
            last_name {
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

            location
            first_name {
              text
            }
            last_name {
              text
            }
            intro {
              text
            }
            content {
              richText
            }
            gender

            image {
              alt
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                imgixParams: {
                  q: 100
                  fit: "facearea"
                  faces: 2
                  facepad: 5
                  fm: "jpg, avif, webp"
                  nr: 0
                  nrs: 50
                  dpr: 2
                  auto: "compress,enhance,format"
                }
              )
            }

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
            ## End forms

            #Page data - ends

            #SEO Start
            body {
              ... on PrismicPeerSupportersDataBodyGeneralSeoCard {
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

              ... on PrismicPeerSupportersDataBodyOpenGraph {
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

              ... on PrismicPeerSupportersDataBodyTwitterCard {
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
