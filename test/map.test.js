var vows = require('vows')
  , assert = require('assert')
  , Map = require('../lib/map')

vows
  .describe('Map')

  .addBatch({
    'When I create a new Map': {
      topic: function() {
        var map = new Map(32, 24)

        return map
      }

    , 'THEN it should be created without error': function(map) {
        assert.ok(map instanceof Map) 
      }

    , 'AND it should have a width equivalent to what I provided in the constructor': function(map) {
        assert.equal(map.width, 32)
      }

    , 'AND the height should also be equivalent to what I provided in the constructor': function(map) {
        assert.equal(map.height, 24)
      }

    , 'AND all of the cells should be empty': function(map) {
        var found = 0

        for (var x = 0; x < 32; x++)
          for (var y = 0; y < 24; y++)
            found += map.isCellOccupied(x, y) ? 1 : 0    

        assert.equal(found, 0)
      }

    , 'AND checking for a cell occupied outside of the range should throw an error': function(map) {
        var error = null

        try {
          assert.throws(map.isCellOccupied(32, 23))
        } catch(e) {
          error = e
        } finally {
          assert.ok(error instanceof Error)
        }
      }
    }
  })

  .addBatch({
    'WHEN I have a map': {
      topic: function() {
        var map = new Map(16, 16)
        return map
      }

    , 'THEN I should be able to request the position in the map of a given x, y coordinate': function(map) {
        assert.equal(map.getCellPosition(0, 0), 0)
        assert.equal(map.getCellPosition(1, 1), 17)
        assert.equal(map.getCellPosition(14, 4), 78)
        assert.equal(map.getCellPosition(15, 15), 255)
      }

    , 'AND if I try to get the position of a cell outside of the range, it should throw an error': function(map) {
        var error = null

        try {
          assert.throws(map.getCellPosition(16, 16))
        } catch(e) {
          error = e
        } finally {
          assert.ok(error instanceof Error)
        }
      }

    , 'AND I should be able to get an X position from a cell position': function(map) {
        assert.equal(map.getXFromPosition(0), 0)
        assert.equal(map.getXFromPosition(15), 15)
        assert.equal(map.getXFromPosition(16), 0)
        assert.equal(map.getXFromPosition(255), 15)
        assert.equal(map.getXFromPosition(100), 4)
      }

    , 'AND I should be able to get a Y position from a cell position': function(map) {
        assert.equal(map.getYFromPosition(0), 0)
        assert.equal(map.getYFromPosition(15), 0)
        assert.equal(map.getYFromPosition(16), 1)
        assert.equal(map.getYFromPosition(255), 15)
        assert.equal(map.getYFromPosition(100), 6)
      }
    }
  })

  .addBatch({
    'WHEN I have a map containing an entity at position 6, 7': {
      topic: function() {
        var map = new Map(16, 16)
        map.addEntity({name: 'derrick'}, 6, 7)
        return map
      }

    , 'THEN I should be able to get the entity': function(map) {
        var entity = map.getEntity(6, 7)

        assert.equal(entity.name, 'derrick')
      }

    , 'AND if I try to get the entity of a cell outside of the range, it should throw an error': function(map) {
        var error = null

        try {
          assert.throws(map.getEntity(16, 16))
        } catch(e) {
          error = e
        } finally {
          assert.ok(error instanceof Error)
        }
      }

    , 'AND if I try to add a new entity over the same cell, it should throw an error': function(map) {
        var error = null

        try {
          assert.throws(map.addEntity({name: 'joe'}, 6, 7))
        } catch(e) {
          error = e
        } finally {
          assert.ok(error instanceof Error)
        }
      }

    , 'AND I should be able to move an entity': function(map) {
        var entity = map.getEntity(6, 7)

        assert.deepEqual(entity, {name: 'derrick'})

        map.moveEntity(entity, 1, 1)

        assert.equal(map.getEntity(6, 7), null)

        assert.equal(map.getEntity(7, 8), entity)

        map.moveEntity(entity, -1, -1)
      }

    , 'AND I should be able to remove the entity': function(map) {
        assert.deepEqual(map.getEntity(6, 7), {name: 'derrick'})

        map.removeEntity(6, 7)

        assert.equal(map.getEntity(6, 7), null)
      }

    , 'AND I should be able to remove an entity by object': function(map) {
        var entity = { name: 'joe' }
        map.addEntity(entity, 1, 1)
        map.removeEntity(entity)
        assert.equal(map.getEntity(1,1), null)
      }

    , 'AND if I try to move an invalid entity, it should throw an error': function(map) {
        var error = null

        try {
          map.moveEntity(null, 1, 1)
        } catch (e) {
          error = e
        } finally {
          assert.ok(error instanceof Error)
        }
      }
    }
  })

  .export(module)
