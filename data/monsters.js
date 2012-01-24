module.exports = [
  { name: 'goblin'
  , level: '1d4'
  , ac: 7
  , maxHp: 4
  , str: '2d6+2'
  , con: '2d6+2'
  , dex: '2d6-1'
  , int: '1d6+4'
  , wis: '1d6+4'
  , cha: '1d6'
  , spawnProbability: 100
  , weapon: [ 'scimitar', 'club' ]
  , phrases: [ 'unghk!!!', 'ehrtoo!!' ]
  , symbol: { color: 'red', char: 'g' } }
, { name: 'mole'
  , level: '1d4'
  , ac: 10
  , maxHp: 2
  , str: '1d4'
  , con: '1d4'
  , dex: '1d6'
  , int: '1d4'
  , wis: '1d4'
  , cha: '1d6'
  , spawnProbability: 100
  , weapon: []
  , phrases: [ '*sqeak*' ] 
  , symbol: { color: 'blue', char: 'r' } }
, { level: '1d4+4'
  , name: 'ogre'
  , maxHp: 12
  , str: '1d6+12'
  , con: '1d6+12'
  , dex: '1d6+6'
  , int: '1d4+7'
  , wis: '1d4+7'
  , cha: '1d6'
  , spawnProbability: 80
  , weapon: [ 'club' ]
  , phrases: [ 'me smash!' ]
  , symbol: { color: 'magenta', char: 'o' } }
, { level: '25d4'
  , name: 'dragon'
  , maxHp: 40
  , str: '1d6+14'
  , con: '1d6+14'
  , dex: '1d6+10'
  , int: '1d6+12'
  , wis: '1d6+12'
  , cha: '1d6'
  , spawnProbability: 5
  , phrases: [ ]
  , symbol: { color: 'green', char: 'D' } }
]
