const stack = createStack();

const displayText = document.getElementById("display");
const buttons = document.getElementById("buttons");

buttons.addEventListener("click", (e) => {
  if (!e.target) return;

  const { type } = e.target.dataset;
  const key = e.target.textContent;

  const keyHandler = keyHandlers[type];
  if (!keyHandler) return;

  keyHandler(key);
  showDisplayText(stack.getArray());
});

const keyHandlers = {
  function: handleFunctionKey,
  operator: handleOperatorKey,
  number: handleNumberKey,
};

function handleFunctionKey(key) {
  if (key === "AC") {
    stack.initWith("0");
  }

  if (key === "=") {
    const result = calculate(stack.getArray());

    const last = stack.getLast();
    if (["/", "*", "-", "+"].includes(last)) {
      stack.pop();
    }

    stack.initWith(result);
  }
}

function handleOperatorKey(key) {
  const last = stack.getLast();

  // 마지막 값이 연산자이면, 새 연산자로 교체
  if (["/", "*", "-", "+"].includes(last)) {
    stack.pop();
  }

  stack.push(key);
}

function handleNumberKey(key) {
  const last = stack.getLast();

  // 화면에 '0'만 있을 때 다른 숫자를 누르면 교체
  const isZeroOnly = stack.getLength() === 1 && last === "0";
  if (isZeroOnly && key !== ".") {
    stack.initWith(key);
    return;
  }

  // 마지막 값이 연산자가 아니면, 숫자를 이어서 붙임
  if (!["/", "*", "-", "+"].includes(last)) {
    const last = stack.pop();
    stack.push(last + key);
    return;
  }

  stack.push(key);
}

const calculate = (arr) => {
  let result = +arr[0];

  for (let i = 1; i < arr.length; i += 2) {
    const operator = arr[i];
    const operand = +arr[i + 1];

    switch (operator) {
      case "+":
        result += operand;
        break;

      case "-":
        result -= operand;
        break;

      case "*":
        result *= operand;
        break;

      case "/":
        result /= operand;
        break;
    }
  }

  // 부동소수점 오차 보정
  const precision = 1e10;
  return Math.round(result * precision) / precision;
};

const showDisplayText = (stack) => {
  displayText.textContent = stack.join("");
};

function createStack() {
  let arr = ["0"];

  return {
    pop: () => arr.pop(),
    push: (item) => arr.push(item),
    initWith: (item) => {
      arr = [];
      if (item) arr.push(item);
    },
    getLast: () => arr[arr.length - 1],
    getLength: () => arr.length,
    getArray: () => [...arr],
  };
}
