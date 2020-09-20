import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'


const CenterStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  //position: absolute;
  //top: 50%;
  //left: 50%;
  //transform: translate(-50%,-50%);
  font-family: "Baloo Tammudu 2", sans-serif;
`

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

const CenterLayout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query CenterLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <CenterStyle>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords }
          ]}
        />
        <div style={{ marginRight: 16, marginLeft: 16 }}>{children}</div>
      </CenterStyle>
    )}
  />
)

export default CenterLayout