import React from 'react'

// Helpers
import { Link } from 'gatsby'
import i18n from '/config/i18n'
import linkResolver from '/src/utils/linkResolver'

// Layout
import Brand from '../brand/'
import ScrollToTop from './scrollToTop/'

import styled from 'styled-components'

const FooterWrapper = styled.footer`
  position: relative;
  color: ${({ theme }) => theme.colors.footer.text.default};
  background-color: ${({ theme }) => theme.colors.footer.default};
  padding: ${({ theme }) => theme.padding['4xl']} 0;
  text-align: center;
  z-index: 1;

  > nav {
    max-width: ${({ theme }) => theme.screens.lg};
    position: relative;
    margin: 0 auto;
    z-index: 1000 !important;

    .footerNavWrapper {
      padding: ${({ theme }) => theme.margin.default} 0;
      margin: -${({ theme }) => theme.margin.default} 0 ${({ theme }) => theme.margin['4xl']} 0;
      border-top: 1px solid ${({ theme }) => theme.colors.footer[900]};
      border-bottom: 1px solid ${({ theme }) => theme.colors.footer[900]};
      /* background-color: ${({ theme }) => theme.colors.footer[1200]}; */
      display: flex;
      grid-gap: ${({ theme }) => theme.margin['4xl']};
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      list-style: none;

      @media (max-width: ${({ theme }) => theme.screens.sm}) {
        justify-content: space-evenly;
      }

      @media print {
        display: none;
      }

      > li {
        width: auto;
        /* color: ${({ theme }) => theme.colors.footer[200]}; */
        text-align: left;
        font-weight: 500;
        text-indent: ${({ theme }) => theme.padding['1/4']};
      }

      .footerNav {
        padding: inherit;
        margin: inherit;
        margin-top: ${({ theme }) => theme.margin['1/4']};

        display: inherit;
        flex-direction: column;
        list-style: inherit;

        li {
          font-weight: initial;
          color: ${({ theme }) => theme.colors.footer[400]};
          width: inherit;
          text-align: initial;
          text-indent: 0;
          a {
            margin: 0;
            text-decoration: none;
            line-height: 1.8rem;
            color: inherit;
            padding: ${({ theme }) => theme.padding['1/4']};
            display: flex;
          }
          a:hover {
            text-decoration: underline;
          }
        }
      }
    }

    a.brand {
      position: relative;
      color: unset;
      display: flex;
      margin: 0 auto;
      width: fit-content;
      padding: 2px 12px;

      span {
        display: none;
      }

      svg {
        width: auto;
        height: 24px;
        margin: ${({ theme }) => theme.margin['1/4']} auto;
      }
    }

    a:hover {
      color: inherit;
      text-decoration: none;
    }

    p {
      margin-bottom: ${({ theme }) => theme.margin['1/4']};
      position: relative;
    }
  }
`
const Footer = ({ currentLang, currentPrefix, footerNav }) => {
  // const data = useStaticQuery(graphql`
  //   query FooterQuery {
  //     site {
  //       siteMetadata {
  //         title
  //         author
  //         year
  //       }
  //     }
  //   }
  // `)

  // console.log(footerNav)

  return (
    <FooterWrapper>
      <nav aria-label="Footer navigation">
        <ScrollToTop />
        {footerNav.length > 0 ? (
          <ul className="footerNavWrapper">
            {footerNav.map((footer) => {
              return (
                <li key={footer.id}>
                  {footer.primary.label.text}
                  <ul className="footerNav">
                    {footer.items.map((navItem, index) => {
                      return (
                        <li key={`footer-${index}`}>
                          {navItem.nav_link.uid !== null ? (
                            <Link to={linkResolver(navItem.nav_link)}>
                              {navItem.link_label.text}
                            </Link>
                          ) : (
                            <a
                              href={
                                navItem.nav_link.raw.url !== undefined
                                  ? navItem.nav_link.raw.url
                                  : ''
                              }
                            >
                              {navItem.link_label.text}
                            </a>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        ) : (
          ''
        )}

        <p>
          © {new Date().getFullYear()} - {i18n[currentLang].siteTitle}
        </p>
        <Link
          to={currentPrefix === '/' ? currentPrefix : `${currentPrefix}/`}
          title={i18n[currentLang].linkToHomepage}
          className="brand"
        >
          <Brand currentLang={currentLang} />
        </Link>
      </nav>
    </FooterWrapper>
  )
}

export default Footer
