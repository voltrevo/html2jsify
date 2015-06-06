'use strict'

var parse = function(htmlStr) {
  var container = document.createElement('div')

  container.innerHTML = htmlStr

  if (container.children.length !== 1) {
    throw new Error(
      container.children.length +
      ' nodes in browserified html file FILE_REPLACE_TAG (needs to be just 1)'
    )
  }

  return container.firstChild
}

module.exports = function() {
  return parse(
    'CONTENT_REPLACE_TAG'
  )
}
