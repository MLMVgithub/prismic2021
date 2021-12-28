import styled from 'styled-components'

const ItemWrapper = styled.li`
  display: none;
  a {
    text-decoration: none;
    width: 100%;
  }

  &.show,
  &.isActive {
    display: flex;
    height: fit-content;
  }
`
export default ItemWrapper
