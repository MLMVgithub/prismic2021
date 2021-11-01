const website = require('./website')

module.exports = {
  defaultPrefix: 'en',
  // All default paths  - Primary path (en) = '/' - include a trailing slash option for dev envrionemt.
  allPrefix: ['mi/', 'en/'],

  // English NZ
  'en-nz': {
    default: true,
    // Locales
    path: 'en',
    locale: 'en-nz',
    siteLanguage: 'en',
    // ogLang: 'de_DE',
    // defaultTitle: website.title,
    // defaultTitleAlt: website.titleAlt,
    // defaultDescription:
    //   'Basierend auf gatsby-starter-prismic mit Unterstützung für Lokalisierung (i18n)',
    // headline: 'Schreiben und Veröffentlichen für LekoArts',

    // Site title
    siteTitle: website.title,
    // Navigation
    skipPrimaryNav: 'Skip to main content',
    linkToHomepage: 'Link to homepage',
    logo: 'Identity and logo',
    menu: 'Menu',
    close: 'Close',
    back: 'Back',
    previous: 'Previous',
    next: 'Next',
    // Search
    searchPlacholder: 'Type to filter results...',
    // Sorting
    sortBy: 'Sort by',
    sortByDate: 'Date',
    sortByLocation: 'Location',
    sortByTitle: 'Title',
    sortByName: 'Name',
    sortByFirstName: 'First Name',
    sortBySurname: 'Surname',
    sortByType: 'Type',
    // Location
    covers: 'Covers',
    contact: 'Contact My Life My Voice to connect with',
    // Moment times
    starts: ' Starts',
    ends: 'Ends',
    duration: 'Duration',
    day: 'Day',
    days: 'Days',
    hour: 'Hour',
    hours: 'Hours',
    minute: 'Minute',
    minutes: 'Minutes',
    // Events
    previousEvent: 'Previous event',
    attendingEvent: 'Planning on attending this event? Let us know.',
    // Peer Supporters
    peerSupportsTitle: 'Peer Supporters list',
  },

  // Te Reo - Maori NZ
  'mi-nz': {
    // Locales
    path: 'mi',
    locale: 'mi-nz',
    siteLanguage: 'mi',
    // Site title
    siteTitle: 'Taku Ao Taku Reo',
    // Navigation
    skipPrimaryNav: 'Tīpoka ki te ihirangi matua',
    linkToHomepage: 'Honoa ki te whaarangi',
    logo: 'Te tuakiri me te waitohu',
    menu: 'Tahua',
    close: 'Katia',
    back: 'Hoki',
    previous: 'Tuhinga o mua',
    next: 'Panuku',
    // Search
    searchPlacholder: 'Patohia hei taatari i nga kitenga ...',
    // Sorting
    sortBy: 'Kōmakahia e',
    sortByDate: 'Te Ra',
    sortByLocation: 'Tauwāhi',
    sortByName: 'Ingoa',
    sortByFirstName: 'Ingoa Tuatahi',
    sortBySurname: 'Ingoa tuarua',
    sortByTitle: 'Taitara',
    sortByType: 'Momo',
    // Location
    covers: 'Nga uhi',
    contact: 'Whakapaa atu ki taku Ora Ko taku Reo hei hono atu',
    // Moment times
    starts: ' Ka tiimata',
    ends: 'Mutu',
    duration: 'Roanga',
    day: 'Ra',
    days: 'Ra',
    hour: 'Haora',
    hours: 'Haora',
    minute: 'Minute',
    minutes: 'Miniti',
    // Events
    previousEvent: 'Tuhinga o mua',
    attendingEvent: 'Te whakamahere mo te haere ki tenei huihuinga? Kia mohio taatau.',
    // Peer Supporters
    peerSupportsTitle: 'Rarangi Kaitautoko Hoa',
  },
}
