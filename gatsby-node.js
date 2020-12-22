/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions

  createFieldExtension({
    name: "fileBySrcPath",
    extend: () => ({
      resolve: function (src, args, context, info) {
        const { fieldName } = info
        const partialPath = src[fieldName]

        if (!partialPath) {
          return null
        }

        const filePath = path.join(__dirname, "./data/", partialPath)

        const fileNode = context.nodeModel.runQuery({
          firstOnly: true,
          type: "File",
          query: {
            filter: {
              absolutePath: {
                eq: filePath,
              },
            },
          },
        })

        if (!fileNode) {
          return null
        }

        return fileNode
      },
    }),
  })

  const typeDefs = `
    type YamlMeta @infer {
      Image: File @fileBySrcPath
    }

    type Yaml implements Node @infer {
      Meta: YamlMeta
    }
  `

  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const fileNode = getNode(node.parent)

  if (node.internal.type === `Yaml` && fileNode.base === "index.yaml") {
    const url = createFilePath({ node, getNode })

    const templates = ["BlogPost"]
    const layout = templates.filter(template =>
      Object.keys(node).includes(template)
    )[0]

    if (!layout) return

    createNodeField({
      node,
      name: `url`,
      value: url,
    })

    createNodeField({
      node,
      name: `layout`,
      value: layout,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    {
      allYaml {
        edges {
          node {
            fields {
              url
              layout
            }
          }
        }
      }
    }
  `)

  data.allYaml.edges.forEach(({ node }) => {
    if (!node.fields) return

    createPage({
      path: node.fields.url,
      component: path.resolve(`src/templates/${node.fields.layout}.js`),
      context: {
        url: node.fields.url,
      },
    })
  })
}
