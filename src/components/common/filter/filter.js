import styled from 'styled-components'

const FilterWrapper = styled.section.attrs((props) => ({
  'aria-label': 'Filter results list',
}))`
  margin-top: ${({ theme }) => theme.header.height};
  padding: ${({ theme }) => theme.padding.default} ${({ theme }) => theme.padding['1/2']};
  background-color: ${({ theme }) => theme.colors.card[200]};
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.card[300]}; */
  position: relative;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10000;
    margin: 0 auto;
    grid-gap: ${({ theme }) => theme.margin['1/2']};
    max-width: ${({ theme }) => theme.screens.md};
  }

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
  }

  @media print {
    display: none;
  }
`

export default FilterWrapper
