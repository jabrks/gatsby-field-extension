import React from "react"
import { graphql } from "gatsby"

const BlogPost = ({ data }) => {
  return (
    <main>
      <h1>{data.yaml.Meta.Title}</h1>
      <img src={data.yaml.Meta.Image.publicURL} alt="" />

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu
        consequat ac felis donec et odio pellentesque. Ut morbi tincidunt augue
        interdum velit euismod. Nec feugiat in fermentum posuere urna nec. A
        pellentesque sit amet porttitor eget dolor. Sed vulputate mi sit amet
        mauris commodo quis. Arcu felis bibendum ut tristique et egestas. Sit
        amet consectetur adipiscing elit ut. Elit duis tristique sollicitudin
        nibh sit. Sed risus ultricies tristique nulla aliquet enim tortor at
        auctor.
      </p>

      <p>
        Quis blandit turpis cursus in hac habitasse. Cursus vitae congue mauris
        rhoncus aenean vel elit. Volutpat ac tincidunt vitae semper quis lectus
        nulla at volutpat. Egestas quis ipsum suspendisse ultrices gravida
        dictum fusce. Sapien faucibus et molestie ac feugiat sed. Mattis
        pellentesque id nibh tortor id aliquet. Ipsum a arcu cursus vitae.
        Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet
        enim. Nunc non blandit massa enim nec. Lorem donec massa sapien faucibus
        et.
      </p>

      <p>
        Risus at ultrices mi tempus imperdiet nulla. Urna et pharetra pharetra
        massa. Adipiscing vitae proin sagittis nisl rhoncus mattis. Tortor at
        auctor urna nunc id. Nibh sit amet commodo nulla facilisi. Non curabitur
        gravida arcu ac tortor. In tellus integer feugiat scelerisque varius
        morbi enim. Amet est placerat in egestas erat imperdiet sed euismod
        nisi. Leo a diam sollicitudin tempor id eu nisl nunc mi. Blandit libero
        volutpat sed cras ornare arcu dui vivamus arcu. Vestibulum sed arcu non
        odio euismod lacinia. Volutpat diam ut venenatis tellus. Ut tortor
        pretium viverra suspendisse potenti nullam ac tortor. Facilisis volutpat
        est velit egestas dui.
      </p>

      <p>
        Faucibus nisl tincidunt eget nullam non nisi est sit amet. Dui vivamus
        arcu felis bibendum ut tristique. Diam in arcu cursus euismod. Enim sed
        faucibus turpis in eu mi. Ornare quam viverra orci sagittis. Massa
        sapien faucibus et molestie ac feugiat. Sit amet consectetur adipiscing
        elit. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Enim
        nulla aliquet porttitor lacus luctus accumsan tortor posuere. Tortor
        vitae purus faucibus ornare suspendisse sed nisi lacus sed. Amet dictum
        sit amet justo. Urna nec tincidunt praesent semper feugiat nibh sed.
        Tincidunt eget nullam non nisi est sit.
      </p>

      <p>
        Viverra maecenas accumsan lacus vel facilisis volutpat. Arcu ac tortor
        dignissim convallis. Eleifend quam adipiscing vitae proin sagittis nisl
        rhoncus mattis rhoncus. Egestas pretium aenean pharetra magna ac
        placerat vestibulum. Non enim praesent elementum facilisis leo vel
        fringilla est. Suspendisse ultrices gravida dictum fusce. Nisl suscipit
        adipiscing bibendum est. Elementum facilisis leo vel fringilla est
        ullamcorper. Augue interdum velit euismod in pellentesque massa placerat
        duis ultricies. Congue mauris rhoncus aenean vel elit scelerisque mauris
        pellentesque pulvinar. Proin nibh nisl condimentum id. Neque convallis a
        cras semper auctor neque vitae. Tristique et egestas quis ipsum
        suspendisse ultrices gravida dictum fusce. In aliquam sem fringilla ut
        morbi tincidunt augue interdum velit.
      </p>

      <hr />

      <h2>Related posts</h2>

      <ul className="blog-posts">
        {data.allYaml.edges
          .filter(({ node }) => node.Meta.Title !== data.yaml.Meta.Title)
          .slice(0, 3)
          .map(({ node }) => (
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
}

export default BlogPost

export const query = graphql`
  query BlogPostQuery($url: String) {
    yaml(fields: { url: { eq: $url } }) {
      Meta {
        Title
        Image {
          publicURL
        }
      }
    }
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
