import React, { useRef, useEffect } from 'react'

// Helpers
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Tags from '../../common/filter/tags'
import linkResolver from '../../../utils/linkResolver'
import { resizeAllGridItems } from '/src/utils/helpers'

// Layout
import ItemWrapper from '/src/components/common/layout/listResults/itemWrapper'
import ItemContent from '/src/components/common/layout/listResults/itemContent'

// Icons
import IconMaterial from '/src/components/common/icons/material'

const PeerSupportersItem = ({ listStyle, thisItem, index, listLength }) => {
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

  const item = thisItem.item.document
  const content = thisItem.item.document.data
  const firstName = content.first_name.text
  const fullName = content.first_name.text
  //  const fullName = content.first_name.text + ' ' + content.last_name.text
  const intro = content.intro.text
  const location = content.location
  var tagData = thisItem.item.document.tags

  //Filter duplicates if any
  tagData = uniq(tagData)
  function uniq(a) {
    var seen = {}
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true)
    })
  }

  //Sort
  tagData.sort()

  return (
    <>
      {item.uid && (
        <ItemWrapper
          className="item show"
          ref={gridItem}
          // role={`Item ${index + 1} of ${listLength}`}
        >
          <Link to={linkResolver(item)} className="card">
            <ItemContent className={listStyle}>
              {content.image && (
                <div className="imageWrapper">
                  <GatsbyImage
                    image={content.image.gatsbyImageData}
                    alt={content.image.alt ? content.image.alt : fullName}
                  />
                </div>
              )}

              <div className="content">
                {firstName && (
                  <h2 className="title">
                    {fullName}
                    <IconMaterial icon="arrow_forward" />
                  </h2>
                )}
                {intro && <p>{intro}</p>}
              </div>

              {(location || tagData.length > 0) && (
                <div className="details">
                  {location && (
                    <p>
                      <IconMaterial icon="person_pin_circle" />
                      <span className="sr-only">Loction</span> {location}
                    </p>
                  )}
                  {tagData.length > 0 && <Tags tagData={tagData} />}
                </div>
              )}
            </ItemContent>
          </Link>
        </ItemWrapper>
      )}
    </>
  )
}

export default PeerSupportersItem
