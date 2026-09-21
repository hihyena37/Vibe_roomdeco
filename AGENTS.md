# Room Decorator — Agent Guide

## 1. Project Goal

React + Vite 기반의 반응형 2D Room Decorator를 제작한다.

사용자는 다음 공간 중 하나를 선택할 수 있다.

- Home
- Office
- Cafe
- Hospital
- Restaurant

선택한 공간에 어울리는 가구와 소품을 배치하여 공간을 꾸미는 것이 핵심 기능이다.

실제 게임처럼 복잡한 시스템을 구현할 필요는 없다.

간단하고 직관적인 공간 꾸미기 웹 애플리케이션을 목표로 한다.

---

## 2. Development Environment

- React
- Vite
- JavaScript
- CSS
- npm

TypeScript 또는 다른 Framework로 변경하지 않는다.

기존 React + Vite 프로젝트를 유지한다.

---

## 3. Supported Devices

다음 환경을 모두 지원한다.

- PC
- Tablet
- Mobile

기준 화면:

- PC: 1920px
- Tablet: 768px
- Mobile: 360px

단순히 PC 화면을 축소하지 않고 각 화면 크기에 맞게 UI를 재배치한다.

---

## 4. Main User Flow

```text
Space Selection
↓
Room Editor
↓
Furniture Category
↓
Furniture Selection
↓
Furniture Placement
↓
Move / Rotate / Delete
↓
Complete
```

복잡한 퀘스트, 점수, 레벨, 캐릭터 등의 게임 기능은 만들지 않는다.

---

## 5. Space Selection

첫 화면에서 다음 공간을 선택할 수 있도록 한다.

```text
Home
Office
Cafe
Hospital
Restaurant
```

공간을 선택하면 해당 공간의 Room Editor로 이동한다.

---

## 6. Furniture System

공간에 따라 사용할 수 있는 가구와 소품을 다르게 제공한다.

### Home

- Sofa
- Chair
- Table
- Bed
- Storage
- Lighting
- Plant
- Decoration

### Office

- Desk
- Office Chair
- Table
- Storage
- Partition
- Lighting
- Plant
- Decoration

### Cafe

- Cafe Table
- Chair
- Stool
- Sofa
- Counter
- Lighting
- Plant
- Decoration

### Hospital

- Medical Bed
- Chair
- Desk
- Storage
- Medical Cart
- Partition
- Plant

### Restaurant

- Dining Table
- Chair
- Bench
- Counter
- Lighting
- Plant
- Decoration

---

## 7. Furniture Variety

하나의 Category에 하나의 가구만 만들지 않는다.

같은 종류에서도 여러 디자인을 선택할 수 있도록 한다.

단, 지나치게 많은 아이템은 만들지 않는다.

한 Category당 약 3~6개 정도를 기본으로 한다.

예:

```text
Sofa

- Fabric Sofa
- Rounded Sofa
- Modular Sofa
- Lounge Sofa
- Leather Sofa
```

```text
Chair

- Wood Chair
- Fabric Chair
- Office Chair
- Lounge Chair
- Stool
```

공간별 전체 가구 수는 구현과 디자인 관리가 가능한 수준으로 유지한다.

---

## 8. Furniture Data

가구는 JSX에 하나씩 직접 작성하지 않고 Data로 관리한다.

권장 파일:

```text
src/data/furniture.js
```

예:

```js
{
  id: 'sofa-01',
  name: 'Rounded Sofa',
  category: 'sofa',
  spaces: ['home', 'cafe'],
  image: '/assets/furniture/sofa-01.png',
  width: 180,
  height: 90
}
```

공간 데이터도 별도로 관리한다.

```text
src/data/spaces.js
```

---

## 9. Room Editor

PC 기준 Room Editor는 다음 구조를 사용한다.

```text
┌──────────────────────────────────────────────┐
│ Header                                       │
├────────────┬──────────────────┬──────────────┤
│ Furniture  │                  │ Inspector    │
│ Panel      │   Room Canvas    │ Panel        │
│            │                  │              │
└────────────┴──────────────────┴──────────────┘
```

### Furniture Panel

- Category 선택
- Furniture 목록
- Furniture 추가

### Room Canvas

- Furniture 배치
- Furniture 선택
- Furniture 이동

### Inspector Panel

- Furniture 이름
- Rotate
- Delete

---

## 10. Main Features

반드시 구현할 기능은 다음과 같다.

### Furniture Add

Furniture Panel에서 가구를 선택하면 Room Canvas에 추가한다.

같은 가구도 여러 개 추가할 수 있다.

### Furniture Select

Canvas의 가구를 클릭 또는 터치하면 선택된다.

선택된 가구는 Outline 등으로 구분한다.

### Furniture Move

가구를 Drag하여 이동할 수 있다.

PC에서는 Mouse, Tablet과 Mobile에서는 Touch를 지원한다.

가능하면 Pointer Event를 사용한다.

### Furniture Rotate

선택한 가구를 90도 단위로 회전한다.

```text
0° → 90° → 180° → 270° → 0°
```

### Furniture Delete

선택한 가구를 삭제한다.

### Room Reset

현재 Room에 배치된 모든 가구를 제거한다.

### Change Space

다른 공간으로 변경할 수 있다.

---

## 11. Responsive UI

### PC

다음 영역을 동시에 보여준다.

```text
Furniture Panel
Room Canvas
Inspector Panel
```

### Tablet

Room Canvas를 넓게 유지하고 Furniture 또는 Inspector Panel 크기를 줄인다.

필요하면 Panel을 열고 닫을 수 있도록 한다.

### Mobile

Room Canvas를 중심으로 구성한다.

Furniture와 Editing 기능은 다음과 같은 형태를 사용할 수 있다.

- Bottom Sheet
- Bottom Toolbar
- Drawer

Mobile에서도 다음 기능을 모두 사용할 수 있어야 한다.

- Furniture 추가
- Furniture 선택
- Furniture 이동
- Rotate
- Delete
- Reset
- Space 변경

---

## 12. Recommended Component Structure

```text
App
│
├─ SpaceSelect
│  └─ SpaceCard
│
└─ RoomEditor
   ├─ Header
   ├─ FurniturePanel
   ├─ RoomCanvas
   │  └─ FurnitureItem
   └─ InspectorPanel
```

모든 코드를 `App.jsx` 하나에 작성하지 않는다.

---

## 13. Recommended Project Structure

```text
src/
├─ components/
├─ data/
│  ├─ spaces.js
│  └─ furniture.js
├─ pages/
│  ├─ SpaceSelect.jsx
│  └─ RoomEditor.jsx
├─ styles/
├─ App.jsx
└─ main.jsx

public/
└─ assets/
   ├─ furniture/
   └─ spaces/
```

필요한 파일만 생성한다.

불필요하게 복잡한 Folder 구조를 만들지 않는다.

---

## 14. Development Rules

다음 원칙을 지킨다.

- 기존 사용자가 작성한 코드를 우선 보존한다.
- 기존 파일을 확인하지 않고 전체 코드를 덮어쓰지 않는다.
- 불필요한 npm Package를 설치하지 않는다.
- Furniture와 Space는 Data 기반으로 관리한다.
- 반복되는 UI는 Component로 만든다.
- PC / Tablet / Mobile을 함께 고려한다.
- 복잡한 게임 시스템은 구현하지 않는다.
- 필요 이상의 Animation을 추가하지 않는다.
- 디자인보다 기능을 무조건 우선하지 않고 둘의 균형을 유지한다.

---

## 15. Do Not Add

사용자의 별도 요청이 없다면 다음 기능은 만들지 않는다.

- Login
- Sign Up
- Backend
- Database
- Multiplayer
- Payment
- Shopping
- 3D
- AR / VR
- AI Interior Recommendation
- Character
- Level
- Score
- Quest
- Achievement

Room Decorator의 핵심 기능에 집중한다.

---

## 16. Development Order

다음 순서로 개발한다.

```text
1. Space Data
2. Space Selection
3. Room Editor Layout
4. Furniture Data
5. Furniture Category
6. Furniture Add
7. Furniture Select
8. Furniture Move
9. Rotate / Delete
10. Room Reset
11. Tablet Responsive
12. Mobile Responsive
13. UI Refinement
14. Final Test
```

한 번에 전체 프로젝트를 만들기보다 단계별로 구현하고 정상 동작을 확인한다.

---

## 17. Completion Criteria

다음 조건을 충족하면 기본 프로젝트가 완성된 것으로 판단한다.

- Home / Office / Cafe / Hospital / Restaurant 선택 가능
- 공간에 따라 다른 Furniture 표시
- 같은 Category에서 여러 Furniture 선택 가능
- 같은 Furniture 여러 개 배치 가능
- Furniture 선택 가능
- Furniture Drag 이동 가능
- 90도 Rotate 가능
- Delete 가능
- Room Reset 가능
- Space 변경 가능
- PC에서 정상 동작
- Tablet에서 정상 동작
- Mobile에서 정상 동작
- Mouse와 Touch 모두 사용 가능
- React Runtime Error가 발생하지 않음

---

## 18. Current Project State

현재 다음 작업은 완료된 상태이다.

```text
Node.js 설치
npm 설치
React + Vite 프로젝트 생성
개발 서버 실행
```

Vite 기본 콘텐츠는 제거되었다.

삭제된 파일:

```text
App.css
index.css
```

`main.jsx`의 다음 코드도 삭제된 상태이다.

```js
import './index.css'
```

삭제된 Vite 기본 CSS를 다시 복구하지 않는다.

---

## Final Direction

Room Decorator는 복잡한 게임이 아니라 사용자가 다양한 공간과 가구를 선택하고 직접 배치해볼 수 있는 가벼운 2D 공간 꾸미기 웹 애플리케이션이다.

가장 중요한 목표는 다음과 같다.

1. 사용하기 쉬울 것
2. 가구를 직접 선택하고 배치하는 재미가 있을 것
3. PC / Tablet / Mobile에서 사용할 수 있을 것
4. React 프로젝트 구조가 명확할 것
5. 포트폴리오에서 디자인과 개발 역량을 함께 보여줄 수 있을 것