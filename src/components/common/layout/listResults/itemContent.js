import styled from 'styled-components'

const ItemContent = styled.article`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.textColor};
  background-color: ${({ theme }) => theme.colors.card[100]};
  border: 2px solid ${({ theme }) => theme.colors.card[300]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  transition: ${({ theme }) => theme.transition.easeOut.default};

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
  }

  &:hover {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primary[600]};
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }

  .imageWrapper {
    position: relative;
    border-bottom: 1px solid ${({ theme }) => theme.colors.card[300]};
    img {
      transition: ${({ theme }) => theme.transition.easeIn.default};
      /* aspect-ratio: 16/9; */
      aspect-ratio: 5/4;
      transform: scale(1.033);
      object-position: center top !important;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding['1/4']};
    color: ${({ theme }) => theme.colors.page.default};
    padding: ${({ theme }) => theme.padding['1/2']};

    .title {
      font-family: ${({ theme }) => theme.font.sans};
      font-size: 103%;
      font-weight: 600;
      align-content: space-between;
      display: flex;
      flex-direction: row;
      position: relative;
      align-items: center;
      margin: 0;
      i {
        color: inherit;
        /* color: ${({ theme }) => theme.colors.accent.default}; */
        position: inherit;
        transition: ${({ theme }) => theme.transition.easeIn.default};
        right: 0px;
        margin-left: auto;
      }
    }
    p {
      margin-bottom: 0;
      a {
        width: auto;
      }
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: ${({ theme }) => theme.padding['1/2']};
    grid-column-gap: ${({ theme }) => theme.margin['1/4']};
    grid-row-gap: ${({ theme }) => theme.margin['1/2']};
    margin-left: auto;
    background-color: #fff;
    border-top: 1px solid ${({ theme }) => theme.colors.card[300]};
    @media (max-width: ${({ theme }) => theme.screens.md}) {
      height: auto;
    }
    time,
    address,
    .passed,
    p,
    a {
      color: ${({ theme }) => theme.colors.page.default};
      align-items: flex-start;
      display: flex;
      flex-direction: row;
      grid-gap: ${({ theme }) => theme.margin['1/4']};
      text-decoration: none;
      width: fit-content;
      margin-top: -${({ theme }) => theme.margin['1/16']};

      i {
        margin-top: ${({ theme }) => theme.margin['1/16']};
        color: ${({ theme }) => theme.colors.secondary.default};
      }
      .srike {
        text-decoration: line-through;
        color: ${({ theme }) => theme.colors.page[400]};
      }
    }
    .passed {
      grid-row-gap: 0;
      flex-wrap: wrap-reverse;
      i {
        align-self: center;
      }
    }

    a {
      color: ${({ theme }) => theme.colors.primary[1100]};
      border-bottom: 1px solid transparent;
    }

    a:hover {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.primary.default};
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
    }
  }

  // If a 'list' class was passsed in, then display as a list style
  &.list {
    flex-direction: row;
    min-width: 100%;

    @media (max-width: ${({ theme }) => theme.screens.md}) {
      flex-direction: column;
    }
    .imageWrapper {
      display: flex;
      min-width: 128px;
      max-width: 128px;
      height: 128px;

      aspect-ratio: 1;
      border-radius: 100%;
      border: 2px solid ${({ theme }) => theme.colors.secondary[400]};
      margin: ${({ theme }) => theme.margin.default};
      overflow: hidden;
      @media (max-width: ${({ theme }) => theme.screens.md}) {
        min-width: 75px;
        max-width: 75px;
        height: 75px;
        margin: ${({ theme }) => theme.margin['1/2']} ${({ theme }) => theme.margin['1/2']} 0;
      }
    }

    .content {
      flex-direction: column;
      align-items: flex-start;
      border-top: none;
      width: 100%;

      .title {
        align-items: flex-start;
        height: auto;
        width: 100%;
        i {
          margin-left: auto;
        }
      }

      p {
        margin-right: ${({ theme }) => theme.margin.default};
        @media (max-width: ${({ theme }) => theme.screens.sm}) {
          margin-right: 0;
        }
      }
      time {
        color: ${({ theme }) => theme.colors.page[500]};
      }
    }

    .details {
      flex-direction: column;
      min-width: 33%;
      max-width: 33%;
      border-top: none;
      border-left: 1px solid ${({ theme }) => theme.colors.card[300]};
      @media (max-width: ${({ theme }) => theme.screens.md}) {
        border-left: none;
        border-top: 1px solid ${({ theme }) => theme.colors.card[300]};
        min-width: 100%;
      }
      time,
      address,
      .passed,
      p,
      a {
        color: ${({ theme }) => theme.colors.page.default};
        align-items: flex-start;
        flex-direction: row;
        grid-gap: ${({ theme }) => theme.margin['1/4']};
        width: fit-content;
        text-decoration: none;
        i {
          color: ${({ theme }) => theme.colors.secondary.default};
        }
        .srike {
          text-decoration: line-through;
          color: ${({ theme }) => theme.colors.page[400]};
        }
      }
      .passed {
        grid-row-gap: 0;
        flex-wrap: wrap-reverse;
        i {
          align-self: center;
        }
      }

      a {
        color: ${({ theme }) => theme.colors.primary[1100]};
        border-bottom: 1px solid transparent;
      }

      a:hover {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.primary.default};
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
      }
    }
  }

  &:hover {
    .imageWrapper {
      img {
        transform: scale(1);
        transition: ${({ theme }) => theme.transition.easeOut.default};
        object-position: center top;
      }
    }

    .content {
      text-decoration: none !important;
      .title {
        i {
          right: -${({ theme }) => theme.padding['1/8']};
          transition: ${({ theme }) => theme.transition.easeOut.default};
          color: ${({ theme }) => theme.colors.primary.default};
        }
      }
    }
  }
`
export default ItemContent
