import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SeoZone from '/src/components/slices/seoZone'
import SliceZone from '/src/components/slices/sliceZone'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { linkResolver } from '/src/utils/linkResolver'

const GeneralPageTemplate = ({ data }) => {
  // Validate data for Gastby Build Gatsby Build breaks here for Delete / createPages  - see  https://github.com/birkir/gatsby-source-prismic-graphql/issues/174
  const primaryNavData = data.allPrismicMainNavigation.edges.slice(0, 1).pop()
  if (!data || !primaryNavData) return null
  const document = data.prismicGeneralPage

  const primaryNav = primaryNavData.node.data.nav
  const currentLang = primaryNavData.node.lang
  const footerNav = data.prismicFooterNavigation.data.nav

  // const primaryNav = data.prismicMainNavigation.data.nav
  // const footerNav = data.prismicFooterNavigation.data.nav
  // const currentLang = data.prismicMainNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav} footerNav={footerNav}>
      <SeoZone currentLang={currentLang} seoZone={document.data.body1} />
      <SliceZone currentLang={currentLang} sliceZone={document.data.body} />
    </Layout>
  )
}

export default withPrismicPreview(GeneralPageTemplate, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
    linkResolver,
  },
])

export const query = graphql`
  query GeneralPageQuery($uid: String, $locale: String) {
    ##
    ## Get the Main nav in local context
    allPrismicMainNavigation(filter: { lang: { eq: $locale } }) {
      edges {
        node {
          type
          lang
          id

          data {
            nav {
              ... on PrismicMainNavigationDataNavNavItem {
                id
                primary {
                  link {
                    uid
                    raw
                    type
                    lang
                  }
                  label {
                    text
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
      }
    }

    ##
    ## Get the Footer nav in local context
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

    prismicGeneralPage(lang: { eq: $locale }, uid: { eq: $uid }) {
      lang
      type
      uid
      id

      alternate_languages {
        lang
        uid
        type
        id
      }

      _previewable

      alternate_languages {
        lang
        uid
        type
        id
      }

      data {
        #Page data
        body {
          ##
          ## Hero image
          ... on PrismicGeneralPageDataBodyHeroImage {
            slice_type
            primary {
              leading_image {
                gatsbyImageData(
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  imgixParams: {
                    q: 75
                    fill: "blur"
                    fit: "crop"
                    fm: "jpg, avif, webp, svg"
                    nr: 20
                    nrs: 50
                    dpr: 3
                    auto: "compress,format"
                  }
                )
                alt
              }
              leading_image_height

              title {
                text
                richText
              }
              display_title
              description {
                richText
              }
              button_label
              button_link {
                raw
                uid
                type
                lang
              }
              button_style
              button_icon
              button_icon_align
              secondary_button_label
              secondary_button_link {
                raw
                uid
                type
                lang
              }
              secondary_button_style
              secondary_button_icon
              secondary_button_icon_align
              align_content
              vertical_align_content
              content_background_color
              content_background_opacity
              width
              height
              v_height
              default_margin
              margin_bottom
              margin_top
              overlay_from
              overlay_from_opacity
              overlay_to
              overlay_to_opacity
              overlay_direction
              align_image
              image {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  placeholder: BLURRED
                  imgixParams: {
                    q: 75
                    fill: "blur"
                    fit: "crop"
                    fm: "jpg, avif, webp"
                    nr: 20
                    nrs: 50
                    dpr: 3
                    auto: "compress,format"
                  }
                )
              }
            }
          }

          ##
          ## Body text
          ... on PrismicGeneralPageDataBodyText {
            id
            slice_type
            primary {
              default_padding
              v_padding_top
              v_padding_bottom
              background_color
              background_tint
              font_sizing
              text_alignment
              width
              columns
              content {
                text
                richText
              }
              override_content_style
              screen_reader_only
              button_alignment
              button_label
              button_link {
                raw
                uid
                type
                lang
              }
              button_style
              button_icon
              button_icon_align
              secondary_button_label
              secondary_button_link {
                raw
                uid
                type
                lang
              }
              secondary_button_style
              secondary_button_icon
              secondary_button_icon_align
              button_alignment
              stack_buttons
            }
          }

          ##
          ## Body quote
          ... on PrismicGeneralPageDataBodyQuote {
            id
            slice_type
            primary {
              title {
                text
                richText
              }
              width
              align
              default_padding
              v_padding_top
              v_padding_bottom
              background_color
              background_tint
            }
            items {
              title
              content {
                text
                richText
              }
              active
            }
          }

          ##
          ## Card items
          ... on PrismicGeneralPageDataBodyCards {
            slice_type
            id
            primary {
              card_title {
                richText
                text
              }
              aria_label
              align
              presentation_type
              width
              default_padding
              v_padding_top
              v_padding_bottom
              background_color
              background_tint
            }
            items {
              format
              title
              description {
                richText
                text
              }
              link_label {
                text
              }
              link {
                link_type
                type
                lang
                uid
              }
              image {
                alt
                gatsbyImageData(
                  breakpoints: [768, 992, 1200, 1366]
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  imgixParams: {
                    q: 100
                    fit: "facearea"
                    faces: 2
                    facepad: 10
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

          ##
          ## Media Highlight (Position shared media to top, left, bottom, right)
          ... on PrismicGeneralPageDataBodyMediaHighlight {
            primary {
              content {
                text
                richText
              }
              button_label
              button_link {
                raw
                uid
                type
                lang
              }
              button_style
              button_icon
              button_icon_align
              secondary_button_label
              secondary_button_link {
                raw
                uid
                type
                lang
              }
              secondary_button_style
              secondary_button_icon
              secondary_button_icon_align
              stack_buttons
              font_size
              align_content
              width
              default_padding
              v_padding_top
              v_padding_bottom
              background_color
              background_tint

              ## Shared media paramerters
              position_media
              media_size
              animate_scroll

              ## Add shared media item

              add_media {
                document {
                  ##
                  ## Shared content
                  ... on PrismicSharedContent {
                    #_previewable
                    data {
                      body {
                        ## Image
                        ... on PrismicSharedContentDataBodyImage {
                          slice_type
                          primary {
                            format
                            image {
                              alt
                              gatsbyImageData(
                                breakpoints: [768, 992, 1200, 1366]
                                aspectRatio: 1.777777
                                layout: FULL_WIDTH
                                placeholder: BLURRED
                                imgixParams: {
                                  q: 80
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
                        ## End image

                        ## Embedded cloud media
                        ... on PrismicSharedContentDataBodyEmbeddedCloudMedia {
                          slice_type
                          primary {
                            media
                            name {
                              text
                            }
                          }
                        }
                        ## End Embedded media

                        ## Text
                        ... on PrismicSharedContentDataBodyText {
                          slice_type
                          primary {
                            text {
                              richText
                            }
                          }
                        }
                        ## End Text

                        ## Geopoint
                        ... on PrismicSharedContentDataBodyGeopoint {
                          slice_type
                          primary {
                            description {
                              richText
                              text
                            }
                            geopoint {
                              latitude
                              longitude
                            }
                            name {
                              text
                            }
                            zoom_level
                          }
                        }
                        ## End Geopoint

                        ## Alert
                        ... on PrismicSharedContentDataBodyAlertBanner {
                          slice_type
                          id
                          primary {
                            content {
                              richText
                              text
                            }
                            width
                            align
                            expiry_date
                            level
                            user_can_close
                            button_label
                            button_link {
                              raw
                              uid
                              type
                              lang
                            }
                            button_icon
                            button_icon_align
                            secondary_button_label
                            secondary_button_link {
                              raw
                              uid
                              type
                              lang
                            }
                            secondary_button_style
                            secondary_button_icon
                            secondary_button_icon_align
                          }
                        }
                        ## End Alert
                      }
                    }
                  }
                }
              }
              ## End - Shared content
            }
            id
            slice_type
          }
          ##
          ## End media highlight

          ##
          ## Form select
          ... on PrismicGeneralPageDataBodyForm {
            id
            slice_type
            primary {
              content {
                richText
                text
              }
              width
              default_padding
              v_padding_top
              v_padding_bottom
              background_color
              background_tint
              select_form {
                document {
                  ##
                  ## Form
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
                  ##
                  ## End form
                }
              }
            }
          }
          ##
          ## End form select

          ##
          ## Styled list
          ... on PrismicGeneralPageDataBodyStyledList {
            id
            slice_type
            items {
              uncheck
              item {
                richText
                text
              }
            }
            primary {
              width
              list_type
              font_size
              default_padding
              v_padding_bottom
              v_padding_top
              theme
              background_color
              background_tint
            }
          }

          ##
          ## Static component
          ... on PrismicGeneralPageDataBodyStaticComponent {
            primary {
              component_name
            }
            slice_type
          }
        }
        ##
        ## Page data - ends

        ##
        ## SEO Start
        body1 {
          ... on PrismicGeneralPageDataBody1GeneralSeoCard {
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

          ... on PrismicGeneralPageDataBody1OpenGraph {
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

          ... on PrismicGeneralPageDataBody1TwitterCard {
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
