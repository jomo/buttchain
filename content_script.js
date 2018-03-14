'use strict';

function walk(node) {
  // I stole this function from here:
  // http://is.gd/mwZp7E

  var child, next;

  if (node.nodeType == Node.ELEMENT_NODE && (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea' || node.classList.contains('ace_editor'))) {
    return;
  }

  switch (node.nodeType) {
  case 1: // Element
  case 9: // Document
  case 11: // Document fragment
    child = node.firstChild;
    while (child) {
      next = child.nextSibling;
      walk(child);
      child = next;
    }
    break;

  case 3: // Text node
    handleText(node);
    break;
  default:
    break;
  }
}

function handleText(textNode) {
  var v = textNode.nodeValue;
  v = v.replace(/([bB])l[o0]ck(.{0,5})([Cc][Hh][Aa][Ii][Nn])/g, '$1utt$2$3');
  v = v.replace(/([bB])L[O0]CK(.{0,5})([Cc][Hh][Aa][Ii][Nn])/g, '$1UTT$2$3');
  v = v.replace(/([bB])it(.?)([Cc][O0o][Ii][Nn])/g, '$1utt$2$3');
  v = v.replace(/([bB])IT(.?)([Cc][O0o][Ii][Nn])/g, '$1utt$2$3');
  textNode.nodeValue = v;
}

walk(document.body);