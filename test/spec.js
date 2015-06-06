'use strict';

/* global beforeEach, afterEach */

var browserify = require('browserify');
var fs = require('fs');
var html2jsify = require('..');
require('chai').should();

describe('html2jsify', function () {
  beforeEach(function (done) {
    fs.writeFile(__dirname + '/testFile.js', "var html = require('./testFile.html');result(html);", function (error) {
      if (error) done(error);

      fs.writeFile(__dirname + '/testFile.html', "<div class=\"bada\"><h1 class='bing'>dude!</h1></div>", function (error) {
        if (error) done(error);

        done();
      });
    });
  });

  afterEach(function (done) {
    fs.unlink(__dirname + '/testFile.js', function () {
      fs.unlink(__dirname + '/testFile.html', function () {
        done();
      });
    });
  });

  it('converts html into js', function (done) {
    var b = browserify(__dirname + '/testFile.js');
    b.transform(html2jsify);
    b.bundle({}, function (error, bundle) {
      if (error) {
        done(error);
      } else {
        // FIXME: ...shudder...
        var document = {
          createElement: function() {
            var mock = {
              children: [{}],
              firstChild: function() {
                return {
                  outerHTML: mock.innerHTML
                }
              }
            }

            return mock
          }
        }

        function result(html) {
          html()().outerHTML.should.equal("<div class=\"bada\"><h1 class='bing'>dude!</h1></div>");
          done();
        }

        var f = eval(bundle);
      }
    });
  });
});
