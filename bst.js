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
}

export { Tree };
