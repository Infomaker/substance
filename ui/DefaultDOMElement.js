'use strict';

var inBrowser = require('../util/inBrowser');

var DOMElementImpl;

if (inBrowser) {
  DOMElementImpl = require('./BrowserDOMElement.js');
} else {
  DOMElementImpl = require('./CheerioDOMElement.js');
}

var DefaultDOMElement = {};

DefaultDOMElement.createTextNode = function(text) {
  return DOMElementImpl.createTextNode(text);
};

DefaultDOMElement.createElement = function(tagName) {
  return DOMElementImpl.createElement(tagName);
};

DefaultDOMElement._create = function(el) {
  return new DOMElementImpl(el);
};

/*
  A wrapper for Browser's `window` providing
  the DOMElement's eventlistener API.
*/
DefaultDOMElement.getBrowserWindow = function() {
  if (inBrowser) {
    return DOMElementImpl.getBrowserWindow();
  } else {
    // just a stub if not in browser
    return DefaultDOMElement.createElement('div');
  }
};

/*
  @param {String} html
  @returns {DOMElement|DOMElement[]}
*/
DefaultDOMElement.parseHTML = function(html) {
  return DOMElementImpl.parseMarkup(html, 'html');
};

/*
  @param {String} xml
  @returns {DOMElement|DOMElement[]}
*/
DefaultDOMElement.parseXML = function(xml, fullDoc) {
  return DOMElementImpl.parseMarkup(xml, 'xml', fullDoc);
};

DefaultDOMElement.wrapNativeElement = function(el) {
  if (el) {
    if (inBrowser && (el instanceof window.Node || el === window) ) {
      return DOMElementImpl.wrapNativeElement(el);
    } else if (el.root && el.root.type === "root" ) {
      return DOMElementImpl.wrapNativeElement(el);
    }
  } else {
    return null;
  }
};

DefaultDOMElement.isReverse = function(anchorNode, anchorOffset, focusNode, focusOffset) {
  if (inBrowser ) {
    return DOMElementImpl.isReverse(anchorNode, anchorOffset, focusNode, focusOffset);
  } else {
    throw new Error('Not implemented.');
  }
};

module.exports = DefaultDOMElement;
