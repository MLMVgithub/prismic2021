import React, { useRef, useEffect } from 'react'

// Helpers
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import linkResolver from '/src/utils/linkResolver'
// import i18n from '/config/i18n'
import { validateString } from '/src/utils/helpers'
import { resizeAllGridItems } from '/src/utils/helpers'

// Icons
import IconMaterial from '/src/components/common/icons/material'

//
import ItemWrapper from '/src/components/common/layout/listResults/itemWrapper'
import ItemContent from '/src/components/common/layout/listResults/itemContent'
import Tags from '/src/components/common/filter/tags'

const RescourcesItem = ({ listStyle, thisItem, id, showTags, index, listLength }) => {
  const item = thisItem.item.document
  const tagData = thisItem.item.document.tags.sort()
  const content = thisItem.item.document.data
  const title = validateString(content.title.text)
  const intro = validateString(content.content.richText)
  const internalLink = validateString(content.web_address.uid)
  const externalLink = validateString(content.web_address.url)
  const phone = validateString(content.phone)
  const location = validateString(content.location)

  // Reference grid items
  const gridItems = useRef([])
  gridItems.current = []

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

  return (
    <>
      {item.uid && (
        <ItemWrapper
          className="item show"
          ref={gridItem}
          role={`Item ${index + 1} of ${listLength}`}
        >
          <div className="card">
            <ItemContent className={listStyle}>
              <div className="content">
                {title && <h2 className="title">{title}</h2>}
                {intro && <RichText render={intro} linkResolver={linkResolver} />}
              </div>
              <div className="details">
                {internalLink && (
                  <address>
                    <IconMaterial icon={'arrow_forward'} />
                    {internalLink}
                    <Link to={internalLink}>externalLink</Link>
                  </address>
                )}

                {externalLink && (
                  <a
                    href={externalLink}
                    target="_blank"
                    // aria-describedby={i18n[currentLang].openInNewWin}
                    rel="noreferrer"
                  >
                    <IconMaterial icon={'open_in_new'} />
                    <span className="sr-only">Open in a new window</span> {externalLink}
                  </a>
                )}

                {phone && (
                  <a href={`tel:${phone}`}>
                    <IconMaterial icon={'call'} />
                    <span className="sr-only">Contact number</span> {phone}
                  </a>
                )}

                {location && (
                  <address>
                    <IconMaterial icon={'place'} />
                    <span className="sr-only">Location</span> {location}
                  </address>
                )}

                {showTags === true && tagData.length > 0 && <Tags tagData={tagData} />}
              </div>
            </ItemContent>
          </div>
        </ItemWrapper>
      )}
    </>
  )
}

export default RescourcesItem
