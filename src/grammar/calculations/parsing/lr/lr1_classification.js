var classifyLR1 = require("./helpers").classifyLR1;

module.exports = function(grammar) {

  return classifyLR1(grammar.calculate("parsing.lr.lr1_table"));

}
