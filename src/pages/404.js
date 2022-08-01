import * as React from 'react'
import { graphql } from 'gatsby'

// Helpers
// import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import {
  withPrismicUnpublishedPreview,
  componentResolverFromMap,
} from 'gatsby-plugin-prismic-previews'
import { linkResolver } from '/src/utils/linkResolver'

// Preview templates
import HomeTemplate from './index'
import GeneralPageTemplate from '/src/templates/generalPage'

import SupportersList from '/src/templates/supportersList'
import SupportersPage from '/src/templates/supportersPage'

import EventsList from '/src/templates/eventsList'
import EventsPage from '/src/templates/eventsPage'

import ResourcesList from '/src/templates/resourcesList'
import ResourcesPage from '../templates/resourcesPage'

// Components
import Layout from '/src/components/layout'
import Bground404 from '/src/components/common/404/404-bground'
import Button from '/src/components/common/buttons/linkButton'

import styled from 'styled-components'

// const BgroundImageWrapper = styled.div`
//   div:after {
//     bottom: 0px;
//     top: ${({ theme }) => theme.header.height};
//     height: auto;
//   }
// `

const FillPageColor = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.header.default};
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
    padding: ${({ theme }) => theme.padding.default} 0;
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
      <FillPageColor>
        <Bground404 />
        <NotFound>
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
      </FillPageColor>
    </Layout>
  )
}

// export default withPrismicPreview(NotFoundPage, {
//   templateMap: {
//     homepage: HomeTemplate,
//     // prismicHomepage: HomeTemplate,

//     general_page: GeneralPageTemplate,
//     // prismicPage: GeneralPageTemplate,

//     peer_supporters: SupportersPage,
//     // prismicPeerSupporters: SupportersPage,
//   },
// })

export default withPrismicUnpublishedPreview(NotFoundPage, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
    linkResolver,
    componentResolver: componentResolverFromMap({
      homepage: HomeTemplate,
      general_page: GeneralPageTemplate,

      peer_supporters_list: SupportersList,
      peer_supporters: SupportersPage,

      events_list: EventsList,
      events: EventsPage,

      resources_list: ResourcesList,
      resources: ResourcesPage,
    }),
  },
])

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
      type
      lang

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
  }
`
