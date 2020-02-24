const React = require("react")

exports.onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  { apiKey, indexName, debug = false }
) => {
  setHeadComponents([
    <link
      key="docsearch-css"
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
    />,
  ])

  setPostBodyComponents([
    <script
      key="docsearch-js"
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
    />,
    <script
      key="docsearch-settings"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `window.docsearchSettings = {
          apiKey: "${apiKey}", indexName: "${indexName}", debug: ${debug}}`,
      }}
    />,
  ])
}
