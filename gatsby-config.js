module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: "Yaml",
      },
    },
  ],
}
