import styled from 'styled-components'

const ListStyleWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > div {
    padding: ${({ theme }) => theme.padding['1/2']} 0;
    grid-gap: ${({ theme }) => theme.padding['1/4']};
    z-index: 100;
    display: flex;
    flex-direction: row;
  }

  > div:last-of-type {
    align-self: flex-start;
  }
  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
    align-items: normal;
    > div:first-of-type {
      order: 100;
      padding: 0;
    }
    > div:last-of-type {
      align-self: auto;
    }
  }

  p {
    padding-right: ${({ theme }) => theme.padding['1/2']};
  }
`

export default ListStyleWrapper
