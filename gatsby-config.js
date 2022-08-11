require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const linkResolver = require('./src/utils/linkResolver')

module.exports = {
  siteMetadata: {
    title: `My Life My Voice`,
    description: `My Life My Voice offer meaningful support, information and connections that assist disabled people and their whānau - My Life My Voice`,
    siteUrl: `https://www.mylifemyvoice.org.nz`, // No trailing slash allowed!
    defaultImage: 'src/images/svg/brand-mlmv.inline.svg', // Path to your image you placed in the 'static' folder
    author: 'Peter Koenders',
    year: '2022',
  },

  flags: {
    // PRESERVE_FILE_DOWNLOAD_CACHE: true,
    // FAST_DEV: true,
    DEV_SSR: false,
  },

  plugins: [
    `babel-plugin-styled-components`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,

    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        // To include macrons ensure 'All characters' are selected in the Typekit project props
        // typekit: {
        // mlmv-proxima-nova
        //   id: 'cqf4nhp',
        // },
      },
    },

    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google2: [
            // href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            // font-variation-settings: 'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 48;

            // {
            //   family: 'Material+Symbols+Sharp',
            //   axes: 'opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
            //   // axes: 'opsz@20..48,wght@100..700,FILL@0..1,GRAD@-50..200',
            //   // axes: 'opsz@20..48',
            //   // axes: 'wght@100..700',
            //   // axes: 'FILL@0..1',
            //   // axes: 'GRAD@-50..200',

            //   // text: 'abcdefghijklmnopqrstuvwxyz_0123456789',
            //   // fontDisplay: 'swap',
            //   strategy: 'base64',
            //   // strategy: 'cdn',
            // },

            // {
            //   family: 'Roboto',
            //   axes: 'wght@300;400;500;600',
            //   // fontDisplay: 'swap',
            //   // strategy: 'base64', // 'base64' || 'cdn'
            //   // strategy: 'cdn',
            // },

            {
              family: 'Open+Sans',
              axes: 'wght@300;400;500;600',
              // fontDisplay: 'swap',
              // strategy: 'base64', // 'base64' || 'cdn'
              strategy: 'base64',
              // strategy: 'cdn',
            },

            {
              family: 'Merriweather',
              axes: 'wght@400',
              // fontDisplay: 'swap',
              strategy: 'base64',
              // strategy: 'cdn',
            },
          ],
        },
        // useMinify: true,
        // usePreload: true,
        // usePreconnect: true,
      },
    },

    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        // releaseID: `${process.env.PRISMIC_RELEASE_ID}`,
        // prismicToolbar: true,
        linkResolver: () => (doc) => linkResolver(doc),
        // linkResolver: require('./src/utils/linkResolver'),
        // defaultLanguage: 'en-nz',
        // langs: ['en-nz', 'mi-nz'],

        schemas: {
          homepage: require('./custom_types/homepage.json'),
          general_page: require('./custom_types/general_page.json'),
          events: require('./custom_types/events.json'),
          events_list: require('./custom_types/events_list.json'),
          peer_supporters: require('./custom_types/peer_supporters.json'),
          peer_supporters_list: require('./custom_types/peer_supporters_list.json'),
          resources: require('./custom_types/resources.json'),
          resources_list: require('./custom_types/resources_list.json'),
          forms: require('./custom_types/forms.json'),
          shared_content: require('./custom_types/shared_content.json'),
          main_navigation: require('./custom_types/main_navigation.json'),
          footer_navigation: require('./custom_types/footer_navigation.json'),
          seo_cards: require('./custom_types/seo_cards.json'),
        },
      },
    },

    {
      resolve: 'gatsby-plugin-prismic-previews',
      options: {
        repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
        // accessToken: `${process.env.PRISMIC_API_KEY}`,
        toolbar: 'new',
      },
    },

    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },

    'gatsby-plugin-gatsby-cloud',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,

    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-PPCSMJV',
        includeInDevelopment: false,
        enableWebVitalsTracking: true,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     // replace "UA-XXXXXXXXX-X" with your own Tracking ID
    //     trackingId: 'G-S55JE9KKJR',
    //   },
    // },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.mylifemyvoice.org.nz',
        sitemap: 'https://www.mylifemyvoice.org.nz/sitemap/sitemap-index.xml',
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/gatsby-config.js`,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `My Life My Voice`,
        description: `My Life My Voice offer meaningful support, information and connections that assist disabled people and their whānau - My Life My Voice`,
        short_name: `MLMV`,
        start_url: `/`,
        background_color: `#091b38`,
        theme_color: `#091b38`,
        lang: `en-nz`,
        display: `standalone`,
        icon: `static/manifest.svg`, // This path is relative to the root of the site.
        cache_busting_mode: 'none',
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },

    `gatsby-plugin-offline`,

    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     workboxConfig: {
    //       globPatterns: ['**/static*'],
    //     },
    //   },
    // },
  ],
}
