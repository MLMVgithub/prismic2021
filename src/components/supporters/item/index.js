import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

// Helpers
import i18n from '/config/i18n'
import { RichText } from 'prismic-reactjs'
import linkResolver from '/src/utils/linkResolver'
import { validateString } from '/src/utils/helpers'

// Layout
import Section from '/src/components/common/layout/pageLayout/'
import Form from '/src/components/common/forms/formContact'
import Tags from '/src/components/common/filter/tags'

// Icons
import IconMaterial from '/src/components/common/icons/material'

import styled from 'styled-components'

const Header = styled.header`
  display: flex;

  grid-gap: ${({ theme }) => theme.padding.default};
  /* grid-column-gap: ${({ theme }) => theme.padding['1/2']}; */

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding['1/2']};
  }
  margin: ${({ theme }) => theme.padding['4xl']} auto ${({ theme }) => theme.padding.default} auto;
  border-bottom: 4px solid ${({ theme }) => theme.colors.secondary[300]};

  .intro {
    width: 60%;
    display: flex;
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding['1/2']};
    padding-bottom: ${({ theme }) => theme.padding['1/2']};
    @media (max-width: ${({ theme }) => theme.screens.md}) {
      padding-right: 0;
      width: 100%;
    }

    @media (max-width: ${({ theme }) => theme.screens.sm}) {
      padding-bottom: 0;
    }
    span {
      display: flex;
      align-items: center;

      .gatsby-image-wrapper {
        box-shadow: ${({ theme }) => theme.boxShadow.md};
        min-width: 75px;
        width: 75px;
        height: 75px;
        border-radius: 999rem;
        overflow: hidden;
        /* border: 2px solid ${({ theme }) => theme.colors.secondary[400]}; */
        /* border: 1px solid ${({ theme }) => theme.colors.card[400]}; */
        margin-right: ${({ theme }) => theme.margin['1/2']};
      }

      h1 {
        font-size: ${({ theme }) => theme.fontSize['4xl']};
        line-height: initial;
        @media (max-width: ${({ theme }) => theme.screens.sm}) {
          font-size: ${({ theme }) => theme.fontSize['3xl']};
        }
      }
    }

    .location {
      grid-gap: ${({ theme }) => theme.padding.default};
      padding: 0;
      margin: 0;
      color: ${({ theme }) => theme.colors.page[700]};

      span {
        margin: 0;
        flex-wrap: wrap;
        grid-column-gap: ${({ theme }) => theme.margin.default};
        grid-row-gap: ${({ theme }) => theme.margin['1/4']};

        time,
        address,
        a {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 0;
          width: fit-content;
          white-space: nowrap;
          grid-gap: ${({ theme }) => theme.margin['1/4']};

          i {
            color: ${({ theme }) => theme.colors.secondary.default};
          }
        }
      }
    }
  }
  .tags {
    width: 40%;
    padding-bottom: ${({ theme }) => theme.padding['1/2']};
    @media (max-width: ${({ theme }) => theme.screens.sm}) {
      width: 100%;
    }
    display: flex;
    align-self: flex-end;
  }
`

const Body = styled.article`
  display: flex;
  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
  }
  grid-gap: ${({ theme }) => theme.padding.default};
  & .content {
    width: 60%;
    padding-right: ${({ theme }) => theme.padding.default};
    @media (max-width: ${({ theme }) => theme.screens.md}) {
      padding-right: 0;
      width: 100%;
    }
    font-size: 100%;
  }
  & .contact {
    display: flex;
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding['1/2']};
    width: 40%;
    @media (max-width: ${({ theme }) => theme.screens.md}) {
      width: 100%;
    }

    section {
      padding: 0;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      grid-row-gap: ${({ theme }) => theme.padding['1/4']};
      grid-column-gap: ${({ theme }) => theme.padding['1/2']};
      text-indent: ${({ theme }) => theme.padding['1/4']};

      address {
        text-indent: 0;
        font-weight: 500;
        display: inline-flex;
        /* align-items: center; */
        align-items: flex-start;
        line-height: initial;
        grid-gap: ${({ theme }) => theme.margin['1/4']};
        i {
          color: ${({ theme }) => theme.colors.secondary.default};
        }
      }
    }
  }
`

const supportersItem = ({ currentLang, itemData }) => {
  //console.log(galleyItemTags.tags)
  const tagData = itemData.tags.sort()
  const supportersItem = itemData.data
  const firstName = validateString(supportersItem.first_name.text)
  const lastName = validateString(supportersItem.last_name.text)
  const fullName = firstName + ' ' + lastName
  const introText = validateString(supportersItem.intro.text)
  const mainContent = validateString(supportersItem.content.richText)
  const gender = validateString(supportersItem.gender)
  const location = validateString(supportersItem.location)

  return (
    // Set content width - xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'
    <Section contentSize={'lg'}>
      <div>
        <Header>
          <div className="intro">
            <span>
              {supportersItem.image && (
                <GatsbyImage
                  image={supportersItem.image.gatsbyImageData}
                  alt={supportersItem.image.alt ? supportersItem.image.alt : fullName}
                />
              )}
              {firstName && <h1>{fullName}</h1>}
            </span>
            {introText && <p className="date">{introText}</p>}
            <div className="location">
              <span>
                {location && (
                  <address>
                    <IconMaterial icon={'person_pin_circle'} />
                    <span class="sr-only">Location</span>
                    {location}
                  </address>
                )}
                {gender && (
                  <address>
                    <IconMaterial icon={'face'} />
                    <span className="sr-only">Gender</span>
                    {gender}
                  </address>
                )}
              </span>
            </div>
          </div>
          <Tags tagData={tagData} />
        </Header>

        <Body>
          <div className="content">
            {mainContent && <RichText render={mainContent} linkResolver={linkResolver} />}
          </div>
          <aside className="contact">
            <div>
              {firstName && (
                <address>
                  <IconMaterial icon={'mail'} />
                  {i18n[currentLang].contact} {firstName}
                </address>
              )}
            </div>

            <Form formData={itemData.data} />
          </aside>
        </Body>
      </div>
    </Section>
  )
}

export default supportersItem
