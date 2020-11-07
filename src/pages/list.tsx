import * as React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import NavBar from '../components/navbar'
import PostPreview from '../components/post_preview'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Baloo Tammudu 2', sans-serif;
`

interface EdgeInterface {
  node: {
    id: number
    excerpt: string
    frontmatter: {
      date: string
      title: string
      slug: string
    }
  }
}

interface PageQueryInterface {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allMarkdownRemark: {
      edges: EdgeInterface[]
    }
  }
}

const ListPage: React.FC<PageQueryInterface> = ({ data }) => {
  const Posts = data.allMarkdownRemark.edges.map(edge => <PostPreview node={edge.node} key={edge.node.id} />)
  return (
    <div>
      <NavBar />
      <Layout>
        <div>{Posts}</div>
      </Layout>
    </div>
  )
}

export default ListPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt(pruneLength: 150)
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`