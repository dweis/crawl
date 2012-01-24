var _ = require('underscore')
  , directions = require('./directions')
  , rand = require('./math').rand
  , roll = require('./dice').roll

var monsterFactory = (function() {
  var diceProperties = [ 'level', 'str', 'con', 'dex', 'int', 'wis', 'cha' ]

  function Monster(properties) {
    for (idx in properties) {
      this.setProperty(idx, properties[idx])
    }
  }

  Monster.prototype.setProperty = function(property, value) {
    if (property == 'maxHp')
      this.curHp = value

    this[property] = value
  }

  Monster.prototype.speak = function() {
    if (this.phrases.length)
      return this.phrases[rand(this.phrases.length)]
  }

  Monster.prototype.attack = function(target, callback) {
    var weaponDice = '1d4'
      , damage = Math.round(roll(weaponDice) * Math.sqrt(this.str) + Math.sqrt((this.level * Math.sqrt(this.str))))
    target.attacked(damage, callback)
  }

  Monster.prototype.attacked = function(damage, callback) {
    this.curHp -= damage
    callback(damage, this.curHp > 0 ? false : true)
  }

  Monster.prototype.update = function(world, view, callback) {
    var direction = view.moves[rand(view.moves.length)]
      , x = directions.directionToX(direction)
      , y = directions.directionToY(direction)

    if (rand(20) == 1 && this.phrases.length)
      world.log(this.name + ': ' + this.speak())

    if (view.targets.length) {
      // todo: move into callback
      var _this = this
      this.attack(view.targets[0], function(damage, dead) {
        world.log(_this.name + ' hits ' + view.targets[0].name + ' with ' + _this.weapon.name + ' for ' + damage + ' damage ' + (dead ? '(killed)' : ''))
        if (dead)
          world.getMap().removeEntity(view.targets[0])
      })
    } else {
      callback('move', { entity: this, x: x, y: y })
    }
  }

  function rollDiceFor(spec, prop) {
    return roll(spec[prop])
  }

  function create(spec, data) {
    var params = {} 

    params.name = spec.name
    params.ac = spec.ac

    _.each(diceProperties, function(v, k) {
      params[v] = rollDiceFor(spec, v) 
    })

    params.phrases = spec.phrases
    params.symbol = spec.symbol

    if (!spec.weapon || !spec.weapon.length || spec.weapon[0] == 'none')
      params.weapon = { name: 'Unarmed', type: 'weapon', damage: '1d4-1' }
    else
      params.weapon = data.items[spec.weapon[rand(spec.weapon.length)]]

    params.maxHp = spec.maxHp
    for (var i = 1; i < params.level; i++) {
      params.curHp = params.maxHp += rand(Math.round(Math.sqrt(params.level * params.con)))
    }

    return new Monster(params)
  }

  return function(spec, data) {
    return create(spec, data)
  }
})()

exports.factory = monsterFactory
