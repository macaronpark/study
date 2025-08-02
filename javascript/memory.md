TODO:

#### **1단계: 기본기 다지기 - 콜 스택과 메모리 힙의 정체**

이 단계에서는 "콜 스택이 무엇인가?", "힙이 무엇인가?" 그리고 "데이터는 둘 중 어디에 저장되는가?"에 대한 근본적인 개념을 명확히 합니다.

1.  **[CAPTAIN PANGYO - 자바스크립트의 동작원리](https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/)**

    - **이유**: 가장 시각적이고 친절한 설명으로 자바스크립트 엔진과 런타임의 큰 그림 속에서 콜 스택이 어떤 역할을 하는지 먼저 파악합니다. 복잡한 개념에 대한 진입장벽을 낮춰줍니다.

2.  **[MDN - Call stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack)**

    - **이유**: 블로그를 통해 개념을 익힌 후, 가장 신뢰도 높은 MDN의 간결한 정의를 통해 용어에 대한 이해를 확고히 다집니다.

3.  **[Charmin-Kyu - 콜스택/메모리힙 구조, 데이터 저장/참조 원리](https://charming-kyu.tistory.com/19)**

    - **이유**: 콜 스택과 힙이라는 두 공간에 원시값(primitive type)과 참조값(reference type)이 각각 어떻게 저장되는지 구체적으로 보여줍니다. "왜" 두 공간이 필요한지에 대한 근본적인 이해를 돕습니다.

4.  **[MDN - JavaScript Memory management](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Memory_management)**
    - **이유**: 1~3단계에서 배운 스택과 힙 지식을 바탕으로, 메모리 할당-사용-해제라는 전체적인 생명 주기를 공식 문서로 정리합니다. 가비지 컬렉션(GC) 개념도 함께 확인하며 1단계를 마무리합니다.

---

#### **2단계: 동작 원리 이해 - 이벤트 루프와 비동기 처리**

1단계에서 배운 동기적(synchronous) 코드의 실행 장소(콜 스택)를 넘어서, 비동기(asynchronous) 코드가 어떻게 처리되는지 학습합니다.

5.  **[INPA - 자바스크립트 이벤트 루프 동작 구조 & 원리](https://inpa.tistory.com/entry/%F0%9F%94%84-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84-%EA%B5%AC%EC%A1%B0-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC)**

    - **이유**: 콜 스택, 힙, 태스크 큐, 마이크로태스크 큐, 이벤트 루프의 관계를 종합적으로, 그리고 매우 상세하게 설명합니다. 비동기 처리의 핵심 메커니즘을 이해하는 데 가장 효과적인 자료입니다.

6.  **[jakearchibald - Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)**

    - **이유**: INPA 블로그로 개념을 잡은 후, 세계적인 개발자가 작성한 이 글로 태스크와 마이크로태스크의 차이와 실행 순서를 더 깊이 있게 파고듭니다. 특히 Promise(`then`)와 `setTimeout`의 동작 순서가 헷갈릴 때 결정적인 도움을 줍니다.

7.  **[MDN - JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)**
    - **이유**: 블로그를 통해 습득한 지식을 공식 문서의 용어(Task, Microtask 등)와 매칭하며 최종적으로 개념을 표준에 맞게 정리합니다.

> **💡 학습 팁: Loupe 활용하기**
> 2단계 학습을 진행하는 동안 **[Loupe](http://latentflip.com/loupe/)**를 계속 활용하세요. `setTimeout`, `Promise.resolve().then()`, `fetch`와 같은 코드를 직접 입력하며 **콜 스택, Web APIs, Callback Queue, Microtask Queue** 사이에서 태스크들이 어떻게 이동하고 실행되는지 **눈으로 직접 확인**하면 이해도가 비약적으로 상승합니다. Loupe는 읽는 자료가 아니라, 1~7번 자료를 공부하며 계속 사용하는 **실습 도구**입니다.

---

#### **3단계: 심화 학습 - V8 엔진과 Node.js**

기본적인 동작 원리를 모두 이해했다면, 이제 특정 환경(V8 엔진, Node.js)에서 메모리 관리와 이벤트 루프가 어떻게 구현되어 있는지 깊이 있게 들여다볼 차례입니다.

8.  **[Technorage - Visualizing memory management in V8 Engine](https://deepu.tech/memory-management-in-v8/) (또는 [TOAST UI 번역본](https://ui.toast.com/weekly-pick/ko_20200228))**

    - **이유**: 1단계에서 배운 일반적인 메모리 관리 개념이 실제 V8 엔진에서는 'Generational Garbage Collector' 같은 구체적인 기술로 어떻게 구현되는지 보여줍니다. 'Old Space', 'New Space' 등의 개념을 통해 지식을 한층 더 구체화할 수 있습니다.

9.  **[Node.js - The Node.js Event Loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#event-loop-explained)**
    - **이유**: 브라우저의 이벤트 루프와 미묘한 차이가 있는 Node.js의 이벤트 루프를 학습합니다. `timers`, `I/O`, `poll`, `check` 등 Node.js 고유의 이벤트 루프 '단계(phase)'를 이해하게 됩니다. 이 문서는 브라우저 이벤트 루프를 완벽히 이해한 후에 봐야 혼란이 없습니다.

이 순서대로 학습하면 단편적인 지식이 아닌, 서로 유기적으로 연결된 자바스크립트의 핵심 동작 원리를 체계적으로 습득할 수 있을 것입니다.
