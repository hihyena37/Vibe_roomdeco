# Room Decorator

React 기반의 반응형 2D 공간 꾸미기 웹 애플리케이션입니다.

사용자는 집, 사무실, 카페, 병원, 식당 등 원하는 공간을 선택하고, 공간의 목적과 분위기에 적합한 다양한 가구와 소품을 직접 배치하여 자신만의 공간을 구성할 수 있습니다.

PC, Tablet, Mobile 환경을 모두 지원하며 마우스와 터치 입력에 대응하는 인터랙티브 Room Editor 구현을 목표로 합니다.

---

## 1. Project Overview

### Project Name

Room Decorator

### Project Type

2D Space Decorating Web Application

### Platform

- PC
- Tablet
- Mobile

### Development Environment

- React
- Vite
- JavaScript
- CSS
- npm

### Project Summary

Room Decorator는 여러 종류의 공간을 선택한 후 해당 공간에 적합한 가구와 소품을 자유롭게 배치할 수 있는 2D 공간 꾸미기 서비스입니다.

단순한 이미지 배치 기능이 아니라 다음 요소를 중심으로 구성합니다.

- 공간 선택
- 공간별 가구 제공
- 동일 카테고리 내 다양한 디자인 선택
- 가구 배치
- 가구 이동
- 가구 선택
- 가구 회전
- 가구 삭제
- 공간 초기화
- 반응형 UI
- Mouse / Touch Interaction

---

## 2. Background

기존의 일반적인 웹 포트폴리오 프로젝트는 정보 제공이나 정적인 UI 구성에 집중하는 경우가 많습니다.

Room Decorator는 사용자가 직접 화면 안의 객체를 선택하고 이동시키는 인터랙션을 중심으로 구성하여 React의 상태 관리와 사용자 인터랙션 구현 능력을 함께 보여주는 것을 목적으로 합니다.

또한 하나의 특정 공간만 꾸미는 방식이 아니라 다양한 목적의 공간을 선택할 수 있도록 설계합니다.

지원 공간:

- Home
- Office
- Cafe
- Hospital
- Restaurant

각 공간은 동일한 가구 목록을 사용하는 것이 아니라 공간 특성에 맞는 가구와 소품을 제공합니다.

예를 들어 병원에서는 Medical Bed와 Medical Cart를 사용할 수 있고, 카페에서는 Cafe Counter와 Stool 등을 사용할 수 있도록 구성합니다.

---

## 3. Project Goal

본 프로젝트의 목표는 사용자가 공간의 목적과 개인 취향에 따라 다양한 가구를 선택하고 자유롭게 배치할 수 있는 반응형 Room Editor를 구현하는 것입니다.

주요 목표는 다음과 같습니다.

### UI / UX

- 공간 선택부터 완성까지 자연스러운 사용자 흐름 제공
- 복잡하지 않은 Room Editor UI 구성
- 가구 탐색과 배치 과정의 직관성 확보
- PC / Tablet / Mobile 환경별 적절한 인터페이스 제공

### Front-end

- React 기반 컴포넌트 설계
- React State 기반 객체 상태 관리
- 데이터 기반 UI 렌더링
- 공간 및 카테고리 필터링
- Pointer 기반 Drag Interaction
- 반응형 Layout 구현

### Portfolio

다음 역량을 하나의 프로젝트에서 보여주는 것을 목표로 합니다.

- UI / UX 설계
- React 활용
- 상태 관리
- 데이터 구조 설계
- 사용자 인터랙션 구현
- 반응형 웹 구현
- 컴포넌트 구조 설계

---

## 4. Core Concept

Room Decorator의 핵심 콘셉트는 다음과 같습니다.

> 다양한 목적의 공간과 여러 디자인의 가구를 활용하여 사용자가 자신만의 공간을 자유롭게 구성하는 2D 공간 스타일링 서비스

본 프로젝트는 정답이 정해진 미션형 게임보다 자유로운 공간 구성 경험을 중심으로 합니다.

사용자는 다음 과정을 통해 공간을 구성합니다.

```text
공간 선택
↓
Room Editor 진입
↓
가구 카테고리 탐색
↓
가구 선택
↓
가구 배치
↓
위치 조정
↓
회전 / 삭제 / 추가
↓
공간 완성
```

---

## 5. Target Environment

Room Decorator는 PC, Tablet, Mobile을 모두 지원하는 반응형 웹 애플리케이션으로 개발합니다.

### 기준 화면

| Device | 기준 |
|---|---:|
| PC | 1920px |
| Tablet | 768px |
| Mobile | 360px |

단순히 PC UI를 축소하는 방식이 아니라 기기 특성에 따라 Editor UI를 재배치합니다.

### PC

PC에서는 넓은 화면을 활용하여 주요 패널을 동시에 표시합니다.

```text
Furniture Panel
+
Room Canvas
+
Inspector Panel
```

Mouse Drag를 중심으로 가구를 조작합니다.

### Tablet

Tablet에서는 Canvas 영역을 최대한 확보하기 위해 Inspector와 Furniture Panel의 크기를 축소하거나 필요에 따라 열고 닫을 수 있도록 구성합니다.

Mouse 및 Touch 입력을 모두 고려합니다.

### Mobile

Mobile에서는 좌우 패널을 항상 노출하지 않습니다.

가구 목록과 편집 기능은 다음 형태를 검토합니다.

- Bottom Sheet
- Drawer
- Modal Panel

Room Canvas를 화면의 중심으로 유지합니다.

---

## 6. Supported Spaces

초기 버전에서는 다음 5개 공간을 제공합니다.

| Space | Description | 주요 가구 |
|---|---|---|
| Home | 주거 및 생활 공간 | Sofa, Bed, Table, Storage |
| Office | 업무 및 협업 공간 | Office Desk, Chair, Partition |
| Cafe | 음료 및 휴식 공간 | Cafe Table, Stool, Counter |
| Hospital | 진료 및 대기 공간 | Medical Bed, Medical Cart, Chair |
| Restaurant | 식사 및 서비스 공간 | Dining Table, Chair, Counter |

공간 정보는 JSX에 직접 작성하지 않고 별도의 데이터 구조로 관리합니다.

예:

```js
{
  id: 'home',
  name: 'Home',
  description: '편안한 나만의 생활 공간',
  thumbnail: '/assets/spaces/home.webp'
}
```

향후 공간 데이터를 추가하여 새로운 공간을 확장할 수 있도록 설계합니다.

---

## 7. Furniture System

가구와 소품은 크게 Common Item과 Space Specific Item으로 구분합니다.

### Common Item

여러 공간에서 공통으로 사용할 수 있는 아이템입니다.

예:

- Sofa
- Chair
- Table
- Storage
- Lighting
- Plant
- Decoration
- Rug

### Space Specific Item

특정 공간의 목적에 맞게 제공되는 아이템입니다.

예:

| Item | Available Space |
|---|---|
| Bed | Home |
| Office Desk | Office |
| Partition | Office |
| Cafe Counter | Cafe |
| Stool | Cafe |
| Medical Bed | Hospital |
| Medical Cart | Hospital |
| Dining Table | Restaurant |

### Furniture Variety

한 카테고리에 하나의 가구만 제공하지 않습니다.

예:

```text
Sofa

├─ Fabric Sofa
├─ Rounded Sofa
├─ Modular Sofa
├─ Lounge Sofa
└─ Leather Sofa
```

```text
Chair

├─ Wood Chair
├─ Fabric Chair
├─ Office Chair
├─ Lounge Chair
└─ Stool
```

```text
Table

├─ Round Table
├─ Square Table
├─ Wood Table
├─ Steel Table
└─ Side Table
```

가구 선택 자체가 공간 디자인 과정의 일부가 되도록 동일 카테고리 내에서도 형태와 스타일이 다른 선택지를 제공합니다.

---

## 8. Main Features

### 8.1 Space Selection

사용자가 꾸미고 싶은 공간을 선택합니다.

```text
Home
Office
Cafe
Hospital
Restaurant
```

선택한 공간 정보를 기반으로 Room Editor의 가구 목록을 구성합니다.

---

### 8.2 Furniture Catalog

현재 공간에서 사용할 수 있는 가구와 소품을 표시합니다.

각 Furniture Card에는 기본적으로 다음 정보를 제공합니다.

- Thumbnail
- Furniture Name
- Category

필요한 경우 Style 정보를 추가할 수 있습니다.

---

### 8.3 Space Filter

현재 선택한 공간에서 사용할 수 있는 가구만 표시합니다.

예:

```js
item.spaces.includes(selectedSpace)
```

---

### 8.4 Category Filter

가구를 종류별로 확인할 수 있습니다.

공통 카테고리 예:

```text
All
Sofa
Chair
Table
Storage
Lighting
Plant
Decoration
```

공간에 따라 전용 카테고리를 추가할 수 있습니다.

---

### 8.5 Furniture Placement

Furniture Catalog에서 선택한 아이템을 Room Canvas에 추가합니다.

동일한 가구도 여러 개 배치할 수 있습니다.

각 배치 객체는 독립된 Instance ID를 갖습니다.

---

### 8.6 Furniture Selection

Room Canvas에 배치된 가구를 선택할 수 있습니다.

선택된 가구에는 다음과 같은 시각적 상태를 제공합니다.

- Outline
- Bounding Box
- Selected State

빈 Canvas 영역을 선택하면 현재 선택 상태를 해제합니다.

---

### 8.7 Furniture Move

배치된 가구를 원하는 위치로 이동할 수 있습니다.

PC:

```text
Mouse Drag
```

Tablet / Mobile:

```text
Touch Drag
```

Pointer Event를 기준으로 구현하여 Mouse와 Touch 입력을 통합적으로 처리합니다.

---

### 8.8 Furniture Rotate

선택한 가구를 회전할 수 있습니다.

MVP에서는 90도 단위 회전을 사용합니다.

```text
0°
↓
90°
↓
180°
↓
270°
↓
0°
```

예:

```js
rotation = (rotation + 90) % 360
```

---

### 8.9 Furniture Delete

선택한 가구를 Room Canvas에서 제거할 수 있습니다.

Inspector 또는 Mobile Editing UI에서 Delete 기능을 제공합니다.

---

### 8.10 Room Reset

현재 공간에 배치된 가구를 모두 제거하고 빈 공간 상태로 초기화합니다.

사용자의 실수로 전체 작업이 삭제되지 않도록 확인 UI 적용을 검토합니다.

---

### 8.11 Change Space

현재 작업 중인 공간에서 다른 공간으로 이동할 수 있습니다.

공간 변경 시 새로운 공간에 적합한 Furniture Catalog를 표시합니다.

---

## 9. User Flow

기본 사용자 흐름은 다음과 같습니다.

```text
Service Start
      ↓
Space Selection
      ↓
Select Space
      ↓
Room Editor
      ↓
Furniture Category
      ↓
Furniture Selection
      ↓
Furniture Placement
      ↓
Furniture Select
      ↓
Move / Rotate / Delete
      ↓
Additional Furniture
      ↓
Complete Room
```

사용자는 공간을 완성하기 위해 필요한 만큼 Furniture Selection과 Editing 과정을 반복할 수 있습니다.

---

## 10. Room Editor Structure

### PC

```text
┌─────────────────────────────────────────────────────────┐
│ Header                                                  │
├──────────────┬──────────────────────────┬───────────────┤
│              │                          │               │
│ Furniture    │                          │ Inspector     │
│ Panel        │       Room Canvas        │ Panel         │
│              │                          │               │
│              │                          │               │
└──────────────┴──────────────────────────┴───────────────┘
```

### Tablet

```text
┌──────────────────────────────────────┐
│ Header                               │
├──────────┬───────────────────────────┤
│ Furniture│                           │
│ Panel    │       Room Canvas         │
│          │                           │
└──────────┴───────────────────────────┘

Inspector → 필요 시 별도 Panel
```

### Mobile

```text
┌──────────────────────┐
│ Header               │
├──────────────────────┤
│                      │
│     Room Canvas      │
│                      │
│                      │
├──────────────────────┤
│ Furniture / Edit     │
│ Bottom UI            │
└──────────────────────┘
```

Mobile에서는 Room Canvas 면적 확보를 최우선으로 합니다.

---

## 11. Data Structure

가구 데이터는 UI Component와 분리하여 관리합니다.

예:

```js
{
  id: 'sofa-rounded-01',
  name: 'Rounded Sofa',
  category: 'sofa',

  spaces: [
    'home',
    'cafe'
  ],

  style: [
    'modern',
    'soft'
  ],

  image: '/assets/furniture/sofa-rounded-01.webp',

  width: 180,
  height: 90
}
```

### Furniture Data

주요 속성:

| Property | Description |
|---|---|
| id | 가구 고유 ID |
| name | 가구명 |
| category | 가구 분류 |
| spaces | 사용 가능 공간 |
| style | 스타일 태그 |
| image | 이미지 경로 |
| width | 기본 가로 크기 |
| height | 기본 세로 크기 |

### Placed Item Data

Room Canvas에 실제 배치된 가구는 별도 데이터로 관리합니다.

```js
{
  instanceId: 'instance-001',
  furnitureId: 'sofa-rounded-01',

  x: 320,
  y: 210,

  rotation: 0
}
```

같은 가구를 여러 개 배치할 수 있으므로 원본 `furnitureId`와 별도의 `instanceId`를 사용합니다.

---

## 12. State Management

초기 버전에서는 React 기본 State를 중심으로 관리합니다.

주요 상태:

```js
selectedSpace
selectedCategory
placedItems
selectedItemId
```

### selectedSpace

현재 선택된 공간을 관리합니다.

예:

```text
home
office
cafe
hospital
restaurant
```

### selectedCategory

현재 Furniture Panel에서 선택된 카테고리를 관리합니다.

### placedItems

현재 Canvas에 배치되어 있는 모든 가구의 위치와 회전 정보를 관리합니다.

### selectedItemId

현재 사용자가 선택한 가구 Instance를 관리합니다.

계산을 통해 구할 수 있는 값은 별도의 State로 중복 저장하지 않습니다.

---

## 13. Component Structure

기본 컴포넌트 구조는 다음과 같습니다.

```text
App
│
├─ SpaceSelect
│  └─ SpaceCard
│
└─ RoomEditor
   │
   ├─ Header
   │
   ├─ FurniturePanel
   │  ├─ CategoryTabs
   │  └─ FurnitureCard
   │
   ├─ RoomCanvas
   │  └─ FurnitureItem
   │
   └─ InspectorPanel
```

Mobile UI 확장 시 다음과 같은 Component를 추가할 수 있습니다.

```text
MobileFurnitureSheet
MobileInspector
EditorToolbar
```

컴포넌트는 화면 단위가 아니라 역할과 책임을 기준으로 분리합니다.

---

## 14. Project Structure

예상 프로젝트 구조는 다음과 같습니다.

```text
room-decorator/
│
├─ public/
│  └─ assets/
│     ├─ furniture/
│     └─ spaces/
│
├─ src/
│  ├─ components/
│  │  ├─ common/
│  │  ├─ furniture/
│  │  ├─ room/
│  │  └─ space/
│  │
│  ├─ data/
│  │  ├─ furniture.js
│  │  └─ spaces.js
│  │
│  ├─ pages/
│  │  ├─ SpaceSelect.jsx
│  │  └─ RoomEditor.jsx
│  │
│  ├─ styles/
│  │
│  ├─ utils/
│  │
│  ├─ App.jsx
│  └─ main.jsx
│
├─ AGENTS.md
├─ README.md
├─ package.json
└─ vite.config.js
```

모든 폴더를 미리 생성하지 않고 실제 기능 구현 과정에서 필요한 구조를 순차적으로 생성합니다.

---

## 15. Development Environment

### Framework

React

### Build Tool

Vite

### Language

JavaScript

### Styling

CSS

### Package Manager

npm

### Version Control

Git

### Install

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Build Preview

```bash
npm run preview
```

---

## 16. MVP Scope

초기 MVP에서는 Room Decorator의 핵심 편집 경험을 완성합니다.

### Space

- Home
- Office
- Cafe
- Hospital
- Restaurant

### Furniture

- 공간별 가구 데이터
- 공용 가구
- 공간 전용 가구
- 동일 카테고리 내 복수 디자인
- 가구 이미지 표시

### Filtering

- 공간별 Filter
- Category Filter

### Editing

- Add
- Select
- Move
- Rotate
- Delete
- Reset

### Responsive

- PC
- Tablet
- Mobile

### Input

- Mouse
- Touch

MVP 단계부터 모든 주요 기능을 PC, Tablet, Mobile에서 사용할 수 있도록 구현합니다.

---

## 17. Out of Scope

초기 MVP에서는 핵심 Room Editor의 완성도에 집중하며 다음 기능은 1차 개발 범위에서 제외합니다.

### Account

- 회원가입
- 로그인
- 사용자 계정

### Server

- 별도 Backend Server
- Database
- Cloud Sync

### Social

- Multi Player
- 공간 공동 편집
- 사용자 커뮤니티

### Commerce

- 실제 가구 구매
- 쇼핑몰 연동
- 결제 기능

### Advanced Technology

- 3D Rendering
- AR
- VR
- AI 자동 인테리어

해당 기능은 MVP 완료 후 필요성과 구현 비용을 검토하여 별도 확장합니다.

---

## 18. Completion Criteria

다음 조건을 모두 만족했을 때 Room Decorator MVP가 완료된 것으로 판단합니다.

### Space

- 5개 공간을 모두 선택할 수 있다.
- 선택한 공간으로 정상 이동할 수 있다.
- 공간 변경이 가능하다.

### Furniture

- 공간에 맞는 가구만 표시된다.
- 공용 가구와 공간 전용 가구가 정상적으로 구분된다.
- 동일 카테고리 내 여러 디자인을 선택할 수 있다.
- 동일한 가구를 여러 번 배치할 수 있다.

### Editing

- 각각의 가구를 독립적으로 선택할 수 있다.
- 가구를 이동할 수 있다.
- 가구를 90도 단위로 회전할 수 있다.
- 선택한 가구를 삭제할 수 있다.
- 배치된 모든 가구를 초기화할 수 있다.

### Responsive

주요 기능이 다음 환경에서 정상적으로 동작해야 합니다.

- PC
- Tablet
- Mobile

### Input

- Mouse 기반 Interaction
- Touch 기반 Interaction

### Development

- 공간 데이터와 UI가 분리되어 있다.
- Furniture 데이터와 UI가 분리되어 있다.
- 주요 기능이 `App.jsx` 하나에 집중되어 있지 않다.
- 중복되는 UI 구조가 Component로 분리되어 있다.
- 주요 사용자 흐름에서 Runtime Error가 발생하지 않는다.

---

## 19. Future Features

MVP 이후 서비스 확장 단계에서 다음 기능을 검토합니다.

### Editing

- Undo
- Redo
- Duplicate
- Resize
- Layer Control
- Grid
- Snap to Grid

### Interior

- Wall Color
- Wall Material
- Floor Color
- Floor Material
- Room Theme
- Style Filter

### Room

- 다양한 Room Shape
- 공간 크기 선택
- 사용자 정의 Room Size

### Saving

- Local Storage
- 프로젝트 저장
- 프로젝트 불러오기
- 여러 프로젝트 관리

### Export

- 완성 공간 이미지 저장
- Before / After 비교
- 공유용 이미지 생성

### Advanced

- 자동 인테리어 추천
- 가구 검색
- 즐겨찾기
- 최근 사용 가구
- 사용 빈도 기반 추천

---

## 20. Design & UX Direction

전체 디자인 방향은 다음 키워드를 기준으로 합니다.

```text
Clean
Modern
Minimal
Playful
Interior
Editor
```

### Visual Hierarchy

Room Canvas를 화면에서 가장 중요한 영역으로 설정합니다.

Furniture Panel과 Inspector는 사용자의 편집 작업을 지원하는 보조 요소로 구성합니다.

### Interaction

사용자가 별도의 설명을 읽지 않아도 다음 행동을 이해할 수 있도록 설계합니다.

```text
선택
배치
이동
회전
삭제
```

### Device UX

PC에서는 넓은 화면을 활용하여 정보와 편집 UI를 동시에 제공합니다.

Tablet에서는 Canvas와 Panel의 균형을 조정합니다.

Mobile에서는 Canvas를 우선하고 Furniture 및 Editing 기능은 필요할 때 호출하는 구조를 사용합니다.

### Touch Target

Mobile 및 Tablet에서는 터치 조작을 고려하여 지나치게 작은 버튼이나 아이콘을 사용하지 않습니다.

---

## 21. Development Principles

프로젝트 전체에서 다음 개발 원칙을 유지합니다.

### Data Driven UI

가구와 공간을 JSX에 반복적으로 직접 작성하지 않습니다.

데이터를 기준으로 UI를 렌더링합니다.

### Component Separation

하나의 파일에 모든 기능을 작성하지 않습니다.

기능과 책임을 기준으로 Component를 분리합니다.

### State Management

동일한 데이터를 여러 State에서 중복 관리하지 않습니다.

계산 가능한 값은 필요한 시점에 계산합니다.

### Responsive First

PC 버전을 완성한 뒤 Mobile을 단순 축소하는 방식으로 개발하지 않습니다.

초기 Component 설계 단계부터 다음 환경을 함께 고려합니다.

```text
PC
Tablet
Mobile
```

### Mouse & Touch

Drag 기능은 Mouse Event에만 의존하지 않고 Pointer Event 등을 활용하여 다양한 입력 장치를 지원합니다.

### Maintainability

가구나 공간이 추가되어도 기존 Component 전체를 수정하지 않아도 되는 구조를 지향합니다.

### Asset Management

가구와 공간 이미지는 프로젝트 Asset으로 관리합니다.

저작권 및 사용 권한이 확인되지 않은 외부 이미지를 임의로 프로젝트에 포함하지 않습니다.

### Dependency

필요하지 않은 외부 Library를 과도하게 설치하지 않습니다.

React 기본 기능으로 구현 가능한 기능은 기본 기능을 우선 검토합니다.

---

## 22. Current Status & Next Step

### Current Status

현재 기본 개발 환경 구성이 완료된 상태입니다.

완료 항목:

- Node.js 설치
- npm 설치
- React 설치
- Vite 프로젝트 생성
- 개발 서버 실행 확인
- Vite 기본 App 콘텐츠 제거
- `App.css` 삭제
- `index.css` 삭제
- `main.jsx`의 기본 CSS Import 제거

### Next Step

다음 순서로 개발을 진행합니다.

```text
01. Space Data 정의
        ↓
02. Space Selection 화면
        ↓
03. Responsive Layout 구조
        ↓
04. Room Editor Layout
        ↓
05. Furniture Data 정의
        ↓
06. Furniture Catalog
        ↓
07. Space / Category Filter
        ↓
08. Furniture Placement
        ↓
09. Furniture Selection
        ↓
10. Mouse / Touch Move
        ↓
11. Rotate / Delete
        ↓
12. Room Reset
        ↓
13. PC Responsive
        ↓
14. Tablet Responsive
        ↓
15. Mobile Responsive
        ↓
16. UI / UX Refinement
        ↓
17. Error & Edge Case Test
        ↓
18. Final QA
```

### Final Direction

Room Decorator는 단순한 Drag & Drop 기능 테스트가 아니라 여러 공간과 다양한 가구 데이터를 기반으로 사용자가 직접 공간을 디자인할 수 있는 인터랙티브 웹 애플리케이션을 목표로 합니다.

최종 결과물에서는 다음 역량이 명확하게 드러나도록 개발합니다.

- React Component Architecture
- React State Management
- Data Driven UI
- Mouse / Touch Interaction
- Responsive Web Design
- UI / UX Design
- Front-end Architecture
- Interactive Web Development