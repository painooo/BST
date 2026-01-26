class Node{
    constructor(value, left, right){
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
class Tree {
    constructor(arr){
        this.arr = arr;
        this.root;
    }
    #sortArr(array){
        let obj = {}
            for (let i of array) {
                obj[i] = i;
            }
        return Object.values(obj);
    }
    buildTree(array = this.arr){ // Doesn't sort correctly
        if (array.length == 0) return null;
        if (array.length == 1) return array[0];
        let sortedArray = this.#sortArr(array);
        let medianIndex = Math.floor(sortedArray.length/2);
        let median = sortedArray[medianIndex];
        let right = sortedArray.slice(medianIndex+1); // On recursion it'll use the middle one
        let left = sortedArray.slice(0, medianIndex); // Not the first one which was sorted
        let test = new Node(median, this.buildTree(left), this.buildTree(right))
        return test;
    }
}
console.log(new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]).buildTree());