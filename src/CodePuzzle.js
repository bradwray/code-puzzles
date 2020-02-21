import React, { Fragment, Component } from "react";
import styled from "@emotion/styled";
// import babel from "Babel";
import { Spring, animated } from "react-spring/renderprops";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import theme from "prism-react-renderer/themes/nightOwl";

const PuzzleContainer = styled.div`
  width: 90%;
  max-width: 800px;
  min-width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18;
  box-sizing: "border-box";
  font-family: '"Dank Mono", "Fira Code", monospace';
  ${theme.plain};
  background-color: ${props =>
    props.old ? `black` : theme.plain.backgroundColor};
`;

const PuzzleCard = styled.div`
  padding: 30px;
  max-width: 80%;
  min-width: 30%;
  width: 100vw;
  font-size: 35px;
  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: center;
  transform-origin: 50% 50%;
`;

const InputBox = styled.input`
  bottom: 25px;
  width: 80px;
  height: 30px;
  text-align: center;
`;

const FeedBackRight = styled.div`
  position: absolute;
  font-size: 20px;
  color: green;
  bottom: 70px;
  /* width: 60px; */
  height: 30px;
  text-align: center;
`;

const FeedBackWrong = styled.div`
  position: absolute;
  font-size: 20px;
  bottom: 70px;
  color: red;
  /* width: 60px; */
  height: 30px;
  text-align: center;
`;

const fillIt = codeString => {
  var newCodeString = codeString;
  while (newCodeString.indexOf("@@") >= 0) {
    newCodeString = newCodeString.replace("@@", Math.floor(Math.random() * 8));
  }
  return newCodeString;
};

function Puzzle({ content, nextPuzzle }) {
  const [state, setState] = React.useState({
    code: fillIt(content),
    answered: false,
    correct: false,
    inputVal: ""
  });
  // const [code, setCode] = React.useState(fillIt(content));
  // const [answered, setAnswered] = React.useState(false);
  // const [inputVal, setInput] = React.useState("");

  const highlight = code => (
    <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  );

  const handleChange = e => {
    if (e.key === "Enter") {
      if (eval(state.code) == e.target.value) {
        setTimeout(() => {
          console.log("move on");
        }, 1000);
        setState({
          answered: true,
          correct: true,
          code: state.code
        });
      } else {
        setState({
          answered: true,
          correct: false,
          code: state.code
        });
        setTimeout(() => {
          console.log("another");
        }, 1000);
      }
    } else {
      setState({
        input: e.target.value,
        answered: false,
        correct: false,
        code: state.code
      });
    }
  };

  const showFeedBack = () => {
    const { answered, correct, code } = state;
    if (answered) {
      if (correct) {
        return <FeedBackRight>ans: {eval(code)}</FeedBackRight>;
      } else {
        return <FeedBackWrong>ans: {eval(code)}</FeedBackWrong>;
      }
    } else {
      return <div />;
    }
  };
  console.log(state);
  return (
    <PuzzleContainer>
      <PuzzleCard>
        <Editor
          value={state.code}
          highlight={highlight}
          padding={10}
          style={{
            fontSize: 18,
            width: 400,
            border: "1px solid #555",
            boxSizing: "border-box",
            fontFamily: '"Dank Mono", "Fira Code", monospace',
            ...theme.plain
          }}
        />
        ↓
        <InputBox
          value={state.inputVal}
          // autoFocus={offsetFromMiddle === 0 ? "autofocus" : false}
          onChange={handleChange}
          onKeyDown={handleChange}
        />
        {showFeedBack()}
      </PuzzleCard>
    </PuzzleContainer>
  );
}

export default Puzzle;
