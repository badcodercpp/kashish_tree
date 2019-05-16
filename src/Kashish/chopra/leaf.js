function leaf(){
    this.keyval = [];
	this.recnum = [];
	this.prevLf = null;
	this.nextLf = null;
}

leaf.prototype.isLeaf = function() {return true;};

leaf.prototype.getItem = function (key,near) {
    const vals = this.keyval;
	if (near) {
		for (var i=0, len=vals.length; i<len; i++) {
			if (key <= vals[i]) return i;
		}
	} else {
		for (var i=0, len=vals.length; i<len; i++) {
			if (key === vals[i]) return i;
		}
	}
	return -1;
};

leaf.prototype.XgetItem = function (key,near) {		// Binary chop version not used
	var vals = this.keyval;
	var L=0, M, R=vals.length-1;
	if (key > vals[R])
		return -1;
	else if (key <= vals[L])
		M = 0;
	else {
		while (true) {
			M = Math.floor((R-L)/2);
			if (M === 0) {
				M = R;
				break;
			}
			M += L;
			if (key === vals[M]) break;
			if (vals[M] > key) R = M;
			else               L = M;
		}
	}
	if (vals[M] != key && !near) return -1;
	return M;
};

leaf.prototype.addKey = function (key,rec) {
	var vals = this.keyval;
	var itm = vals.length;
	for (var i=0, len=itm; i<len; i++) {
		if (key === vals[i]) {
			itm = -1;
			break;
		}
		if (key <= vals[i]) {
			itm = i;
			break;
		}
	}
	if (itm != -1) {
		for (var i=vals.length; i>itm; i--) {
			vals[i] = vals[i-1];
			this.recnum[i] = this.recnum[i-1];
		}
		vals[itm] = key;
		this.recnum[itm] = rec;
	}
	return itm;
};

leaf.prototype.split = function () {
	var mov = Math.floor(this.keyval.length/2);
	var newL = new leaf();
	for (var i=mov-1; i>=0; i--) {
		newL.keyval[i] = this.keyval.pop();
		newL.recnum[i] = this.recnum.pop();
	}
	newL.prevLf = this;
	newL.nextLf = this.nextLf;
	if (this.nextLf !== null) this.nextLf.prevLf = newL;
	this.nextLf = newL;
	return newL;
};

leaf.prototype.merge = function (frNod, paNod, frKey) {
	for (var i=0, len=frNod.keyval.length; i<len; i++) {
		this.keyval.push(frNod.keyval[i]);
		this.recnum.push(frNod.recnum[i]);
	}
	this.nextLf = frNod.nextLf;
	if (frNod.nextLf !== null) frNod.nextLf.prevLf = this;
	frNod.prevLf = null;
	frNod.nextLf = null;
	var itm = paNod.keyval.length-1;
	for (var i=itm; i>=0; i--) {
		if (paNod.keyval[i] == frKey) {
			itm = i;
			break;
		}
	}
	for (var i=itm, len=paNod.keyval.length-1; i<len; i++) {
		paNod.keyval[i] = paNod.keyval[i+1];
		paNod.nodptr[i+1] = paNod.nodptr[i+2];
	}
	paNod.keyval.pop();
	paNod.nodptr.pop();
};

export default leaf;