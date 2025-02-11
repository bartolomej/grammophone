const render = require("mithril/render");
const template = require("../templates/parsing");

module.exports = class ParsingView {
  constructor(element) {
    this._element = element;
  }

  setDelegate(delegate) {
    this._delegate = delegate;
  }

  reload() {
    let vnode = template({
      classification: this._delegate.getCalculation("grammar.classification")
    });

    render(this._element, vnode);
  }
}
