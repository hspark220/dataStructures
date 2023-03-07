class Node {
    constructor (value = null, rightChild = null, leftChild = null) {
        this.value = value;
        this.rightChild = rightChild;
        this.leftChild = leftChild;
    }
}

function sortNumbers(a, b) {
    if (a > b) {
      return 1;
    } else if (b > a) {
      return -1;
    } else {
      return 0;
    }
}

function removeDuplicates(array) {
    return array.filter((item,
        index) => array.indexOf(item) === index);
}

class Tree {
    constructor (array) {
        //this.root = buildTree(array);
    }

    buildTree (array) {
        array.sort(sortNumbers);
        array = removeDuplicates(array);
        console.log(array);
    }
}


let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
tree.buildTree(array);