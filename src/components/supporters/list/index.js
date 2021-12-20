import React, { useState, useCallback } from 'react'

// Helpers
import i18n from '/config/i18n'

// Layout
import Section from '/src/components/common/layout/pageLayout/'
import ListWrapper from '/src/components/common/layout/listResults/listWrapper'
import ListGrid from '/src/components/common/layout/listResults/listGrid'
// import ItemWrapper from './itemWrapper'
import GridItem from './item'

// Filter componetent styles
import Filter from '/src/components/common/filter/filter'
import SkipFilter from '/src/components/common/filter/skipFilter'
import ListTagBtns from '/src/components/common/filter/tagBtns'
import SearchBox from '/src/components/common/filter/searchBox'
import SortList from '/src/components/common/filter/sortList'
import AscDesc from '/src/components/common/filter/ascDesc'
import SearchInput from '/src/components/common/filter/searchInput'
import SearchTitle from '/src/components/common/filter/searchTitle'
import NoResults from '/src/components/common/filter/noResults'

const ResourcesList = ({ currentLang, pageIntro, dataList }) => {
  // A little loDash for sorting assistance
  var _ = require('lodash')

  // Page title
  const pageTitle = pageIntro.title.text

  // Set up some states
  // And set the intial sort by title
  var [sourceList, setSourceList] = useState(
    _.sortBy(dataList.items, 'item.document.data.first_name.text')
  )
  var [allPosts, setAllPosts] = useState(dataList.items)
  var [queryValue, setQueryValue] = useState('')
  var [queryLength, setQueryLength] = useState(0)
  const [ascDesc, setAscDescSort] = useState(true) // false for Acs. true for Desc

  // Toggle sort order - Asc / Desc
  const sortAscDescClick = useCallback(() => {
    setAscDescSort(!ascDesc)
    setAllPosts(allPosts.sort().reverse())
  }, [allPosts, ascDesc])

  // Select sort item
  const sortItemClick = useCallback(
    (e) => {
      // console.log('event')

      // Add the node to be sorted to the node path
      const filterNode = e.getAttribute('data-nodepath')

      // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value?page=1&tab=votes#tab-top
      // Sort the node with lodash
      // First create an enpty array to hold a cloned list
      var sortPosts = []

      // Sort 'filteredData' or 'allPost'
      // Has the user entered search txt?
      if (queryLength > 0) {
        // If there is search txt, we get the 'filteredData' array
        sortPosts = _.cloneDeep([...filteredData]) // Use deep to ensure state updates?
        sortPosts = _.sortBy(filteredData, filterNode)
        // Check  AscDesc state
        ascDesc === true && sortPosts.reverse()
        // Update the states of 'allposts' and 'filteredData'
        setAllPosts(sortPosts)
        setState({ filteredData: sortPosts })
      } else {
        // Else sort the 'sourceList'
        sortPosts = _.cloneDeep([...dataList.items])
        sortPosts = _.sortBy(dataList.items, filterNode)
        // Check AscDesc state
        ascDesc === true && sortPosts.reverse()
        setSourceList(sortPosts)
        setAllPosts(sortPosts)
      }
      // console.log(ascDesc)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allPosts, ascDesc]
  )

  // Get tag data
  const allItems = dataList.items

  // Tags: Create a tag list of all items
  var tagList = []
  allItems.map((node, index) => tagList.push(allItems[index].item.tags))

  // Reset functions
  // Reset card state (on filter - mouseDown)
  const resetCards = () => {
    const filteredData = allItems
    const query = ''
    setState({
      query,
      filteredData,
    })
  }

  function resetFilters(evt) {
    resetFilterBtns()
    resetSearchQuery()
    handleSearchChange(evt)
  }

  function resetFilterBtns() {
    var filterBtns = document.getElementsByClassName('tagButton')
    for (var x = 0; x < filterBtns.length; ++x) {
      filterBtns[x].classList.remove('isActive')
      filterBtns[x].setAttribute('aria-label', 'Tag is unselected')
    }

    var allCards = document.getElementsByClassName('item')
    for (var y = 0; y < allCards.length; ++y) {
      allCards[y].classList.add('show')
    }

    var tagName = document.getElementsByClassName('tagName')
    for (var z = 0; z < tagName.length; ++z) {
      tagName[z].classList.remove('isActive')
    }
  }

  function resetSearchQuery() {
    var searchInput = document.querySelector('.search input')
    if (searchInput) {
      searchInput.value = ''
    }
    setQueryValue(0)
    setQueryLength(0)
  }

  // Input filter:
  const emptyQuery = ''

  const [state, setState] = useState({
    filteredData: [''],
    query: emptyQuery,
  })

  const handleSearchChange = (event) => {
    //console.log(event.target.value)

    // Reset any active tags - Where eith searching by tag or by input
    resetFilterBtns()

    // Set the search value and lenth
    setQueryValue(event.target.value)
    setQueryLength(event.target.value.length)

    // Consts for the filtered data array
    const query = event.target.value
    const data = sourceList

    // Create an array for the filtered that matches the query
    const filteredData = data.filter((data) => {
      // Filter by...
      const { first_name, last_name, intro, location } = data.item.document.data
      // And filter by tags
      const { tags } = data.item.document

      const fullName = first_name.text + ' ' + last_name.text

      return (
        fullName.toLowerCase().includes(query.toLowerCase()) ||
        // first_name.text.toLowerCase().includes(query.toLowerCase()) ||
        // last_name.text.toLowerCase().includes(query.toLowerCase()) ||
        intro.text.toLowerCase().includes(query.toLowerCase()) ||
        location.toLowerCase().includes(query.toLowerCase()) ||
        (tags && tags.join(' ').toLowerCase().includes(query.toLowerCase()))
      )
    })

    // And set the state of the query / filted data
    setState({
      query,
      filteredData,
    })

    // Set a state of allPosts to be filteredData. We set it here so can access it for Asc/Desc sorting
    setAllPosts(filteredData)
  }

  // Set state of allPosts. If empty, reset allPosts back to the sourceList
  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  allPosts = hasSearchResults ? filteredData : sourceList

  // Done - We can log the results
  // console.log(allPosts)

  return (
    // Set content width - xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'
    <>
      {pageTitle !== null && <h1 className="hide">{pageTitle}</h1>}

      {pageIntro.show_filters === true && (
        <Filter aria-label="Filter tools">
          <SkipFilter showTags={pageIntro.show_tags} />
          <div>
            {pageIntro.show_tags === true && tagList.length > 0 && (
              <ListTagBtns
                resetFilterBtns={resetFilterBtns}
                tagList={tagList}
                resetCards={resetCards}
                resetSearchQuery={resetSearchQuery}
              />
            )}

            <SearchBox className="search">
              {pageIntro.show_input === true && (
                <SearchInput
                  currentLang={currentLang}
                  handleSearchChange={handleSearchChange}
                  queryLength={queryLength}
                  resetFilters={resetFilters}
                />
              )}

              {pageIntro.show_sorting === true && (
                <SortList
                  currentLang={currentLang}
                  sortItemClick={sortItemClick}
                  setWidth={pageIntro.show_input}
                  // Pass the 'Sort by' properties. First being the default. Will display Asc order
                  items={[
                    {
                      title: `${i18n[currentLang].sortByName}`,
                      nodePath: 'item.document.data.first_name.text',
                    },
                    {
                      title: `${i18n[currentLang].sortByLocation}`,
                      nodePath: 'item.document.data.location',
                    },
                    // { title: 'URL', nodePath: 'link.document.data.web_address.url' },
                  ]}
                  sortAscDescClick={sortAscDescClick}
                />
              )}
              {(pageIntro.show_sorting === false && pageIntro.show_input === true) === true && (
                <AscDesc sortAscDescClick={sortAscDescClick} />
              )}
            </SearchBox>
          </div>
        </Filter>
      )}
      <Section contentSize={'lg marginTopInital'}>
        <ListWrapper>
          <SearchTitle
            filteredData={filteredData}
            queryValue={queryValue}
            queryLength={queryLength}
          />

          {allPosts.length > 0 ? (
            <ListGrid defaultColCount={3}>
              {allPosts.map((node, index) => (
                <GridItem
                  thisItem={allPosts[index]}
                  showTags={pageIntro.show_tags}
                  key={allPosts[index].item.id}
                  id={allPosts[index].item.id}
                />
              ))}
            </ListGrid>
          ) : (
            <NoResults resetFilters={resetFilters} query={query} />
          )}
        </ListWrapper>
      </Section>
    </>
  )
}

export default ResourcesList
