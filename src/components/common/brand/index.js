import React from 'react'

import i18n from '/config/i18n'
import Img from '/src/images/svg/brand-mlmv.inline.svg'

const Brand = ({ currentLang }) => {
  return <Img alt={`${i18n[currentLang].logo} - ${i18n[currentLang].siteTitle}`} />
}
export default Brand
