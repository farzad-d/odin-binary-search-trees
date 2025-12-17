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

function generateRandomNumbers(n) {
  const numbers = [];
  for (let i = 0; i < n; i++) numbers.push(Math.floor(Math.random() * 101));
  return numbers;
}

const sampleArray = generateRandomNumbers(20);
const tree = new Tree(sampleArray);

// tree.insert(320);
// console.log(tree.find(9));
// tree.deleteItem(324);
// tree.levelOrderForEach((n) => console.log(n.data));
// tree.inOrderForEach((n) => console.log(n.data));
// tree.preOrderForEach((n) => console.log(n.data));
// tree.postOrderForEach((n) => console.log(n.data));
// console.log(tree.height(8));
// console.log(tree.depth(5));
// console.log(tree.isBalanced());
// tree.rebalance();

prettyPrint(tree.root);
