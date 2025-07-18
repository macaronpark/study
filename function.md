- [함수 선언문, 함수 표현식, 화살표 함수](#함수-선언문-함수-표현식-화살표-함수)
  - [호이스팅 동작의 차이](#호이스팅-동작의-차이)
  - [함수 이름의 유무](#함수-이름의-유무)
  - [this 결정 규칙](#this-결정-규칙)
      - [예제 1](#예제-1)
      - [예제 2](#예제-2)
      - [예제 3](#예제-3)
  - [참고](#참고)

# 함수 선언문, 함수 표현식, 화살표 함수

```javascript
// 함수 선언문(Function Declaration)
function add(a, b) {
  return a + b;
}
```

```javascript
// 함수 표현식(Function Expression)
const addTwoNumbers = function add(a, b) {
  return a + b;
};
```

```javascript
// 화살표 함수(Arrow Function)
const add = (a, b) => {
  return a + b;
};
```

## 호이스팅 동작의 차이

- 선언문: 함수 선언 전체가 렉시컬 환경에 등록되므로, 선언 전 호출할 수 있다.
- 표현식, 화살표: 렉시컬 환경에 const 변수 선언만 등록이 되고 값인 함수가 초기화 되지 않으므로 선언 전 호출할 수 없다.

## 함수 이름의 유무

- 선언문: 이름이 반드시 필요하다.
- 표현식: 선택적으로 사용할 수 있다. 사용하는 경우 함수 내부에서만 호출할 수 있다.
- 화살표: 이름을 사용할 수 없다.

## this 결정 규칙

- 일반 함수: `.` 바로 앞의 객체가 this가 된다.
- 화살표 함수: 정의된 위치의 상위 스코프의 this를 상속한다.

#### 예제 1

```javascript
const name = "Global";

const obj = {
  name: "Object",

  arrow: () => {
    console.log("A:", this.name);
  },

  regular: function () {
    console.log("B:", this.name);
  },
};

obj.arrow();
obj.regular();
```

> 중요 포인트
>
> - 객체 리터럴 `{ }` 자체는 스코프를 만들지 않는다.
> - 전역 스코프에서 this.name은 undefined (strict mode에서)

#### 예제 2

```javascript
const name = "Global";

const obj = {
  name: "Object",

  test: function () {
    console.log("A:", this.name);

    setTimeout(function () {
      console.log("B:", this.name);
    }, 0);

    setTimeout(() => {
      console.log("C:", this.name);
    }, 0);
  },
};

obj.test();
```

#### 예제 3

- Button 1, 2, 3 중 에러가 나는 버튼과 정상 작동하는 버튼은?
- 각각의 이유를 `this` 바인딩 관점에서 설명
- 실무에서 권장되는 방식과 이유는?

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  // 방법 1: 일반 메서드
  handleClick1() {
    console.log("Button 1 clicked, this:", this);
    this.setState({ count: this.state.count + 1 });
  }

  // 방법 2: 화살표 함수 메서드
  handleClick2 = () => {
    console.log("Button 2 clicked, this:", this);
    this.setState({ count: this.state.count + 1 });
  };

  // 방법 3: 인라인 화살표 함수
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>

        <button onClick={this.handleClick1}>Button 1 (일반 메서드)</button>

        <button onClick={this.handleClick2}>Button 2 (화살표 함수)</button>

        <button onClick={() => this.handleClick1()}>Button 3 (인라인에서 일반 메서드 호출)</button>
      </div>
    );
  }
}
```

## 참고

- [함수 선언문 vs 함수 표현식](https://ko.javascript.info/function-expressions)
- [화살표 함수 기본](https://ko.javascript.info/arrow-functions-basics)
- [화살표 함수 심화](https://ko.javascript.info/arrow-functions)
