import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '/src/components/layout'
import Bground404 from '/src/components/common/404/404-bground'

import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'

// Preview templates
import HomeTemplate from './index'
import GeneralPageTemplate from '../templates/generalPage'
import SupportersPage from '../templates/supportersPage'

import Button from '/src/components/common/buttons/linkButton'

import styled from 'styled-components'

const BgroundImageWrapper = styled.div`
  div:after {
    bottom: 0px;
    top: 60px;
    height: auto;
  }
`

const NotFound = styled.section`
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.header.height};
  grid-gap: ${({ theme }) => theme.padding.default};
  span {
    margin: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: ${({ theme }) => theme.padding['1/2']};
    h1,
    p {
      color: #fff;
    }
    span {
      margin-top: ${({ theme }) => theme.margin.default};
    }
  }
`

const NotFoundPage = ({ data }) => {
  if (!data) return null
  const primaryNav = data.prismicMainNavigation.data.nav
  const footerNav = data.prismicFooterNavigation.data.nav
  const currentLang = data.prismicMainNavigation.lang
  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav} footerNav={footerNav}>
      <BgroundImageWrapper>
        <Bground404 />
      </BgroundImageWrapper>
      <NotFound className="section-layout">
        <span>
          <h1>Oh purr-leaze!</h1>
          <p>It appears that Zoe has hidden this page.</p>
          <Button
            buttonLabel={'Take me home'}
            buttonType={'Static'}
            buttonLink={'/'}
            buttonStyle={'white'}
          />
        </span>
      </NotFound>
    </Layout>
  )
}

export default withPrismicPreview(NotFoundPage, {
  templateMap: {
    homepage: HomeTemplate,
    prismicHomepage: HomeTemplate,

    general_page: GeneralPageTemplate,
    prismicPage: GeneralPageTemplate,

    peer_supporters: SupportersPage,
    prismicPeerSupporters: SupportersPage,
  },
})

export const query = graphql`
  query errorPage($locale: String) {
    ## Get the primary nav in local context
    prismicMainNavigation(lang: { eq: $locale }) {
      type
      lang
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
                lang
                type
              }
            }
            items {
              sub_nav_link {
                uid
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
      type
      lang
      _previewable
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
  }
`
