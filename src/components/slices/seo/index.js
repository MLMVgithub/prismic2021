import React from 'react'
import { Helmet } from 'react-helmet'
import General from './general.js'
import OpenGraph from './openGraph.js'
import Twitter from './twitter.js'

const SEOIndex = ({ slice }) => {
  return (
    <Helmet>
      <html lang="en-nz" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-S55JE9KKJR"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-S55JE9KKJR');
</script>
      <General />
      <OpenGraph />
      <Twitter />
    </Helmet>
  )
}
export default SEOIndex
