import React from 'react'

// Helpers
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import linkResolver from '/src/utils/linkResolver'
import i18n from '/config/i18n'
import { validateString } from '/src/utils/helpers'

// Icons
import IconMaterial from '/src/components/common/icons/material'

// Layout
import ListItem from '/src/components/common/layout/listResults/listItem'
import CardContent from '/src/components/common/layout/listResults/cardContent'
import Tags from '/src/components/common/filter/tags'

const RescourcesItem = ({ currentLang, resourceItem, id, showTags }) => {
  const item = resourceItem.item.document
  const tagData = resourceItem.item.document.tags.sort()
  const content = resourceItem.item.document.data
  const title = validateString(content.title.text)
  const intro = validateString(content.content.raw)
  const internalLink = validateString(content.web_address.uid)
  const externalLink = validateString(content.web_address.url)
  const phone = validateString(content.phone)
  const location = validateString(content.location)

  return (
    <>
      {item.uid && (
        <ListItem id={id} className={'item show'}>
          <div className="card">
            <CardContent>
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
                  <a href={`tel:${phone}`} aria-describedby={i18n[currentLang].openInPhoneApp}>
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
            </CardContent>
          </div>
        </ListItem>
      )}
    </>
  )
}

export default RescourcesItem
