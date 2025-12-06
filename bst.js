class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

//? [0, 1, 2, 3, 4, 5, 6,  7,  8,  9,   10 ]
//* [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345];

class Tree {
  constructor(arr) {
    this.sortedArray = [...new Set(arr.sort((a, b) => a - b))];
    this._root = this.buildTree(this.sortedArray);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  get root() {
    return this._root;
  }
}

export { Tree };
