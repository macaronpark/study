# MVC, MVP, MVVM <!-- omit from toc -->

**사용자 인터페이스(UI)와 비즈니스 로직을 분리**하기 위한 대표적인 아키텍처 패턴.

React는 엄밀히 말하면 이 패턴들에 속하지 않는다. **React는 컴포넌트 기반 아키텍처**라서 View와 Controller 역할이 컴포넌트 안에 합쳐져 있다.
다만, Custom Hook이나 상태 관리 로직 분리를 통해 MVP/MVVM과 유사한 구조를 만들 수는 있다.

<br>

- [MVC (Model–View–Controller)](#mvc-modelviewcontroller)
- [MVP (Model–View–Presenter)](#mvp-modelviewpresenter)
- [MVVM (Model–View–ViewModel)](#mvvm-modelviewviewmodel)
- [참고](#참고)

<br>

## MVC (Model–View–Controller)

- 역할
  - Model: 데이터, 비즈니스 로직
  - View: UI
  - Controller: 사용자 입력 처리, Model과 View 사이 조율
- 문제
  - 규모가 커질수록 Model–View–Controller 간 의존성이 복잡해짐
  - View와 Controller 간 강결합 발생 → 유지보수 어려움
  - "Fat Controller"보다 "Fat Model" 문제가 더 큼
- 예시
  - 전통적인 웹 프레임워크 (Rails, Django)
- React와 비교
  - React 컴포넌트는 View + Controller 역할을 함께 담당
  - MVC는 각 요소가 더 명확히 분리되어 있음

## MVP (Model–View–Presenter)

- 역할
  - Model: 데이터, 비즈니스 로직
  - View: UI, 사용자 입력 처리: View는 단순히 표시만 하고, Presenter가 로직을 책임짐
  - Presenter: 화면에 보여질 데이터 관리, View와 Model 중개
- 문제
  - 화면이 늘어날수록 Presenter 개수도 많아짐 → 유지보수 비용 증가
- 예시
  - 예전 Android 개발에서 많이 사용됨 (현재는 MVVM이 주류)
- React와 비교
  - Custom Hook이 Presenter 역할과 유사
  - Hook이 비즈니스 로직을 담당하고, 컴포넌트는 UI만 담당

## MVVM (Model–View–ViewModel)

- 역할
  - Model: 데이터, 비즈니스 로직
  - View: UI, 사용자 입력 처리, View ↔ ViewModel 양방향 데이터 바인딩
  - View Model: View에 필요한 데이터와 상태를 가짐. 여러 View에서 공유 가능 (1:n 관계)
- 예시
  - Angular, Vue.js
- React와 비교
  - React의 useState, useReducer는 ViewModel과 비슷한 역할
  - 하지만 React는 **단방향 데이터 흐름**(one-way binding)이 특징
    - State → View로만 흐르고, View에서 Model을 직접 바꾸지 않음

## 참고

- [곰튀김 - MVC, MVP, MVVM 차이점 알아보기](https://www.youtube.com/watch?v=bjVAVm3t5cQ)
