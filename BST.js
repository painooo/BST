class Node{
    constructor(value, left = null, right = null){
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
class Tree {
    constructor(arr){
        this.arr = arr;
        this.root = {};
    }
    #sortArr(array){
        let obj = {}
            for (let i of array) {
                obj[i] = i;
            }
        return Object.values(obj);
    }
    buildTree(array = this.arr){
        if (array.length == 0) return null;
        if (array.length == 1) return new Node(array[0]); // So every node is a Node other than null

        let sortedArray = this.#sortArr(array);
        let medianIndex = Math.floor(sortedArray.length/2);
        let median = sortedArray[medianIndex];
        let right = sortedArray.slice(medianIndex+1);
        let left = sortedArray.slice(0, medianIndex);
        this.root = new Node(median, this.buildTree(left), this.buildTree(right))
        return this.root;
    }
    pickDir(nodeVal, val){
        return nodeVal > val ? "left" : "right"
    }
    iterate(value){
        let node = this.root;
        let dir;
        let dir2;
        while (node != null) {
            dir = this.pickDir(node.value, value);
            //if (node[dir] == null) return [node, dir];
            if (node[dir].value == value) return [node, dir];
            dir2 = this.pickDir(node[dir].value, value);
            if (node[dir][dir2] == null) return [node, dir, dir2]; // So it stops 2 steps before setting node to a null value  // returns previous node and where it's meant to be inserted
            node = node[dir];
        }
    }
    insert(value){
        const node = this.iterate(value);
        let [pos, dir, dir2] = node;
        if (dir2 == null) {
            pos[dir] = new Node(value);
        } else {
            pos[dir][dir2] = new Node(value);
        }
        return 0;
    }
    deleteItem(value){ // If has children ...
        let node = this.iterate(value);
        let [pos, dir] = node;
        let item = pos[dir]
        if (item.value == value) {
            pos[dir] = null
            if (item.right) this.insert(item.right.value);
            if (item.left) this.insert(item.left.value);
        }
        return 0;
    }
    find(value){
        let node = this.iterate(value);
        let [pos, dir, dir2] = node;
        if (dir2 == null) {
            return pos[dir];
        } else {
            return pos[dir][dir2];
        }
    }
    levelOrderForEach(callback) {
        try {
            if (callback == undefined) {
                throw "A callback is required";
            }
            let queue = [this.root];
            while (queue.length != 0) {
                if (queue[0].left) queue.push(queue[0].left);
                if (queue[0].right) queue.push(queue[0].right);
                callback(queue[0].value);
                queue.shift();
            }
        } catch(e) {
            console.error(e);
        }
    }
    postOrderForEach(callback, root=this.root){
        try {
            if (callback == undefined) {
                throw "A call back is required";
            }
            if (root == null) {
                return 0;
            }
            this.postOrderForEach(callback, root.left);
            this.postOrderForEach(callback, root.right);
            callback(root.value);

        } catch (e) {
            console.error(e);
        }
    }
    preOrderForEach(callback, root=this.root){
        try {
            if (callback == undefined) {
                throw "A call back is required";
            }
            if (root == null) {
                return 0;
            }
            callback(root.value);
            this.preOrderForEach(callback, root.left);
            this.preOrderForEach(callback, root.right);

        } catch (e) {
            console.error(e);
        }
    }
    inOrderForEach(callback, root=this.root){
        try {
            if (callback == undefined) {
                throw "A call back is required";
            }
            if (root == null) {
                return 0;
            }
            this.inOrderForEach(callback, root.left);
            callback(root.value);
            this.inOrderForEach(callback, root.right);

        } catch (e) {
            console.error(e);
        }
    }
    printTree(){
        console.log(this.root);
        return 0;
    }
}
const tree = new Tree([1,5, 9, 14, 23, 27]);
console.log(tree.buildTree());
const printIt = (item) => {
    console.log(item);
}
tree.levelOrderForEach(printIt);