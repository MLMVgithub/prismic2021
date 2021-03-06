import React from 'react'

// Helpers
// import { GatsbyImage } from 'gatsby-plugin-image'
import i18n from '/config/i18n'
import { RichText } from 'prismic-reactjs'
import linkResolver from '../../../utils/linkResolver'
import { validateString } from '/src/utils/helpers'
import { H1, P } from '/src/themes/typography'
import moment from 'moment'

// Layout
import Section from '/src/components/common/layout/pageLayout/'
import EventForm from '../../common/forms/formContact'

import styled from 'styled-components'

const Header = styled.div`
  display: flex;

  grid-gap: ${({ theme }) => theme.padding.default};

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding['1/2']};
  }
  margin: ${({ theme }) => theme.padding['4xl']} auto ${({ theme }) => theme.padding.default} auto;
  border-bottom: 4px solid ${({ theme }) => theme.colors.page[300]};

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
      margin-bottom: ${({ theme }) => theme.margin['1/2']};
      h1 {
        font-size: ${({ theme }) => theme.fontSize['4xl']};
        line-height: initial;
        @media (max-width: ${({ theme }) => theme.screens.sm}) {
          font-size: ${({ theme }) => theme.fontSize['3xl']};
        }
      }
    }

    .ifEvent {
      grid-gap: ${({ theme }) => theme.padding.default};
      padding: 0;
      margin: 0;
      p {
        display: flex;
        align-items: center;
        font-size: 90%;
        color: ${({ theme }) => theme.colors.page[700]};

        i {
          margin-right: ${({ theme }) => theme.margin['1/4']};
        }
      }
    }
    p.newsDate {
      font-size: 90%;
      color: ${({ theme }) => theme.colors.page[700]};
    }
  }
`

const Body = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
  }
  grid-gap: ${({ theme }) => theme.padding.default};
  & .content {
    width: 66%;
    padding-right: ${({ theme }) => theme.padding.default};
    @media (max-width: ${({ theme }) => theme.screens.md}) {
      padding-right: 0;
      width: 100%;
    }
    font-size: 110%;
  }
  & .contact {
    width: 33%;
    @media (max-width: ${({ theme }) => theme.screens.md}) {
      width: 100%;
    }

    section {
      padding: 0;
    }

    p {
      margin: 0;
      padding-bottom: ${({ theme }) => theme.padding.default};
      line-height: 1;
      span {
        display: inline-flex;
        align-items: center;
        grid-gap: ${({ theme }) => theme.margin['1/4']};
        margin-right: ${({ theme }) => theme.margin['1/2']};
      }
    }

    & .title {
      padding: ${({ theme }) => theme.padding['1/8']} 0 0 ${({ theme }) => theme.padding['1/2']};
      margin-bottom: 0;
    }
  }
`

const EventItem = ({ currentLang, itemData }) => {
  const eventItem = itemData.data
  const title = validateString(eventItem.title.text)
  const eventType = validateString(eventItem.type)
  const mainContent = validateString(eventItem.content.richText)
  const location = validateString(eventItem.location)
  const start_date = eventItem.start_date_time
  const date = moment(start_date).format('LL')
  const time = moment(start_date).format('LT')

  return (
    // Set content width - xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'
    <Section contentSize={'lg'}>
      <div>
        <Header>
          <div className="intro">
            <span>{title && <H1>{title}</H1>}</span>

            {eventType === 'Event' && (
              <span className="ifEvent">
                {date && (
                  <time>
                    <i className="material-icons-round" aria-hidden="true">
                      event
                    </i>
                    <span className="sr-only">Date</span>
                    {date}
                  </time>
                )}
                {time && (
                  <P>
                    <i className="material-icons-round" aria-hidden="true">
                      schedule
                    </i>
                    <span className="sr-only">Time</span>
                    {time}
                  </P>
                )}
                {location && (
                  <P>
                    <i className="material-icons-round" aria-hidden="true">
                      place
                    </i>
                    <span className="sr-only">Location</span>
                    {location}
                  </P>
                )}
              </span>
            )}
            {eventType === 'News item' && date && <P className="newsDate">{date}</P>}
          </div>
        </Header>

        <Body>
          <div className="content">
            {mainContent && <RichText render={mainContent} linkResolver={linkResolver} />}
          </div>

          {eventType === 'Event' && (
            <div className="contact">
              <P className="title">
                <strong>{i18n[currentLang].attendingEvent}</strong>
              </P>
              <EventForm formData={itemData.data} />
            </div>
          )}
        </Body>
      </div>
    </Section>
  )
}

export default EventItem
