## HTML 레이아웃 요구사항

1.  전체 컨테이너 (`<div class="calculator">`)

    - 계산기의 모든 요소를 감싸는 최상위 div 태그를 만듭니다.
    - 이 컨테이너는 계산기 전체의 스타일과 위치를 제어하는 기준점이 됩니다.

2.  화면 (`<div class="calculator-display">`)

    - 숫자와 결과가 표시될 영역입니다.
    - 전체 컨테이너 바로 아래에 위치해야 합니다.
    - 초기값으로 0을 표시합니다.

3.  버튼 그룹 (`<div class="calculator-buttons">`)

    - 모든 버튼들을 감싸는 컨테이너입니다.
    - 이 컨테이너에 CSS Grid나 Flexbox를 적용하여 버튼을 격자 형태로 쉽게 배치할 수 있습니다.

4.  개별 버튼 (`<button>`)
    - 모든 버튼은 시맨틱한 <button> 태그를 사용합니다.
    - 각 버튼의 역할에 따라 다른 클래스를 부여하여 CSS로 스타일을 다르게 적용하기 쉽게 만듭니다.
      - 숫자 버튼 (0-9, .): .button-number
      - 연산자 버튼 (+, -, \*, /): .button-operator
      - 기능 버튼 (AC, =): .button-function
      - 너비가 넓은 버튼 (0): .button-zero (또는 다른 이름)
