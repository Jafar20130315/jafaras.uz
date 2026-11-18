(function() {
    'use strict';

    function convertUzbekText(text) {
      return text
        .replace(/O['‘’]/g, 'Ö')
        .replace(/o['‘’]/g, 'ö')
        .replace(/G['‘’]/g, 'Ğ')
        .replace(/g['‘’]/g, 'ğ')
        .replace(/Sh/g, 'Ş')
        .replace(/SH/g, 'Ş')
        .replace(/sh/g, 'ş')
        .replace(/Ch/g, 'Ç')
        .replace(/CH/g, 'Ç')
        .replace(/ch/g, 'ç');
    }

    function applyNewAlphabet(rootElement) {
      const walker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            const parent = node.parentNode;
            if (parent && (
              parent.tagName === 'SCRIPT' || 
              parent.tagName === 'STYLE' || 
              parent.tagName === 'NOSCRIPT' ||
              parent.tagName === 'CODE' || 
              parent.tagName === 'PRE' ||
              parent.tagName === 'TEXTAREA'
            )) {
              return NodeFilter.FILTER_REJECT;
            }
            if (!node.nodeValue.trim()) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        },
        false
      );

      const nodesToChange = [];
      let currentNode;

      while ((currentNode = walker.nextNode())) {
        nodesToChange.push(currentNode);
      }

      let hasChanges = false;
      nodesToChange.forEach(node => {
        const newText = convertUzbekText(node.nodeValue);
        if (newText !== node.nodeValue) {
          node.nodeValue = newText;
          hasChanges = true;
        }
      });

      return hasChanges;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => applyNewAlphabet(document.body));
    } else {
      applyNewAlphabet(document.body);
    }
  })();
