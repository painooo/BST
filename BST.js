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
    
}
const tree = new Tree([1, 5, 9, 14, 23, 27]);
console.log(tree.buildTree());