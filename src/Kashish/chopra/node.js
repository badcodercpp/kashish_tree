
function node(){
    this.keyval = [];
	this.nodptr = [];
}

node.prototype.isLeaf = function() {return false;};

node.prototype.getItem = function (key) {
	var vals = this.keyval;
	for (var i=0, len=vals.length; i<len; i++) {
		if (key < vals[i]) return i;
	}
	return vals.length;
};

node.prototype.addKey = function (key,ptrL,ptrR) {
	var vals = this.keyval;
	var itm = vals.length;
	for (var i=0, len=vals.length; i<len; i++) {
		if (key <= vals[i]) {
			itm = i;
			break;
		}
	}
	for (var i=vals.length; i>itm; i--) {
		vals[i] = vals[i-1];
		this.nodptr[i+1] = this.nodptr[i];
	}
	vals[itm] = key;
	this.nodptr[itm] = ptrL;
	this.nodptr[itm+1] = ptrR;
};

node.prototype.split = function () {
	var mov = Math.ceil(this.keyval.length/2) - 1;
	var newN = new node();
	newN.nodptr[mov] = this.nodptr.pop();
	for (var i=mov-1; i>=0; i--) {
		newN.keyval[i] = this.keyval.pop();
		newN.nodptr[i] = this.nodptr.pop();
	}
	return newN;
};

node.prototype.merge = function (frNod, paNod, paItm) {
	var del = paNod.keyval[paItm];
	this.keyval.push(del);
	for (var i=0, len=frNod.keyval.length; i<len; i++) {
		this.keyval.push(frNod.keyval[i]);
		this.nodptr.push(frNod.nodptr[i]);
	}
	this.nodptr.push(frNod.nodptr[frNod.nodptr.length-1]);
	for (var i=paItm, len=paNod.keyval.length-1; i<len; i++) {
		paNod.keyval[i] = paNod.keyval[i+1];
		paNod.nodptr[i+1] = paNod.nodptr[i+2];
	}
	paNod.keyval.pop();
	paNod.nodptr.pop();
	return del;
};

export default node;