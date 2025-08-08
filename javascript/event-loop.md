# 이벤트 루프 (Event loop)

- [이벤트 루프 (Event loop)](#이벤트-루프-event-loop)
  - [개념](#개념)
  - [비동기 작업이 처리되는 방식](#비동기-작업이-처리되는-방식)

## 개념

- 자바스크립트

  - 싱글 스레드 기반 언어
    - 자바스크립트 엔진이 단일 Call Stack을 사용함
    - 한 번에 하나의 작업 처리

- 브라우저의 비동기 작업 처리
  - 자바스크립트가 실행되는 브라우저 환경에서는 여러 스레드 사용
  - Web API를 통해 비동기 작업 별도 처리
    - 예: setTimeout은 브라우저의 타이머 스레드에서 실행되고, 완료 후 콜백은 MacroTask Queue에 등록
  - 이 환경에서 자바스크립트이 Call Stack과 상호작용하기 위한 장치 => Event Loop
  - 참고: 멀티 스레드가 필요하다면 Web Worker를 사용할 수 있음

## 비동기 작업이 처리되는 방식

<img alt="Event loop" src="https://pozafly.github.io/static/8777e58593e15d2b8520249052ba6463/d2d42/1.png"/>

- Call Stack
  - 함수가 호출되면 Call Stack에 push
  - 실행이 끝나면 pop
- Web API
  - `setTimeout`, `setInterval`, `fetch`, `DOM 이벤트` 등 비동기 API를 브라우저가 담당
  - 완료되면 콜백을 큐에 등록
- Queue
  - MacroTask Queue
    - `setTimeout`, `setInterval`, `I/O`, `setImmediate` 등의 콜백 등록
  - MicroTask Queue
    - `Promise.then`, `queueMicrotask`, `MutationObserver` 등의 콜백 등록
    - Web API가 아닌 **자바스크립트 엔진 내부에서 직접 처리되는 비동기 작업**
- 이벤트 루프
  - Call Stack이 비었을 때 실행
  - 먼저 **MicroTask Queue를 모두 비운 후**, MacroTask Queue에서 콜백을 하나씩 꺼내 Call Stack으로 가져와 실행
