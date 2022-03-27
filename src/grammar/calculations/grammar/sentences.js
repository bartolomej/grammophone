// Given a "sentence node" and a grammar, expand the sentence's first
// realizable nonterminal and return the resulting list of sentence nodes
// (which may be empty).
//
// Each sentence node's "step" member is incremented and its "nonterminals"
// member adjusted.

function expandSentenceNode(node, grammar) {

  var i, j, k;
  var expanded = [];
  var nonterminals = grammar.calculate("grammar.nonterminals");
  var unrealizable = grammar.calculate("grammar.unrealizable");
  var replacement, nonterminalCount;

  // expand the first realizable nonterminal.

  for (i = 0; i < node.sentence.length; i++) {

    if (nonterminals.has(node.sentence[i]) && !unrealizable.has(node.sentence[i])) {

      for (j = 0; j < grammar.productions.length; j++) {

        if (grammar.productions[j][0] === node.sentence[i]) {

          replacement = grammar.productions[j].slice(1);
          nonterminalCount = 0;

          for (k = 0; k < replacement.length; k++) {
            if (nonterminals.has(replacement[k])) {
              nonterminalCount++;
            }
          }

          expanded.push({
            sentence: node.sentence.slice(0, i).concat(replacement).concat(node.sentence.slice(i+1)),
            steps: node.steps + 1,
            nonterminals: node.nonterminals - 1 + nonterminalCount
          });

        }

      }

      break;

    }

  }

  return expanded;

}

module.exports = function(grammar, input = {}) {
  let params = {
    maxSentences: 100,
    maxDepth: 200,
  };

  if (input.maxSentences) {
    params.maxSentences = input.maxSentences;
  }
  if (input.maxDepth) {
    params.maxDepth = input.maxDepth;
  }


  var start = grammar.calculate("grammar.start");

  var i;
  var sentences = [];
  var queue = [{ sentence: [start], steps: 0, nonterminals: 1 }];
  var node;
  var expanded;

  do {

    node = queue.shift();
    expanded = expandSentenceNode(node, grammar);

    for (i = 0; i < expanded.length; i++) {

      if (expanded[i].nonterminals === 0) {
        sentences.push(expanded[i].sentence);
      } else {
        queue.push(expanded[i]);
      }

      if (sentences.length >= params.maxSentences) {
        break;
      }

    }

    // Sort the queue so that the next sentence is the one with the
    // fewest nonterminals and steps.

    queue = queue.sort(function(a, b) {
      return (a.nonterminals + a.steps) - (b.nonterminals + b.steps);
    });

  } while (queue.length > 0 && sentences.length < params.maxSentences && queue.length < params.maxDepth);

  return sentences.sort(function(a, b) {
    if (a.length === b.length) {
      return a < b;
    } else {
      return a.length - b.length;
    }
  });

};
