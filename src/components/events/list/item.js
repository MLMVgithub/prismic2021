import React, { useRef, useEffect } from 'react'

// Helpers
import { Link } from 'gatsby'
import moment from 'moment'
import i18n from '/config/i18n'
import { RichText } from 'prismic-reactjs'
import linkResolver from '../../../utils/linkResolver'
import { validateString } from '/src/utils/helpers'
import { resizeAllGridItems } from '/src/utils/helpers'

// Icons
import IconMaterial from '/src/components/common/icons/material'

// Layout
import ItemWrapper from '/src/components/common/layout/listResults/itemWrapper'
import ItemContent from '/src/components/common/layout/listResults/itemContent'
import Tags from '../../common/filter/tags'

const NewsEventsItem = ({ listStyle, currentLang, thisItem, showTags }) => {
  const item = thisItem.item.document
  const tagData = thisItem.item.document.tags.sort()
  const content = thisItem.item.document.data
  const title = content.title.text
  const eventType = content.type
  // const intro = content.intro
  const intro = validateString(content.intro.richText)
  const location = content.location

  // Reference grid items
  const gridItems = useRef([])
  gridItems.current = []

  const revealTxt = useRef([])
  revealTxt.current = []

  const gridItem = (item) => {
    if (item && !gridItems.current.includes(item)) {
      gridItems.current.push(item)
    }
  }

  // Use 'Resize all grid items' for grid filtering
  useEffect(() => {
    resizeAllGridItems(gridItems)
    'onclick, pointerover, resize, keydown, orientationchange'.split(', ').forEach(function (e) {
      window.addEventListener(e, () => {
        // Helpers - resizeAllGridItems
        resizeAllGridItems(gridItems)
      })
    })
  }, [])

  var currentDate = new Date()
  moment.locale(currentLang.slice(0, -3))

  currentDate.setDate(currentDate.getDate() - 2)
  const today = moment(currentDate).format()
  const start_date = content.start_date_time
  const end_date = content.end_date_time
  const showDuration = content.show_duration

  // console.log('end_date = ' + end_date)

  const date = moment(start_date).format('LL')
  const time = moment(start_date).format('LT')
  const endTime = moment(end_date).format('MMMM D, LT')

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
    <>
      {item.uid && (
        <ItemWrapper className="item show" ref={gridItem}>
          <Link to={`${item.uid}`} className="card">
            <ItemContent className={listStyle}>
              <div className="content">
                {title && (
                  <h2 className="title">
                    {title}
                    <IconMaterial icon={'arrow_forward'} />
                  </h2>
                )}
                {eventType === 'News item' && date !== 'Invalid date' && <time>{date}</time>}
                {intro && <RichText render={intro} linkResolver={linkResolver} />}
              </div>

              {eventType === 'Event' && (
                <div className="details">
                  {today < start_date && (
                    <>
                      {date && (
                        <time>
                          <IconMaterial icon={'event'} />
                          <span className="sr-only">Date</span> {date}
                        </time>
                      )}
                      {time && (
                        <time>
                          <IconMaterial icon={'schedule'} />
                          {i18n[currentLang].starts}: {time}
                        </time>
                      )}
                      {end_date > start_date && (
                        <time>
                          <IconMaterial icon={'access_time_filled'} />
                          {i18n[currentLang].ends}: {endTime}
                        </time>
                      )}
                      {showDuration === true && duration && (
                        <time>
                          <IconMaterial icon={'timelapse'} />
                          {i18n[currentLang].duration}: {duration}
                        </time>
                      )}
                    </>
                  )}

                  {today > start_date && (
                    <time className="passed">
                      <IconMaterial icon={'event_busy'} />
                      <span className="srike">{date}</span>
                      {i18n[currentLang].previousEvent}
                    </time>
                  )}

                  {location && (
                    <address>
                      <IconMaterial icon={'place'} />
                      <span className="sr-only">Location</span> {location}
                    </address>
                  )}

                  {showTags === true && tagData.length > 0 && <Tags tagData={tagData} />}
                </div>
              )}

              {eventType === 'News item' && showTags === true && tagData.length > 0 && (
                <span className="details">
                  <Tags tagData={tagData} />
                </span>
              )}
            </ItemContent>
          </Link>
        </ItemWrapper>
      )}
    </>
  )
}

export default NewsEventsItem
