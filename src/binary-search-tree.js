const {
  Node
} = require('../extensions/list-tree.js');
module.exports = class BinarySearchTree {

  constructor() {
    this.rootTree = null;
  }
  root() {
    return this.rootTree;
  }
  add(data) {
    this.rootTree = addElement(this.rootTree, data);

    function addElement(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addElement(node.left, data);
      } else {
        node.right = addElement(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    function searchElement(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      if (data < node.data) {
        return searchElement(node.left, data);
      } else {
        return searchElement(node.right, data);
      }
    }
    return searchElement(this.rootTree, data);
  }

  find(data) {
    function searchElement(node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      return data < node.data ?
        searchElement(node.left, data) :
        searchElement(node.right, data);
    }
    return searchElement(this.rootTree, data);
  }

  remove(data) {
    this.rootTree = removeNode(this.rootTree, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    }
  }
  min() {
    if (!this.rootTree) {
      return null;
    }
    let node = this.rootTree;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }
  max() {
    if (!this.rootTree) {
      return null;
    }
    let node = this.rootTree;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}