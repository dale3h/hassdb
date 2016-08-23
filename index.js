#!/usr/bin/env node

'use strict'

var fs = require('fs')
var path = require('path')
var parse = require('loose-json')
var low = require('lowdb')
var db = low('home-assistant.json')

var args = process.argv.slice(2)

var key = args[0]
var value = args[1]

if ('undefined' === typeof key || !key) {
  // Credit to yargs <https://github.com/yargs/yargs>
  var $0 = process.argv
    .slice(0, 2)
    .map(function (x, i) {
      // Ignore the node bin, specify this in your
      // bin file with #!/usr/bin/env node
      if (i === 0 && /\b(node|iojs)(\.exe)?$/.test(x)) return
      var b = path.relative(process.cwd(), x)
      return x.match(/^(\/|([a-zA-Z]:)?\\)/) && b.length < x.length ? b : x
    })
    .join(' ').trim()

  if (process.env._ !== undefined && process.argv[1] === process.env._) {
    $0 = process.env._.replace(
      path.dirname(process.execPath) + '/', ''
    )
  }

  console.log('usage: %s <key> [value]', $0)
  return
}

var result

if ('undefined' === typeof value) {
  // Read from db
  result = db.get(key).value()
} else {
  // Write to db
  try {
    var json = parse(value.replace(/: (True|False)[,}]/g, function(match) {
      return match.toLowerCase()
    }))

    value = json
  } catch (ex) {
    // It was not parsable JSON
  }

  result = db.set(key, value).value()
}

if ('undefined' === typeof result) {
  result = ''
}

console.log(result)
