# 정규화

2. 밭과 버섯 데이터, 어떤 자료구조가 베스트인가

```
 > 그럼 밭 객체 하위에 버섯을 관리하는게 좋은 방법일까? 밭 목록과 버섯 목록을 따로 관리하는건 어떨까?  │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────╯

✦ 정말 예리하고 중요한 지적이세요. 데이터 구조를 어떻게 설계하느냐에 따라 앞으로의 기능 추가와 리팩토링 난이도가 결정됩니다. 이 고민은
  프로젝트의 뼈대를 세우는 일과 같아요.

  결론부터 말씀드리면, 밭 목록과 버섯 목록을 따로 관리하는 것(방법 2)이 우리가 지향하는 아키텍처에 훨씬 더 잘 맞습니다. 왜 그런지 두 가지
  방법을 비교하며 설명해 드릴게요.

  ---

  방법 1: 밭 객체 안에 버섯을 포함하는 구조 (현재 방식)

  이 방식은 현실 세계를 그대로 모델링한 것처럼 직관적입니다. "밭(field) 안에 버섯(mushroom)이 있다"는 관계가 코드 구조에 그대로 드러나죠.

  State 구조 예시:

   1 {
   2   fieldMap: {
   3     'field-1': { id: 'field-1', mushroom: { id: 'm-abc', ... } },
   4     'field-2': { id: 'field-2', mushroom: null },
   5     'field-3': { id: 'field-3', mushroom: { id: 'm-xyz', ... } }
   6   }
   7 }

  장점:

   * 직관성: 특정 밭에 있는 버섯을 찾기 쉽습니다. state.fieldMap['field-1'].mushroom.

  단점:

   * 버섯 정보에 대한 단일 진실 공급원(SSOT) 부재: 버섯 데이터가 여러 field 객체에 흩어져 있습니다. 만약 "모든 버섯의 성장 단계를
     체크"하려면, 모든 field를 순회하며 버섯이 있는지 일일이 확인해야 합니다.
   * 복잡한 업데이트 로직: 버섯 하나의 growthStage만 바꾸려고 해도, fieldMap의 특정 field 객체 안의 mushroom 객체를 찾아 업데이트해야
     합니다. 이는 불변성을 지키면서 상태를 업데이트하기 매우 까다롭게 만듭니다. (이전 대화에서 console.log에 업데이트된 값이 바로 찍히지
     않았던 것도 이런 구조의 복잡성 때문일 수 있습니다.)
   * 확장성 문제: 나중에 "도감" 기능을 만들 때, 수확된 버섯을 포함한 모든 버섯의 목록이 필요해집니다. 이 구조에서는 그 목록을 만들기가 매우
     번거롭습니다.

  ---

  방법 2: 밭과 버섯 목록을 분리하는 구조 (추천 방식)

  이 방식은 데이터베이스가 데이터를 관리하는 방식과 유사합니다. 각 데이터(밭, 버섯)는 자신만의 테이블(목록)을 갖고, 서로를 ID로
  참조합니다. 이를 정규화(Normalization)라고 부릅니다.

  State 구조 예시:

    1 {
    2   fields: { // 'fieldMap' -> 'fields'
    3     'field-1': { id: 'field-1', mushroomId: 'm-abc' },
    4     'field-2': { id: 'field-2', mushroomId: null },
    5     'field-3': { id: 'field-3', mushroomId: 'm-xyz' }
    6   },
    7   mushrooms: {
    8     'm-abc': { id: 'm-abc', fieldId: 'field-1', type: 'shiitake', growthStage: 'fruiting', ... },
    9     'm-xyz': { id: 'm-xyz', fieldId: 'field-3', type: 'portobello', growthStage: 'mature', ... }
   10   }
   11 }

  장점:

   * 명확한 단일 진실 공급원(SSOT):
       * 모든 버섯 정보는 state.mushrooms에만 존재합니다.
       * 모든 밭 정보는 state.fields에만 존재합니다.
   * 간단하고 효율적인 업데이트:
       * 모든 버섯의 성장을 체크하려면 그냥 state.mushrooms 객체만 순회하면 됩니다. 더 이상 field를 뒤질 필요가 없습니다.
       * 특정 버섯을 업데이트하는 로직이 매우 단순해집니다. state.mushrooms['m-abc']를 찾아 바로 업데이트하면 끝입니다. 불변성을 지키기도
         훨씬 쉬워집니다.
   * 유연성과 확장성:
       * "도감" 기능은 state.mushrooms 데이터를 활용하면 쉽게 만들 수 있습니다.
       * "밭에 아이템 효과 부여"는 state.fields의 특정 밭 객체에 effect: 'growth-boost' 같은 속성을 추가하면 그만입니다. 버섯 데이터와
         섞이지 않아 깔끔합니다.

  단점:

   * 한 단계 더 거쳐야 함: 특정 밭의 버섯 정보를 알려면, fields에서 mushroomId를 얻고, 그 id를 이용해 mushrooms에서 실제 버섯 데이터를
     가져와야 합니다. 하지만 이 과정은 로직으로 충분히 감출 수 있습니다.

  ---

  결론

  저는 방법 2 (분리된 구조)를 강력하게 추천합니다.

  이 구조가 우리가 지향하는 단방향 데이터 흐름, 불변성, 함수형 프로그래밍 원칙과 완벽하게 일치하기 때문입니다.

   * GameState는 데이터베이스처럼 상태를 정규화해서 저장하고,
   * GameLogic은 이 데이터들을 조합해서 "어떤 밭에 어떤 버섯이 있는지" 같은 정보를 계산(조회)하는 역할을 맡게 됩니다.
   * UIManager는 GameLogic이 조합해준 데이터를 받아 화면에 그리기만 하면 됩니다.

  각 모듈의 역할이 훨씬 더 명확해지죠.

  이 설명이 어떻게 다가오시나요? 이 방향으로 GameState의 구조를 리팩토링하고, 그에 맞춰 GameLogic의 버섯 성장 로직을 구현해보는 것은
  어떨까요?
```
