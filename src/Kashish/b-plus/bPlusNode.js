

const mfloor = Math.floor;


let BplusTreeNode = function(root, isLeaf){
    // The root node of the node.
    this.root = root;
    // The capacity of this node.
    this.capacity = root.capacity;
    // Whether the node is a leaf node or not.
    this.isLeaf = isLeaf;
    // The data in this node.
    this.data = [];
    // The child nodes in this node.
    this.nodes = [];
    // The previous leaf node of this node.
    this.prev = null;
    // The next node of this node.
    this.next = null;
}

BplusTreeNode.prototype.new = function(isLeaf){
    return new this.constructor(this.root, isLeaf);
};

BplusTreeNode.prototype.compare = function(a, b){
    return a <= b;
};

BplusTreeNode.prototype.equal = function(a, b){
    return a === b;
};

BplusTreeNode.prototype.insert = function(value){
    if (value == null) throw new Error('value is required.');
  
    var data = this.data,
      length = data.length,
      i = 0;
  
    for (; i < length, this.compare(data[i], value); i++);
  
    if (this.isLeaf){
      data.splice(i, 0, value);
    } else {
      this.nodes[i].insert(value);
    }
  
    if (data.length === this.capacity){
      this.split();
    }
};

BplusTreeNode.prototype.split = function(){
    var data = this.data,
      length = data.length,
      root = this.root,
      capacity = this.capacity,
      pivot = mfloor(capacity / 2),
      center = data[pivot];
  
    if (this.isLeaf){
      var prev = this.prev,
        newPrev = this.new(true);
  
      newPrev.next = this;
      this.prev = newPrev;
  
      if (prev){
        newPrev.prev = prev;
        prev.next = newPrev;
      }
  
      for (var i = 0; i < pivot; i++){
        newPrev.data.push(data.shift());
      }
  
      // check whether the root node is a BPlusTree
      if (root.node){
        var newRoot = this.new(false);
        newRoot.data.push(center);
        newRoot.nodes.push(newPrev, this);
        root.node = newPrev.root = this.root = newRoot;
      } else {
        var rootData = root.data,
          rootDataLength = rootData.length,
          i = 0;
  
        for (; i < length, this.compare(rootData[i], center); i++);
  
        rootData.splice(i, 0, center);
        root.nodes.splice(i, 0, newPrev);
      }
    } else {
      var newPrev = this.new(false),
        nodes = this.nodes,
        node;
  
      for (var i = 0; i < pivot; i++){
        node = nodes.shift();
        node.root = newPrev;
        newPrev.data.push(data.shift());
        newPrev.nodes.push(node);
      }
  
      node = nodes.shift();
      node.root = newPrev;
      newPrev.nodes.push(node);
  
      // check whether the root node is a BPlusTree
      if (root.node){
        var newRoot = this.new(false);
  
        newRoot.data.push(data.shift());
        newRoot.nodes.push(newPrev, this);
  
        root.node = newPrev.root = this.root = newRoot;
      } else {
        var rootData = root.data,
          rootDataLength = rootData.length,
          i = 0;
  
        for (; i < rootDataLength, this.compare(rootData[i], center); i++);
  
        rootData.splice(i, 0, data.shift());
        root.nodes.splice(i, 0, newPrev);
      }
    }
};

BplusTreeNode.prototype.remove = function(value){
    if (value == null) throw new Error('value is required.');
};

BplusTreeNode.prototype.find = function(value){
    if (value == null) throw new Error('value is required.');
  
    var data = this.data,
      length = data.length,
      i = 0;
  
    if (this.isLeaf){
      for (; i < length; i++){
        if (this.equal(data[i], value)) return data[i];
      }
  
      return null;
    } else {
      for (; i < length, this.compare(data[i], value); i++);
  
      return this.nodes[i].find(value);
    }
};

BplusTreeNode.prototype.forEach = function(iterator){
    if (typeof iterator !== 'function') throw new TypeError('iterator must be a function.');
  
    if (this.isLeaf){
      var data = this.data,
        length = data.length;
  
      for (var i = 0; i < length; i++){
        iterator(data[i], i);
      }
    } else {
      var nodes = this.nodes,
        length = nodes.length,
        current = 0;
  
      for (var i = 0; i < length; i++){
        nodes[i].forEach(function(item){
          iterator(item, current++);
        });
      }
    }
};

BplusTreeNode.prototype.each = BplusTreeNode.prototype.forEach;

BplusTreeNode.prototype.toArray = function(){
    var arr = [];
  
    this.forEach(function(item){
      arr.push(item);
    });
  
    return arr;
};

BplusTreeNode.prototype.toString = function(){
    return this.toArray().toString();
};

BplusTreeNode.prototype.size = function(){
    if (this.isLeaf){
      return this.data.length;
    } else {
      var nodes = this.nodes,
        count = 0;
  
      for (var i = 0, len = nodes.length; i < len; i++){
        count += nodes[i].size();
      }
  
      return count;
    }
};

BplusTreeNode.prototype.first = function(){
    if (this.isLeaf){
      return this.data[0];
    } else {
      return this.nodes[0].first();
    }
};

BplusTreeNode.prototype.last = function(){
    if (this.isLeaf){
      var data = this.data;
  
      return data[data.length - 1];
    } else {
      var nodes = this.nodes;
  
      return nodes[nodes.length - 1].last();
    }
};

BplusTreeNode.prototype.connect = function(socket){
    return socket.connect();
}


export default BplusTreeNode;