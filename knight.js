class Pos {
    constructor(x,y, height){
        this.name = `${x}${y}`;
        this.x = x;
        this.y = y;
        this.adj = [];
        this.height = height;
        this.parent;
    }
}
function makeMoves(position){
    let x = position.x;
    let y = position.y;
    let height = position.height+1;
    let m1 = 2;
    let m2 = 1;
    let moves = [];
    for (let i = 0; i < 2; i++) {
        moves.push(new Pos(x+m1, y+m2, height));
        moves.push(new Pos(x-m1, y+m2, height));
        moves.push(new Pos(x+m1, y-m2, height));
        moves.push(new Pos(x-m1, y-m2, height));
        m1 = 1;
        m2 = 2;
    }
    return moves.filter(pos => pos.x >= 0 && pos.x <= 7 && pos.y >= 0 && pos.y <= 7);
}
function filterMoves(moves, visited){
    let obj = {};
    for (let move of moves) {
        obj[move.name] = move;
    }
    for (let move in visited) {
        delete obj[move];
    }
    return Object.values(obj);
}
function mapPath(queue, end, visited={}){
    if (queue.length == 0) {
        return visited;
    }
    let unFiltered = makeMoves(queue[0]);
    let moves = filterMoves(unFiltered, visited);
    for (let move of moves) {
        move.parent = queue[0];
        queue.push(move);
    }
    for (let move of unFiltered) { // To set the adj of each
        queue[0].adj.push(move.name);
    }
    visited[queue[0].name]=queue[0];
    if (visited[end]) {
        return visited;
    }
    queue.shift();
    return mapPath(queue, end, visited);
}

function getPath(start, end, map) {
    let node = map[end];
    let path = [];
    while(node.name != start.name) {
        path.push(node.name);
        node = node.parent;
    }
    path.push(start.name)
    return path.reverse();
}
function knightMoves(start, end){
    if (start.toString() == end.toString()){
        return [start];
    }
    end = `${end[0]}${end[1]}`
    start = new Pos(start[0], start[1], 0);
    let map = mapPath([start], end);
    return getPath(start, end, map);
}
console.log(knightMoves([0,0],[3,7]));