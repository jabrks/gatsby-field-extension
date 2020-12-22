import React from "react"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => (
  <main>
    <h1>Blog</h1>
    <ul className="blog-posts">
      {data.allYaml.edges.map(({ node }) => (
        <li key={`index_${node.id}`}>
          <a href={node.fields.url}>
            <img src={node.Meta.Image.publicURL} alt="" />
            <h3>{node.Meta.Title}</h3>
          </a>
        </li>
      ))}
    </ul>
  </main>
)

export default IndexPage

export const query = graphql`
  query {
    allYaml {
      edges {
        node {
          id
          Meta {
            Title
            Image {
              publicURL
            }
          }
          fields {
            url
          }
        }
      }
    }
  }
`
