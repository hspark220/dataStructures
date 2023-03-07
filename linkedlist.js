class Node {
    constructor (value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor (head = null) {
        this.head = head;
        this.tail = null;
        this.size = head==null ? 0 : 1;
    }

    append (value) {
        const newNode = new Node(value);
        const oldTail = this.tail;
        if (this.size > 1) {
            oldTail.nextNode = newNode;
            this.tail = newNode;
        } else {
            this.head.nextNode = newNode;
            this.tail = newNode;
        }
        this.size += 1;
    }

    prepend (value) {
        const newNode = new Node(value);
        const oldHead = this.head;
        newNode.nextNode = oldHead;
        this.head = newNode;
        if (this.size == 1) this.tail = oldHead;
        this.size += 1;
    }

    size () {
        return this.size;
    }

    head() {
        return this.head;
    }

    tail() {
        return this.tail;
    }

    pop() {
        let currentNode = this.head;
        while(currentNode.nextNode.value != null) {
            if (currentNode.nextNode.nextNode == null) {
                currentNode.nextNode = null;
                this.tail = currentNode;
                break;
            }
            currentNode = currentNode.nextNode;
        }
        this.size -= 1;
    }

    contains (value) {
        let currentNode = this.head;
        while (currentNode != null) {
            if (currentNode.value == value) return true
            currentNode = currentNode.nextNode;
        }
        return false;
    }

    find (value) {
        let currentNode = this.head;
        while (currentNode != null) {
            if (currentNode.value == value) return currentNode;
            currentNode = currentNode.nextNode;
        }
        return null;
    }

    toString () {
        let currentNode = this.head;
        let result = '';

        while (currentNode != null) {
            result = currentNode.nextNode ==null ? result.concat(`${currentNode.value} `) : result.concat(`${currentNode.value} -> `);
            currentNode = currentNode.nextNode;
        }
        return result;
    }

    insertAt (value, index) {
        let currentNode = this.head;
        let newNode = new Node(value)
        if (index > this.size) console.error('index too big!');
        if (index == 0) {
            this.prepend(value);
        } else if (index == this.size-1) {
            this.append(value);
        } else {
            for (let i = 0; i < index; i++) {
                if (i+1 == index) {
                    newNode.nextNode = currentNode.nextNode;
                    currentNode.nextNode = newNode;
                    this.size += 1;
                }
                currentNode = currentNode.nextNode;
            }
        }

        
    }

    removeAt (index) {
        let currentNode = this.head;
        if (index == 0) {
            this.head = this.head.nextNode;
        } else if (index == this.size-1) {
            this.pop();
        } else {
            for (let i = 0; i < index; i++) {
                if (i+1 == index) {
                    currentNode.nextNode = currentNode.nextNode.nextNode;
                    this.size -= 1;
                }
                currentNode = currentNode.nextNode;
            }
        }
    }

}

const node = new Node('1');
const node2 = new Node('2');
const node3 = new Node('3');

const list = new LinkedList(node2);
list.append('3');
list.prepend('1');
list.insertAt('1.5', 1);
list.removeAt(0);

console.log(list.contains('3'));
console.log(list.toString());