import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["MS", "MC", "MR", "M+", "M-"],
  ["AC", 7, 8, 9, "%", "√"],
  ["C", 4, 5, 6, "x", "÷"],
  ["", 1, 2, 3, "+", "-"], 
  [0, ".", "+/-", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  const [memory, setMemory] = useState(0);
  const [memoryValue, setMemoryValue] = useState(0);

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) => {
        if (sign === "+") {
          return a + b;
        } else if (sign === "-") {
          return a - b;
        } else if (sign === "x" || sign === "X") {
          return a * b;
        } else if (sign === "÷") {
          return a / b;
        } 
      };

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= 100),
      res: (res /= 100),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const calculateSquareRoot = (number) => {
    if (number >= 0) {
      return Math.sqrt(number);
    } else {
      console.error("Cannot calculate square root of a negative number");
      return "";
    }
  };

  const squareRootClickHandler = () => {
    setCalc({
      ...calc,
      num: toLocaleString(calculateSquareRoot(removeSpaces(calc.num))),
      res: 0,
    });
  };

  
  const memorySaveHandler = () => {
    setMemoryValue(removeSpaces(calc.num));
    setMemory(Number(memory) - Number(removeSpaces(calc.num)));
  };
  
  const memoryClearHandler = () => {
   setMemory(0);
    setMemoryValue(0);
  };
  
  const memoryRecallHandler = () => {
    setCalc({
      ...calc,
      num: toLocaleString(memoryValue),
    });
  };

  const memoryPlusHandler = () => {
    const num = Number(removeSpaces(!calc.res && calc.num ? calc.num : calc.res));
    const newMemoryValue = Number(memoryValue) + num;
    setMemoryValue(newMemoryValue);
  };

  const memoryMinusHandler = () => {
    const num = Number(removeSpaces(!calc.res && calc.num ? calc.num : calc.res));
    const newMemoryValue = Number(memoryValue) - num;
    setMemoryValue(newMemoryValue);
  };
  
  const clearClickHandler = () => {
    setCalc({
      ...calc,
      num: "0", 
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "AC"
                  ? resetClickHandler
                  : btn === "C"
                  ? clearClickHandler
                  : btn === "+/-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "÷" || btn === "x" || btn === "-" || btn === "+" 
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : btn === "√"
                  ? squareRootClickHandler
                  : btn === "MS"
                  ? memorySaveHandler
                  : btn === "MC"
                  ? memoryClearHandler
                  : btn === "MR"
                  ? memoryRecallHandler
                  : btn === "M+"
                  ? memoryPlusHandler
                  : btn === "M-"
                  ? memoryMinusHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
