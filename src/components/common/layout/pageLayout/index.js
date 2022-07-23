import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
  // Section - For other templates that are not Homepage and General page
  display: flex;
  flex-direction: column;
  /* margin-top: ${({ theme }) => theme.header.height}; */
  padding: 0 0 ${({ theme }) => theme.padding['2xl']};

  &.withSecondaryNav {
    margin-top: 80px;
  }

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    /* padding: ${({ theme }) => theme.padding['1/8']} !important; */
  }

  > div,
  > nav {
    max-width: ${({ theme }) => theme.screens.xl};
    margin: 0px auto;
    padding: 0 ${({ theme }) => theme.padding['1/2']};
  }

  &.xs > div,
  &.xs > nav {
    max-width: ${({ theme }) => theme.screens.xs};
  }
  &.sm > div,
  &.sm > nav {
    max-width: ${({ theme }) => theme.screens.sm};
  }
  &.md > div,
  &.md > nav {
    max-width: ${({ theme }) => theme.screens.md};
  }
  &.lg > div,
  &.lg > nav {
    max-width: ${({ theme }) => theme.screens.lg};
  }
  &.xl > div,
  &.xl > nav {
    max-width: ${({ theme }) => theme.screens.xl};
  }
  &.xxl > div,
  &.xxl > nav {
    max-width: ${({ theme }) => theme.screens.xxl};
  }
  &.full > div,
  &.full > nav {
    max-width: ${({ theme }) => theme.screens.full};
    padding: 0;
  }
`

const PageLayout = ({ children, contentSize, marginTop, paddingTop }) => {
  return (
    <Section className={contentSize} style={{ marginTop: marginTop, paddingTop: paddingTop }}>
      {children}
    </Section>
  )
}

export default PageLayout
