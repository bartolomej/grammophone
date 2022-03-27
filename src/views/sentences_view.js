const render = require("mithril/render");
const template = require("../templates/sentences");

module.exports = class SentencesView {
  constructor(element) {
    this._element = element;
  }

  setDelegate(delegate) {
    this._delegate = delegate;
  }

  reload(params = {}) {
    window.console.log("reloading with params: ", params)
    let vnode = template({
      sentences: this._delegate.getCalculation("grammar.sentences", params),
      info: this._delegate.getCalculation("grammar.symbolInfo"),
      onCalculate: (params) => this.reload(params)
    });

    render(this._element, vnode);
  }
}
