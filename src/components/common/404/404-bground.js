import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { convertToBgImage } from 'gbimage-bridge'
import BackgroundImage from 'gatsby-background-image'

const BackgroundSection = () => {
  const { placeholderImage } = useStaticQuery(
    graphql`
      query {
        placeholderImage: file(relativePath: { eq: "images/zoe2.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              quality: 33
              layout: FULL_WIDTH
              transformOptions: {
                fit: COVER
                cropFocus: CENTER
                #grayscale: true
                duotone: { highlight: "#ebd956", shadow: "#031223", opacity: 33 }
              }
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    `
  )

  const image = getImage(placeholderImage)
  const bgImage = convertToBgImage(image)

  return (
    <BackgroundImage
      // Tag="section"
      // Spread bgImage into BackgroundImage:
      {...bgImage}
      preserveStackingContext
      style={{
        // position: 'absolute',
        // marginTop: 60,
        position: 'intial',
        overflow: 'hidden',
        display: 'flex',
        // flexGrow: 1,
        // top: 60,
        // bottom: 0,
        // height: '100vh',
        // left: 0,
        // right: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <GatsbyImage image={image} />
    </BackgroundImage>
  )
}

export default BackgroundSection
