import { Tree } from "./bst.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const sampleArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(sampleArray);

// tree.insert(320);
// tree.rebalance();
// console.log(tree.find(9));
// tree.deleteItem(324);
// tree.levelOrderForEach((n) => (n.data *= 2));
// tree.inOrderForEach((n) => (n.data *= 2));
// tree.preOrderForEach((n) => (n.data *= 2));
// tree.postOrderForEach((n) => (n.data *= 2));
// console.log(tree.height(8));
// console.log(tree.depth(5));
// console.log(tree.isBalanced());

prettyPrint(tree.root);
