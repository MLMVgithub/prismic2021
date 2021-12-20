import React from 'react'

// Icons
import IconMaterial from '/src/components/common/icons/material'

import styled from 'styled-components'

const AscDescBtnWrapper = styled.button.attrs((props) => ({
  type: props.type || 'button',
  'aria-label': 'Sort by ascending or descending',
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  /* cursor: pointer; */
  padding: ${({ theme }) => theme.padding['1/4']};
  user-select: none;
  background-color: #ffffff;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  i {
    pointer-events: none;
  }

  &.desc {
    i {
      transform: rotate(180deg);
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary.default};
    border-color: ${({ theme }) => theme.colors.primary[600]};
    i {
      color: ${({ theme }) => theme.colors.primary.default};
    }
  }
`
const AscDesc = ({ sortAscDescClick }) => {
  // Toggle sort order - Asc / Desc

  function handleSort(e) {
    if (!e.key) {
      toggleList(e)
    } else {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault()
          if (!e.target.classList.contains('desc')) {
            toggleList(e)
          }
          break

        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault()
          if (e.target.classList.contains('desc')) {
            toggleList(e)
          } else {
          }
          break

        default:
          break
      }
    }
  }

  function toggleList(e) {
    // Toggle list and Aria labels for button
    e.target.classList.toggle('desc')
    sortAscDescClick()
    e.target.getAttribute('aria-label') === 'Sort by descending'
      ? e.target.setAttribute('aria-label', 'Sort by ascending')
      : e.target.setAttribute('aria-label', 'Sort by descending')
  }

  return (
    <AscDescBtnWrapper
      onClick={handleSort}
      onKeyDown={handleSort}
      className="toggleOrder"
      aria-live="polite"
    >
      <IconMaterial icon={'filter_list'} />
    </AscDescBtnWrapper>
  )
}

export default AscDesc
