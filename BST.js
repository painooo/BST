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
    buildTree(array = this.arr){
        if (array.length == 0) return null;
        if (array.length == 1) return array[0];
        let sortedArray = this.#sortArr(array);
        let medianIndex = Math.floor(sortedArray.length/2);
        let median = sortedArray[medianIndex];
        let right = sortedArray.slice(medianIndex+1);
        let left = sortedArray.slice(0, medianIndex);
        let test = new Node(median, this.buildTree(left), this.buildTree(right))
        return test;
    }
}
console.log(new Tree([1, 5, 9, 14, 23, 27]).buildTree());