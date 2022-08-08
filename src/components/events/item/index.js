import React from 'react'

// Helpers
// import { GatsbyImage } from 'gatsby-plugin-image'
import i18n from '/config/i18n'
import { RichText } from 'prismic-reactjs'
import linkResolver from '../../../utils/linkResolver'
import { validateString } from '/src/utils/helpers'
import moment from 'moment'

// Icons
import IconMaterial from '/src/components/common/icons/material'

// Layout
import Section from '/src/components/common/layout/pageLayout/'
import Form from '../../common/forms/formContact'

import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  grid-gap: ${({ theme }) => theme.padding.default};
  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding['1/2']};
  }
  margin: ${({ theme }) => theme.padding['4xl']} auto ${({ theme }) => theme.padding.default} auto;
  // padding-bottom: ${({ theme }) => theme.padding.default};
  border-bottom: 4px solid ${({ theme }) => theme.colors.tertiary[300]};

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

    span {
      display: flex;
      align-items: center;
      h1 {
        /* font-size: ${({ theme }) => theme.fontSize['4xl']}; */
        line-height: initial;
        @media (max-width: ${({ theme }) => theme.screens.sm}) {
          /* font-size: ${({ theme }) => theme.fontSize['3xl']}; */
        }
      }
    }

    .dateLocation {
      grid-gap: ${({ theme }) => theme.padding.default};
      padding: 0;
      margin: 0;
      color: ${({ theme }) => theme.colors.page[700]};

      span,
      span.passed {
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
            /* font-size: 32px; */
            color: ${({ theme }) => theme.colors.tertiary.default};
          }
        }
      }
      span.passed {
        time,
        address {
          .prev {
            text-decoration: line-through;
            color: ${({ theme }) => theme.colors.page[400]};
          }
        }
      }
    }
  }
`

const Body = styled.article`
  display: flex;
  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
  }
  grid-gap: ${({ theme }) => theme.padding['1/2']};
  & .content {
    width: 60%;
    padding-right: ${({ theme }) => theme.padding.default};
    border-right: 1px solid ${({ theme }) => theme.colors.tertiary[300]};
    @media (max-width: ${({ theme }) => theme.screens.md}) {
      padding-right: ${({ theme }) => theme.padding['1/2']};
      width: 100%;
    }
    @media (max-width: ${({ theme }) => theme.screens.sm}) {
      border-right: none;
    }
    /* font-size: 110%; */
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
      /* text-indent: ${({ theme }) => theme.padding['1/4']}; */
      address {
        text-indent: 0;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        /* align-items: flex-start; */
        line-height: initial;
        grid-gap: ${({ theme }) => theme.margin['1/4']};
        i {
          font-size: 32px;
          color: ${({ theme }) => theme.colors.tertiary.default};
        }
      }
    }
  }
`

const EventItem = ({ currentLang, itemData }) => {
  const eventItem = itemData.data
  const title = validateString(eventItem.title.text)
  const eventType = validateString(eventItem.type)
  const mainContent = validateString(eventItem.content.richText)
  const location = validateString(eventItem.location)

  var currentDate = new Date()

  moment.locale(currentLang.slice(0, -3))
  currentDate.setDate(currentDate.getDate() - 2)
  const today = moment(currentDate).format()
  var start_date = eventItem.start_date_time
  var undefinedStartDate = moment(currentDate).add(365, 'days').format()
  // console.log('start_date = ' + start_date)
  if (start_date !== null) {
    undefinedStartDate = start_date
  }

  var end_date = eventItem.end_date_time

  var date = moment(start_date).format('LL')
  // date = moment.locale('es')

  const time = moment(start_date).format('LT')
  const endTime = moment(end_date).format('MMMM D, LT')

  const showDuration = eventItem.show_duration

  const eventForm = eventItem.select_form

  if (end_date) {
    var diff = moment.duration(moment(end_date).diff(moment(start_date)))
    var days = parseInt(diff.asDays()) //84
    var hours = parseInt(diff.asHours()) //2039 hours, but it gives total hours in given miliseconds which is not expacted.
    hours = hours - days * 24 // 23 hours
    var minutes = parseInt(diff.asMinutes()) //122360 minutes,but it gives total minutes in given miliseconds which is not expacted.
    minutes = minutes - (days * 24 * 60 + hours * 60) //20 minutes.
    var duration = ''
    if (days === 1) {
      duration = duration + ' ' + days + ` ${i18n[currentLang].day}`
    }
    if (days > 1) {
      duration = duration + ' ' + days + ` ${i18n[currentLang].days}`
    }
    if (hours === 1) {
      duration = duration + ' ' + hours + ` ${i18n[currentLang].hour}`
    }
    if (hours > 1) {
      duration = duration + ' ' + hours + ` ${i18n[currentLang].hours}`
    }
    if (minutes === 1) {
      duration = duration + ' ' + minutes + ` ${i18n[currentLang].minute}`
    }
    if (minutes > 1) {
      duration = duration + ' ' + minutes + ` ${i18n[currentLang].minutes}`
    }
  }

  return (
    // Set content width - xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'
    <Section contentSize={'lg withSecondaryNav'}>
      <div>
        <Header>
          <div className="intro">
            <span>{title && <h1>{title}</h1>}</span>

            {today < start_date && eventType === 'Event' && (
              <span className="dateLocation">
                {today < start_date && (
                  <span>
                    {date && (
                      <time>
                        <IconMaterial icon={'event'} />
                        <span className="sr-only">Date</span>
                        {date}
                      </time>
                    )}
                    {time && (
                      <time>
                        <IconMaterial icon={'schedule'} />
                        <span className="sr-only">Start time</span>
                        {i18n[currentLang].starts}: {time}
                      </time>
                    )}

                    {end_date > start_date && (
                      <time>
                        <IconMaterial icon={'access_time_filled'} />
                        <span className="sr-only">End time</span>
                        {i18n[currentLang].ends}: {endTime}
                      </time>
                    )}
                    {showDuration === true && duration && (
                      <time>
                        <IconMaterial icon={'timelapse'} />
                        <span className="sr-only">Duration</span>
                        {i18n[currentLang].duration}: {duration}
                      </time>
                    )}

                    {location && (
                      <address>
                        <IconMaterial icon={'place'} />
                        <span className="sr-only">Location</span>
                        {location}
                      </address>
                    )}
                  </span>
                )}
                {today > start_date && (
                  <span className="passed">
                    <time>
                      <IconMaterial icon={'event_busy'} />
                      <span className="sr-only">Previous event</span>
                      <span className="prev">{date}</span> {i18n[currentLang].previousEvent}
                    </time>
                    <address>
                      <IconMaterial icon={'place'} />
                      <span className="sr-only">Location</span>
                      {location}
                    </address>
                  </span>
                )}
              </span>
            )}

            {eventType === 'News item' && date !== 'Invalid date' && (
              <span className="dateLocation">
                <time>{date}</time>
              </span>
            )}
          </div>
        </Header>

        <Body>
          <div className="content">
            {mainContent && <RichText render={mainContent} linkResolver={linkResolver} />}
          </div>
          {/* {today < start_date && eventType === 'Event' && ( */}
          {eventForm !== null && today < undefinedStartDate && eventType === 'Event' && (
            <aside className="contact">
              <div>
                <address>
                  <IconMaterial icon={'event_available'} />
                  {i18n[currentLang].attendingEvent}
                </address>
              </div>

              <Form formData={itemData.data} />
            </aside>
          )}
        </Body>
      </div>
    </Section>
  )
}

export default EventItem
