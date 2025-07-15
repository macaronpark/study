# Event Delegation

## 개념

**이벤트 위임**이란

- **효율적인 이벤트 처리**를 위해
- 하위 요소들의 이벤트 처리를
- **상위 요소에게 위임하는 기법**이다.

## 구현 예시

```html
<div id="마당">
  <button id="밭-1"></button>
  <button id="밭-2"></button>
  <button id="밭-3"></button>
</div>
```

- ❌ `밭`마다 각각 이벤트 리스너 등록 (필요 리스너 3개)
- ✅ `마당`에만 이벤트 리스너를 등록 (필요 리스너 1개)
- 🎯 `마당`이 모든 `밭`의 이벤트를 **위임**받아 처리

```javascript
const yard = document.getElementById("마당");

yard.addEventListener("click", (e) => {
  console.log(e.target); // 밭
  console.log(e.currentTarget); // 마당

  if (!e.target.closest("button")) return;
  if (!e.target.id.includes("밭")) return;

  plantMushroom({ fieldID: e.target.id });
});
```

## 핵심 개념

### Event Bubbling과 Capturing

| 단계         | 방향        | 설명                      | 기본 실행 여부    |
| :----------- | :---------- | :------------------------ | :---------------- |
| 1️⃣ Capturing | 바깥 → 안쪽 | 최상위 요소부터 타겟까지  | ❌ 옵션 명시 필요 |
| 2️⃣ Target    | -           | 실제 이벤트가 발생한 요소 | ✅ 실행됨         |
| 3️⃣ Bubbling  | 안쪽 → 바깥 | 타겟부터 최상위 요소까지  | ✅ 기본값: 실행됨 |

```html
<div>
  <button>버튼</button>
</div>
```

```javascript
// Bubbling
document.addEventListener("click", () => console.log("document"));
div.addEventListener("click", () => console.log("div"));
button.addEventListener("click", () => console.log("button"));

// 버튼 클릭 시 출력 순서:
// → button
// → div
// → document
```

```javascript
// Capturing
document.addEventListener("click", () => console.log("document"), { capture: true });
div.addEventListener("click", () => console.log("div"), { capture: true });
button.addEventListener("click", () => console.log("button"), { capture: true });

// 버튼 클릭 시 출력 순서:
// → document
// → div
// → button
```

- `stopPropagation()`: 현재 이벤트의 단계(캡처링, 버블링)에서 이벤트의 전파를 중단할 수 있다.
- 과거 Netscape는 캡처링만, Internet Explorer는 버블링만 지원했으나 W3C 표준에서 통합 정의되었다.

### Event.target vs currentTarget

이벤트가 버블링되면서 이벤트 리스너 콜백 내부에서 다음 속성이 달라진다.

| 속성              | 설명                            | 예시에서           |
| :---------------- | :------------------------------ | :----------------- |
| `e.target`        | 실제로 **이벤트가 발생**한 요소 | 클릭한 `밭` button |
| `e.currentTarget` | **이벤트 리스너를 등록**한 요소 | `마당` div         |

## 장점과 단점

### ✅ 장점

- 동적 생성 요소의 이벤트 처리가 가능하다.
- 요소가 추가될 때 마다 이벤트 리스너를 등록해주지 않아도 되어 유지보수가 용이하다.
- 이벤트 리스너의 등록 개수를 줄여 메모리 사용량을 낮출 수 있다.

### ❌ 단점

- 이벤트 버블링이 가능한 이벤트만 처리 가능하다.

## 참고

- [MDN: Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)

- [MDN: Test your skills: Events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Test_your_skills/Events)
- [MDN: Event Phase](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase)
- [DOM Living Standard](https://dom.spec.whatwg.org/)
- [Modern JS Tutorial: Event delegation](https://ko.javascript.info/event-delegation)
