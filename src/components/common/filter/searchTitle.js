import React from 'react'

import styled from 'styled-components'

const SearchTitleWrapper = styled.p`
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  width: fit-content;
  padding: 0;
  margin: 0 auto;
`

const SearchTitle = ({ filteredData, queryValue, queryLength }) => {
  return (
    <>
      {queryLength >= 1 &&
        (filteredData.length > 0 ? (
          <SearchTitleWrapper>{queryValue}</SearchTitleWrapper>
        ) : (
          <SearchTitleWrapper>
            Sorry, no results found for '<strong> {queryValue} </strong>'
          </SearchTitleWrapper>
        ))}
    </>
  )
}

export default SearchTitle
