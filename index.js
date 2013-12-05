module.exports = process.env.ENDIVE_COV ?
    require('./lib-cov/endive') :
    require('./lib/endive');