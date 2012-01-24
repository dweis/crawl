module.exports = {
  color: {
    reset       : '\x1B[0m'
  , clear       : '\x1B[2J'
  , grey        : '\x1B[0;30m'
  , red         : '\x1B[0;31m'
  , green       : '\x1B[0;32m'
  , yellow      : '\x1B[0;33m'
  , blue        : '\x1B[0;34m'
  , magenta     : '\x1B[0;35m'
  , cyan        : '\x1B[0;36m'
  , white       : '\x1B[0;37m'
  , boldgrey    : '\x1B[1;30m'
  , boldred     : '\x1B[1;31m'
  , boldgreen   : '\x1B[1;32m'
  , boldyellow  : '\x1B[1;33m'
  , boldblue    : '\x1B[1;34m'
  , boldmagenta : '\x1B[1;35m'
  , boldcyan    : '\x1B[1;36m'
  , boldwhite   : '\x1B[1;37m' }

, write: function(color, text) {
    process.stdout.write(color + text + this.color.reset)
  }

, clear: function() {
    process.stdout.write(this.color.clear)
  }
}

