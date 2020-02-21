import React from "react";
import ReactDOM from "react-dom";
import CodePuzzle from "./CodePuzzle";

let puzzles = [
  {
    key: 1,
    content: `@@ + @@`
  },
  {
    key: 2,
    content: `var a = @@
var b = @@
b + a`
  },
  {
    key: 3,
    content: `function mystery(num){
    return num * num;
}

mystery(@@)`
  },
  {
    key: 4,
    content: "3"
  },
  {
    key: 5,
    content: "4"
  },
  {
    key: 6,
    content: "5"
  },
  {
    key: 7,
    content: "6"
  },
  {
    key: 8,
    content: "7"
  }
];

function App() {
  return (
    <div
      className="App"
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#444"
      }}
    >
      <CodePuzzle content={puzzles[2].content} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
