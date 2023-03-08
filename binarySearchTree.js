class Node {
    constructor (data = null, left = null, right = null) {
        this.data = data;
        this.right = right;
        this.left = left;
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
    return [...new Set(array)];
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}


class Tree {
    constructor (array) {
        this.root = this.buildTree(array);
        prettyPrint(this.root);
    }

    buildTree (array) {
        if (array.length == 0) return null;
        array.sort(sortNumbers);
        array = removeDuplicates(array);
    
        const middle = Math.round((array.length-1)/2)
        if (array.length == 1) {
            return new Node(array[0]);
        } else if (array.length ==2) {
            return new Node(array[middle], this.buildTree(array.splice(0,middle)));
        }
        else {
            return new Node(array[middle], this.buildTree(array.splice(0,middle)), this.buildTree(array.splice(-middle)));
        }   
    }

    insert (value) {
        let currentNode = this.root;
        while (true) {
            if (value == currentNode.data) {
                console.error('duplicate value');
            } else if (value > currentNode.data) {
                if (currentNode.right == null) {
                    currentNode.right = new Node(value);
                    break;
                } else {
                    currentNode = currentNode.right;
                }
            } else if (value < currentNode.data) {
                if (currentNode.left == null) {
                    currentNode.left = new Node(value);
                    break;
                } else {
                    currentNode = currentNode.left;
                }
            }
        }
        
    }

    delete (value, node = this.root) {
        if (this.root == null) return this.root;
        if (value < node.data) {
            node.left = this.delete(value, node.left);
        } else if (value > node.data) {
            node.right = this.delete(value, node.right);
        } else {
            if(node.left == null) {
                return node.right;
            } else if (node.right == null) {
                return node.left
            } else {
                node.data =  this.minValue(node.right)
                node.right = this.delete(node.data, node.right);
            }
        }
        return node;
    }

    minValue (node) {
        if (node.left == null && node.right == null) {
            const tempData = node.data;
            return tempData;
        } else if (node.left == null) {
            return this.minValue(node.right);
        } else {
            return this.minValue(node.left);
        } 
    }

    find (value) {
        let currentNode = this.root;
        while (currentNode != null) {
            if (value < currentNode.data) {
                currentNode = currentNode.left;
            } else if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                return currentNode;
            }
        }
        return null;
    }

    levelOrder (func = num => {return num} ) {
        if (this.root == null) return null;

        const queue = [];
        const result = [];
        let currentNode = this.root;
        queue.push(currentNode);
        result.push(func(currentNode.data));
        while (queue.length != 0) {
            currentNode = queue.pop();
            console.log(currentNode.data);
            
            if (currentNode.left != null) {
                queue.unshift(currentNode.left);
                result.push(func(currentNode.left.data))
            }
            if (currentNode.right != null) {
                queue.unshift(currentNode.right);
                result.push(func(currentNode.right.data));
            }
        }
        return result;
    }

    inorder (func = num => {return num}) {

    }

    preorder (func = num => {return num}) {

    }

    postorder (func = num => {return num}) {

    }


}



let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
tree.insert(2)
tree.delete(67);
prettyPrint(tree.root);
console.log(tree.levelOrder(add= num => {return num+1}));
