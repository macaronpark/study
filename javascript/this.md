# this

- [this](#this)
  - [예제 1](#예제-1)
  - [예제 2](#예제-2)

## 예제 1

```javascript
const name = "Global";

const obj = {
  name: "Object",

  arrow: () => {
    console.log("A:", this.name); // A: undefined
  },

  regular: function () {
    console.log("B:", this.name); // B: Object
  },
};

obj.arrow();
obj.regular();
```

- 객체 리터럴 `{ }` 자체는 스코프를 만들지 않음
- 전역 스코프에서 this.name은 undefined (strict mode에서)

## 예제 2

```javascript
export const GameLogic = {
  init() {
    setInterval(this.growthCheck, 1000);
  },

  growthCheck() {
      this.growTo({ ... }); // Uncaught TypeError: this.growTo is not a function
  },

  growTo({ fieldID, nextGrowthStage }) { ... },
}
```

- 원인
  - `setTimeout`, `setInterval`의 콜백은
    - Node.js에서는 Timeout 객체의 컨텍스트에서 실행됨
    - 브라우저에서는 전역 컨텍스트(window)에서 실행됨
- 해결
  - `setInterval(this.growthCheck.bind(this), 1000);` 또는
  - `setInterval(() => this.growthCheck(), 1000);`
