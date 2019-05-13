import BplusTreeNode from "./bPlusNode"

let BplusTree = function(capacity){
    // capacity of the nodes
    this.capacity = capacity || 1000;
    // node
    this.node = new this.Node(this, true);
}

BplusTree.prototype.insert = function(value){
    this.node.insert(value);
};

BplusTree.prototype.remove = function(value){
    this.node.remove(value);
};

BplusTree.prototype.find = function(value){
    return this.node.find(value);
};

BplusTree.prototype.forEach = function(iterator){
    this.node.forEach(iterator);
};

BplusTree.prototype.each = BplusTree.prototype.forEach;

BplusTree.prototype.toArray = function(){
    return this.node.toArray();
};

BplusTree.prototype.toString = function(){
    return this.node.toString();
};

BplusTree.prototype.size = function(){
    return this.node.size();
};
BplusTree.prototype.first = function(){
    return this.node.first();
};

BplusTree.prototype.last = function(){
    return this.node.last();
};

BplusTree.prototype.Node = BplusTree.Node = BplusTreeNode;

export default BplusTree;