var rand = require('./math').rand

var roll = (function() {
  function roll(count, sides, modifier) {
    var sum = modifier

    for (var i = 0; i < count; i++) {
      sum = sum + rand(sides) + 1
    }

    return sum
  }

  return function(spec) {
    var count
      , sides
      , modifier
      , diceRegex = /([0-9]+)d([0-9]+)([\-\+][0-9]+){0,1}/g
      , parts = diceRegex.exec(spec)

    if (parts == null) throw new Error('Unknown dice format: ' + spec)

    count = parts[1]
    sides = parts[2]
    modifier = typeof parts[3] != 'undefined' ? parseInt(parts[3]) : 0

    return roll(count, sides, modifier)
  }
})()

exports.roll = roll
