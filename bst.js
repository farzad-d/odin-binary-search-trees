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

  checkBalance(node) {
    if (!node) return 0;

    // A: Recursively check the left subtree and get its height
    // B: If the left subtree is already unbalanced, it returns -1,
    // we immediately propagate this -1 upwards to signal that the tree
    // is unbalanced, so no further checks are needed for this branch
    const leftHeight = this.checkBalance(node.left); // <--- A
    if (leftHeight === -1) return -1; // <--- B

    const rightHeight = this.checkBalance(node.right); // <--- A
    if (rightHeight === -1) return -1; // <--- B

    // If the current node is unbalanced (height difference > 1), return -1;
    // otherwise, return this node's height
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;
    return 1 + Math.max(leftHeight, rightHeight);
  }

  isBalanced(node = this.root) {
    return this.checkBalance(node) !== -1;
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

  levelOrderForEach(callback) {
    if (!callback) throw new Error("A callback function is required.");
    if (!this.root) return this;

    const q = [this.root];

    for (const node of q) {
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
      callback(node);
    }

    return this;
  }

  // Recursive version
  /*   levelOrderForEach(callback, q = [this.root], i = 0) {
    if (!callback) throw new Error("A callback function is required.");
    if (!q[0]) return this;
    if (i === q.length) return this;

    const node = q[i];
    callback(node);

    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
    return this.levelOrderForEach(callback, q, i + 1);
  } */

  inOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("A callback function is required.");
    if (!node) return this;

    if (node.left) this.inOrderForEach(callback, node.left);
    callback(node);
    if (node.right) this.inOrderForEach(callback, node.right);

    return this;
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("A callback function is required.");
    if (!node) return this;

    callback(node);
    if (node.left) this.preOrderForEach(callback, node.left);
    if (node.right) this.preOrderForEach(callback, node.right);

    return this;
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("A callback function is required.");
    if (!node) return this;

    if (node.left) this.postOrderForEach(callback, node.left);
    if (node.right) this.postOrderForEach(callback, node.right);
    callback(node);

    return this;
  }

  height(value) {
    const node = this.find(value);
    if (!node) return null;
    return this._height(node);
  }

  _height(node) {
    if (!node) return -1;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  depth(value) {
    const d = this._depth(value, this.root);
    return d === -1 ? null : d;
  }

  _depth(value, node) {
    if (!node) return -1;
    if (value === node.data) return 0;

    const next = value < node.data ? node.left : node.right;
    const subDepth = this._depth(value, next);

    // If the value wasn't found in this subtree, bubble up -1,
    // otherwise add 1 to count the edge while unwinding recursion
    return subDepth === -1 ? -1 : subDepth + 1;
  }
}

export { Tree };
