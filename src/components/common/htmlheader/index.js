import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

const HTMLHeader = ({ currentLang }) => (
  <StaticQuery
    query={`${SEOquery}`}
    render={(data) => {
      const metaTitle = data.site.siteMetadata.title

      return (
        <Helmet>
          {/* set lang - default 'en-nz' */}
          <html lang={currentLang ? currentLang : 'en-nz'} />
          {/* set default title */}
          <title>{metaTitle}</title>
          <meta
            name="google-site-verification"
            content="qyN6_J-qa6vpzr_YAW13YW5-X4ircfb94IGHsEGQlNM"
          />
          {/* Add Google fonts - Pre connect warm-up */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          {/* Material Symbols Sharp (multi axes - font loader self hosting does not handle multi axes) */}
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather&family=Open+Sans:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" as="font" href="https://use.typekit.net/cqf4nhp.css" />
        </Helmet>
      )
    }}
  />
)

export default HTMLHeader

const SEOquery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
