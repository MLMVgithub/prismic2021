import styled from 'styled-components'

const ListWrapper = styled.div.attrs({ id: 'listResults' })`
  display: flex;
  flex-direction: column;
  grid-gap: ${({ theme }) => theme.padding['1/2']};
`
export default ListWrapper
