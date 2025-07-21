# 클로저

클로저는 함수가 생성될 당시의 렉시컬 환경을 기억하여, 외부 함수의 변수에 계속 접근할 수 있는 함수이다.

## 실행 컨텍스트와 스코프 체인

```javascript
function outer() {
  const outerVar = "I am outer";

  function inner() {
    console.log(outerVar); // 외부 스코프의 변수에 접근
  }

  return inner;
}

const closureFunction = outer();
closureFunction(); // "I am outer" - outer 함수가 종료되었는데도 접근 가능
```

- 함수는 자신의 렉시컬 환경에서 먼저 변수와 함수를 찾는다.
- inner 함수가 outerVar를 참조하고 있기 때문에, outer 함수의 렉시컬 환경 중 필요한 변수들은 가비지 컬렉터에 의해 수거되지 않고 유지된다.

- **실행 컨텍스트 스택 과정**
  - 전역 실행 컨텍스트 생성 → 스택에 push
  - outer() 호출 → outer 실행 컨텍스트 생성 → 스택에 push
  - outer 종료 시 실행 컨텍스트는 스택에서 pop되지만, 반환된 inner 함수는 클로저로 남아 메모리에 유지된다.
  - closureFunction()을 호출할 때 inner 함수의 실행 컨텍스트가 새로 생성되어 스택에 push된다.
  - inner 종료 → 스택에서 pop
  - 전역만 남음
- **스코프 체인 형성**
  - inner의 외부 렉시컬 환경 → outer
  - outer의 외부 렉시컬 환경 → 전역
  - 변수 찾을 때: inner → outer → 전역 순으로 체인을 따라 탐색

## 단계별 실습

#### 기본 클로저

```javascript
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

#### 매개변수가 있는 클로저

```javascript
// `users`라는 상태를 모듈 내부에 은닉하고, 클로저로 반환된 메서드를 통해서만 접근할 수 있게 만든다.
// 이처럼 클로저는 정보 은닉 및 모듈화 패턴 구현에 유용하다.
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

#### 여러 함수를 반환하는 클로저

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit: function (amount) {
      balance += amount;
      return balance;
    },
    withdraw: function (amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return "Insufficient funds";
    },
    getBalance: function () {
      return balance;
    },
  };
}

const myAccount = createBankAccount(0); // 🥲
myAccount.deposit(1000);
myAccount.withdraw(100);

const balance = myAccount.getBalance();
console.log(balance); // 900;
```

## 실무 활용 사례

```javascript
// user.js
const createUserModule = () => {
  let users = [];

  return {
    addUser: function (user) {
      users.push(user);
    },
    getUsers: function () {
      return [...users];
    },
  };
};

export default createUserModule;

// main.js
import createUserModule from "./user.js";

const UserModule = createUserModule();
```

```javascript
function setupUserProfile(userId) {
  // API에서 가져온 사용자 데이터
  const userData = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
  };

  // 여러 이벤트 핸들러에서 같은 userData 사용
  document.getElementById("profile-btn").addEventListener("click", function () {
    showProfile(userData); // 클로저로 userData 접근
  });

  document.getElementById("edit-btn").addEventListener("click", function () {
    editProfile(userData); // 같은 데이터 사용
  });

  document.getElementById("delete-btn").addEventListener("click", function () {
    deleteUser(userData.id); // 필요한 데이터만 사용
  });
}

function showProfile(user) {
  console.log(`Name: ${user.name}, Email: ${user.email}`);
}

// 사용
setupUserProfile(123);
```

## 주의사항과 함정 학습

```javascript
// 문제가 있는 코드
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 3, 3, 3 출력
  }, 100);
}

// 해결책 1: 즉시실행함수(IIFE)
for (var i = 0; i < 3; i++) {
  (function (index) {
    setTimeout(function () {
      console.log(index); // 0, 1, 2 출력
    }, 100);
  })(i);
}

// 해결책 2: let 사용
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2 출력
  }, 100);
}
```

- 문제 원인
  - var는 블록 스코프가 아닌 함수/전역 스코프
  - 비동기 setTimeout이 실행되는 시점에는 for 루프가 모두 종료되고 i가 3이 되어있음
  - 모든 콜백 함수가 동일한 `i`를 참조해 3이 출력됨
- 해결책 1: 즉시실행함수(IIFE)
  - 새로운 스코프 생성
  - 루프가 도는 시점의 `i`값을 복사해서 넘겨받은 `index` 변수 참조
- 해결책 2: let 사용
  - let은 블록 스코프임
  - for 루프 `{ }` 블록을 순회할 때마다 새로운 렉시컬 환경이 생성됨

## 개발자 도구 활용

// TODO

1. 브라우저 개발자 도구에서 스코프 탭을 보면서 클로저가 어떻게 형성되는지 확인해볼 수 있다고 하는데 예제 코드와 구체적인 확인 방법
2. 클로저는 메모리를 계속 참조하니까 필요없을 때는 참조를 끊어줘야 한다던데 실제 메모리 현황에서 참조를 끊어줘야하는 클로저를 식별하는 예제 코드와 구체적인 방법
