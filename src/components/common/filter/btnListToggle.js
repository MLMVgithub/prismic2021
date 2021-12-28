import styled from 'styled-components'

const ListBtnToggle = styled.button`
  display: flex;
  width: fit-content;
  align-items: flex-end;
  justify-content: center;
  padding: ${({ theme }) => theme.padding['1/4']};
  user-select: none;
  /* background-color: #ffffff; */
  background-color: ${({ theme }) => theme.colors.card[200]};
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

  &:hover,
  &[aria-pressed='true'] {
    color: ${({ theme }) => theme.colors.primary.default};
    border-color: ${({ theme }) => theme.colors.primary[600]};
    i {
      color: ${({ theme }) => theme.colors.primary.default};
    }
  }
`

export default ListBtnToggle
