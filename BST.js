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
        while (node != null) {
            if (node.value === value) {
                return 0;
            }
            let dir = this.pickDir(node.value, value);
            if (node[dir] == null) { // So it stops before setting node to a null value
                return [node, dir]; // returns previous node to where it's meant to be inserted
            }
            node = node[dir];
        }
    }
    insert(value){
        const item = new Node(value);
        const node = this.iterate(value);
        if (node == 0) return this.root;
        let [pos, dir] = node;
        pos[dir] = item;
        return this.root;
    }
}
const tree = new Tree([1, 5, 9, 14, 23, 27]);
console.log(tree.buildTree());
console.log(tree.insert(28));
console.log(tree.insert(28));