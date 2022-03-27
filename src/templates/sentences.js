const m = require("mithril/hyperscript");
const Helpers = require("../helpers");

module.exports = function(input) {
  let sentences = input.sentences;
  let info = input.info;
  let limit = input.limit;
  let maxSentences = 100;
  let maxDepth = 100;

  let result = [];

  result.push(m("h1", "Example Sentences"));

  function onCalculate() {
    input.onCalculate({ maxSentences, maxDepth })
  }

  function onMaxDepthChange(e) {
    maxDepth = e.target.valueAsNumber;
  }

  function onMaxSentencesChange(e) {
    maxSentences = e.target.valueAsNumber;
  }

  let labelStyle = { marginRight: '10px' }

  let labelTextStyle = { marginRight: '5px' }

  result.push(m('label', {style: labelStyle}, [
    m("span", {style: labelTextStyle}, "Max depth"),
    m("input", {type: 'number', placeholder: 'Max depth', onchange: onMaxDepthChange})
  ]));
  result.push(m('label', {style: labelStyle}, [
    m("span", {style: labelTextStyle}, "Max sentences"),
    m("input", {type: 'number', placeholder: 'Max sentences', onchange: onMaxSentencesChange})
  ]));
  result.push(m("button", {onclick: onCalculate}, 'Calculate'));

  if (sentences.length > 0) {
    result.push(
      m("ul.symbols",
        sentences.slice(0, limit).map(function(sentence) {
          return m("li", {style: {whiteSpace: 'nowrap'}}, Helpers.formatSentence(sentence, info));
        })
      )
    );

    if (sentences.length > limit) {
      result.push(m("p", m("a", { href: "#/sentences" }, "More example sentences")));
    }
  } else {
    result.push(m("p", "No example sentences could be generated."));
  }

  return result;
}
