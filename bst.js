class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.sortedArray = [...new Set(arr.sort((a, b) => a - b))];
    this.root = this.buildTree(this.sortedArray);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  inOrder(node = this.root, result = []) {
    if (!node) return result;

    this.inOrder(node.left, result);
    result.push(node.data);
    this.inOrder(node.right, result);

    return result;
  }

  rebalance() {
    const values = this.inOrder();
    this.root = this.buildTree(values);
  }

  insert(value, currNode = this.root) {
    if (!currNode) {
      this.root = new Node(value);
      return;
    }

    if (value < currNode.data) {
      currNode.left
        ? this.insert(value, currNode.left)
        : (currNode.left = new Node(value));
    } else if (value > currNode.data) {
      currNode.right
        ? this.insert(value, currNode.right)
        : (currNode.right = new Node(value));
    } else {
      console.log("Value already exists.");
    }
  }

  find(value, currNode = this.root) {
    if (!currNode) return null;
    if (value === currNode.data) return currNode;

    return value < currNode.data
      ? this.find(value, currNode.left)
      : this.find(value, currNode.right);
  }

  findNodeWithParent(value, currNode = this.root, parent = null) {
    if (!currNode) return null;
    if (value === currNode.data) return { node: currNode, parent };

    return value < currNode.data
      ? this.findNodeWithParent(value, currNode.left, currNode)
      : this.findNodeWithParent(value, currNode.right, currNode);
  }

  deleteItem(value) {
    const target = this.findNodeWithParent(value);
    if (!target) return;

    const node = target.node;
    const parent = target.parent;

    const getSuccessor = () => {
      if (node.left && !node.right) return node.left;
      if (!node.left && node.right) return node.right;

      if (node.left && node.right) {
        let currNode = node.right;
        let prevNode = node;

        while (currNode.left) {
          prevNode = currNode;
          currNode = currNode.left;
        }

        prevNode === node.right
          ? (prevNode.left = currNode.right)
          : (node.right = currNode.right);
        currNode.right = node.right;
        currNode.left = node.left;

        return currNode;
      }

      return null;
    };

    const linkParentToSuccessor = (successor) => {
      if (!parent) {
        this.root = successor;
        return;
      }

      node.data < parent.data
        ? (parent.left = successor)
        : (parent.right = successor);
    };

    linkParentToSuccessor(getSuccessor());
  }
}

export { Tree };
