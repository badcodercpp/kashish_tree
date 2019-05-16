import { validateConfig, isValidControl } from "./util/validateConfig";
import { CONFIG } from "./innerConfig/index";

import BplusTree from "./b-plus/bPlusTree";

function Tree(socket, config, capacity = 100000){
    if (!validateConfig(config)) {
        throw new Error("invalid config format")
    }
    const country = config[0].COUNTRY;
    const COUNTRY = [];
    const STATE = [];
    const DISTRICT = [];
    const ZIP = [];
    for (const c of config) {
        COUNTRY.push(c)
    }
    for(let countryName of country){
        if (!isValidControl(countryName, CONFIG.STATE)) {
            return false;
        }
        console.log(countryName)
        STATE.push(countryName)
        const state = countryName.STATE;
        for (const stateName of state) {
            if (!isValidControl(stateName, CONFIG.DISTRICT)) {
                return false;
            }
            DISTRICT.push(stateName)
            const district = stateName.DISTRICT;
            for (const districtName of district) {
                if (!isValidControl(districtName, CONFIG.ZIP)) {
                    return false;
                }
                const zip = districtName.ZIP;
                for (const zipName of zip) {
                    ZIP.push(zipName)
                }
            }
        }
    }
    const defaultNode = {
        COUNTRY:COUNTRY,
        STATE:STATE,
        DISTRICT:DISTRICT,
        ZIP:ZIP,
    }
    this.createBplusTree(capacity);
    this.addDefaultNodes(defaultNode);
}

Tree.prototype.createBplusTree = function(capacity){
    let btree = new BplusTree(capacity);
    this.BplusTree = btree;
}

Tree.prototype.addDefaultNodes = function(defaultNode){
    const { COUNTRY, STATE, DISTRICT, ZIP } = defaultNode;
    for (const c of COUNTRY) {
        this.BplusTree.node.new(false);
        this.BplusTree.node.insert(c)
        for (const s of STATE) {
            this.BplusTree.node.new(false);
            this.BplusTree.node.insert(s)
            for (const d of DISTRICT) {
                this.BplusTree.node.new(false);
                this.BplusTree.node.insert(d)
                for (const z of ZIP) {
                    this.BplusTree.node.new(false)
                    this.BplusTree.node.insert(z)
                }
            }
        }
    }
}

Tree.prototype.getTree = function(){
    return this.BplusTree;
}

Tree.prototype.getTargetNode = function(id){

}

Tree.prototype.getTreeSize = function(){
    return this.BplusTree.size()
}

Tree.prototype.iterator = function(value, index){
    return null
}

Tree.prototype.findSingleByText = function(selector){
    const data = this.BplusTree.node.data;
    const tree = {
        BplusTree: this.BplusTree
    };
    for (const i of data) {
        for (const a of Object.keys(i)) {
            if (typeof i[a] === "string") {
                if (i[a].toString().toUpperCase().indexOf(selector.toString().toUpperCase())>-1) {
                    tree["target"] = i;
                    break;
                }
            }
        }
        if (tree["target"]) {
            break;
        }
    }
    return tree;
}

Tree.prototype.findMultipleByText = function(selector){
    const data = this.BplusTree.node.data;
    const tree = {
        BplusTree: this.BplusTree,
        target:[]
    };
    for (const i of data) {
        for (const a of Object.keys(i)) {
            if (typeof i[a] === "string") {
                if (i[a].toUpperCase().indexOf(selector.toString().toUpperCase())>-1) {
                    tree["target"].push(i)
                }
            }
        }
    }
    return tree;
}

Tree.prototype.find = function(...args){
    let customCheck = false, customTypeIndicator = "";
    for (const i of args) {
        if(!(typeof i === "object")){
            customCheck = true;
            customTypeIndicator = typeof i
        }
    }
    if (customCheck) {
        throw new Error(`invalid arguments expected ${typeof {}} but got ${customTypeIndicator}`)
    }
    this.BplusTree.find.apply(this.BplusTree,args)
}


export default Tree;