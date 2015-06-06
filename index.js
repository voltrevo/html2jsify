'use strict'

var fs = require('fs')
var path = require('path')
var through = require('through')

var template = fs.readFileSync(__dirname + '/template.js').toString()

var isHtml = function(file) {
  return /\.html$/.test(file)
}

var escapeContent = function(content) {
  return content.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'')
}

var html2js = function(file, content) {
  return (template
    .replace('FILE_REPLACE_TAG', file)
    .replace('CONTENT_REPLACE_TAG', escapeContent(content))
  )
}

module.exports = function(file) {
  if (!isHtml(file)) {
    return through()
  }

  var data = ''

  return through(
    function write(buf) {
      data += buf
    },
    function end() {
      var content
      var src

      try {
        content = fs.readFileSync(file, 'utf-8')
        src = html2js(path.basename(file), content)
      } catch (error) {
        this.emit('error', error)
      }

      this.queue(src)
      this.queue(null)
    }
  )
}
