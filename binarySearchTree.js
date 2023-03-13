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
    let unique = [];
    array.forEach((element) => {
        if (!unique.includes(element)) {
            unique.push(element);
            }
    });
    return unique;

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
    }

    buildTree (array) {
        if (array.length == 0) return null;
        let sortedArray = array.sort(sortNumbers);
        sortedArray = removeDuplicates(sortedArray);
    
        const middle = Math.round((sortedArray.length-1)/2)
        if (sortedArray.length == 1) {
            return new Node(sortedArray[0]);
        } else if (sortedArray.length == 2) {
            return new Node(sortedArray[middle], this.buildTree(sortedArray.splice(0,middle)));
        } else if (sortedArray.length%2 == 0) {
            return new Node(sortedArray[middle], this.buildTree(sortedArray.splice(0,middle)), this.buildTree(sortedArray.splice(-middle+1)));
        } else {
            return new Node(sortedArray[middle], this.buildTree(sortedArray.splice(0,middle)), this.buildTree(sortedArray.splice(-middle)));
        }   
    }

    insert (value) {
        let currentNode = this.root;
        while (true) {
            if (value == currentNode.data) {
                console.error('duplicate value');
                return;
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
        if (this.root == null) return null;

        const queue = [];
        const result = [];

        let currentNode = this.root;

        while (queue.length != 0 || currentNode != null) {
            if (currentNode != null) {
                queue.push(currentNode);
                currentNode = currentNode.left;
            } else {
                currentNode = queue.pop();
                result.push(func(currentNode.data));
                currentNode  = currentNode.right;
            }
        }
        return result;
    }

    preorder (func = num => {return num}) {
        if (this.root == null) return null;

        const queue = [];
        const result = [];

        let currentNode = this.root;
        queue.push(currentNode);

        while (queue.length != 0) {
            currentNode = queue.pop();
            result.push(func(currentNode.data));

            if (currentNode.right != null) {
                queue.push(currentNode.right);
            }
            if (currentNode.left != null) {
                queue.push(currentNode.left);
            }
            
        }
        return result;
    }

    postorder (func = num => {return num}) {
        if (this.root == null) return null;

        const queue = [];
        const result = [];

        let currentNode = this.root;
        let recentNode = new Node();

        while (queue.length != 0 || currentNode != null) {
            if (currentNode != null) {
                queue.push(currentNode);
                currentNode = currentNode.left;
            } else {
                currentNode = queue.pop();
                if (currentNode.right != null && recentNode != currentNode.right) {
                    queue.push(currentNode);
                    currentNode = currentNode.right;
                } else {
                    result.push(func(currentNode.data));
                    recentNode = currentNode;
                    currentNode = null;
                }
            }
        }
        return result;
    }

    height (node) {
        if (node == null) return 0;
        
        const lefth = this.height(node.left);
        const righth = this.height(node.right);

        if (lefth > righth) {
            return lefth +1;
        } else {
            return righth + 1;
        }

        
    }

    depth (node) {
        return this.findDepth(this.root, node.data);
    }

    findDepth (node, x) {
        if (node.data == x) return 0;
        const lefth = this.height(node.left);
        const righth = this.height(node.right);

        if (lefth > righth) {
            return lefth +1;
        } else {
            return righth + 1;
        }
    }

    isBalanced () {
        if (Math.abs(this.height(this.root.left) - this.height(this.root.right)) <= 1) {
            return true;
        } else {
            return false;
        }
    }

    rebalance() {
        const array = this.inorder();
        console.log(array);
        this.root = this.buildTree(array);
    }
}


const array = [];
for (let i = 0; i < 20; i++) {
    array.push(Math.floor(Math.random()*100))
}
const tree = new Tree(array);
console.log(`initial: ${tree.isBalanced()}`);
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
for (let i = 0; i < 10; i++) {
    tree.insert(Math.floor(Math.random()*100) + 100);
}
console.log(`before balancing: ${tree.isBalanced()}`);
tree.rebalance();
console.log(`after balancing: ${tree.isBalanced()}`);
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());