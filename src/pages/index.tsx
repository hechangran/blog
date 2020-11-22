import * as React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Img, { GatsbyImageFixedProps } from 'gatsby-image'

import '../styles/main.css'
import CenterLayout from '../layouts/center'
import AnimatedLink from '../components/animated-link'

const Content = styled.div`
  @media (min-width: 720px) {
    display: flex;
    flex-direction: row;
  }

  line-height: 1.5;
`

const RoundedImg = styled(Img)`
  grid: 1/-1;
  border-radius: 50%;
`

interface ImageQueryProps {
  head: {
    childImageSharp: GatsbyImageFixedProps
  }
  github: {
    childImageSharp: GatsbyImageFixedProps
  }
}

const IndexPage = ({ data }: { data: ImageQueryProps }) => {
  return (
    <CenterLayout>
      <Content>
        <RoundedImg
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            marginRight: 25,
            width: 150,
            height: 150,
            aspectRatio: 1
          }}
          fixed={data.head.childImageSharp.fixed}
          alt="头像"
          imgStyle={{ objectFit: 'contain' }}
        />
        <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
          <div style={{ marginTop: 10, fontSize: '2rem', fontWeight: 600 }}>Elsa Granger</div>
          <div style={{ fontSize: 20, marginTop: 5 }}>
            Undergraduate of Information Security in{' '}
            <a href="https://www.ustc.edu.cn" style={{ textDecoration: 'none' }}>
              USTC
            </a>
          </div>
          <div style={{ display: 'flex', marginTop: 10 }}>
            <AnimatedLink to="https://github.com/zeyugao">GitHub</AnimatedLink>
            <AnimatedLink to="/list/">Blog</AnimatedLink>
            <AnimatedLink to="https://apps.elsagranger.com">Apps</AnimatedLink>
          </div>
        </div>
      </Content>
    </CenterLayout>
  )
}

export default IndexPage

export const query = graphql`
  query ImageQuery {
    head: file(relativePath: { eq: "head.jpg" }) {
      childImageSharp {
        fixed(width: 300, height: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
