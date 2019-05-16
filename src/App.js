import React from 'react';
import logo from './logo.svg';
import './App.css';

import Tree from "./Kashish/index";

import BplusTree from "./Kashish/b-plus/bPlusTree";

let btree = new BplusTree(100);
console.log(btree)

const config = [
  {
    COUNTRY: [
      {
        STATE: [
          {
            DISTRICT: [
              {
                ZIP: [
                  {
                    value:"560068",
                    name:"KORAMANGALA"
                  }
                ]
              }
            ],
            name:"BTM"
          }
        ],
        name:"BANGALORE"
      }
    ],
    name:"INDIA"
  }
]

let t = new Tree({}, config)
console.log(t)
console.log(t.getTree())
console.log("tree traverse - find single node");
console.log(t.findSingleByText("b"))
console.log("tree traverse - find multiple node");
console.log(t.findMultipleByText("b"))
console.log("tree size");
console.log(t.getTreeSize())
console.log("tree traverse - custom algorithm");
const f = {
  ZIP: [
    {
      value:"560068",
      name:"KORAMANGALA"
    }
  ]
}
console.log(t.find(f))

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
