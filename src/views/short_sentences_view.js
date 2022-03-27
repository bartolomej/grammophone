const render = require("mithril/render");
const template = require("../templates/sentences");

module.exports = class ShortSentencesView {
  constructor(element) {
    this._element = element;
  }

  setDelegate(delegate) {
    this._delegate = delegate;
  }

  reload(params = {}) {
    let vnode = template({
      sentences: this._delegate.getCalculation("grammar.sentences", params),
      info: this._delegate.getCalculation("grammar.symbolInfo"),
      onCalculate: (params) => this.reload(params),
      limit: 10
    });

    render(this._element, vnode);
  }
}
