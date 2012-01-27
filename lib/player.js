(function() {
  var Player = function(startX, startY, baseViewRadius) {
    var x = startX
      , y = startY
      , viewRadius = baseViewRadius

    this.getViewRadius = function() {
      return viewRadius
    }

    this.getPosition = function() {
      return { x: x, y: y }
    }

    this.setPosition = function(nx, ny) {
      x = nx;
      y = ny;
    }
  }

  function playerFactory(startX, startY, baseViewRadius) {
    return new Player(startX, startY, baseViewRadius)
  }

  module.exports = { factory: playerFactory }
})()
