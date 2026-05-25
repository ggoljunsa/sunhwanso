/* ============================================
   순환소 · Sunhwanso — Mock data
   각 NFC 태그(스티커)는 ?id=XXXXX 쿼리로 분기
   ============================================ */
window.SUNHWANSO_DATA = {
  meta: {
    location: "DGIST 학정동 · 순환소 1호점",
    stockTotal: 24,
    userName: "박루프",
    userTemp: 37.2,
    userTempDelta: 0.7,
    userPoints: 240,
    userPointMax: 500,
    userLoops: 7,
    userActive: 1
  },

  items: {
    "00032": {
      id: "00032",
      name: "디펜스 정장",
      category: "취업·발표",
      size: "M",
      color: "네이비",
      emoji: "🤵",
      locker: "A-04",
      storyBadge: "32회 디펜스 동행",
      stock: 1,
      badgeStyle: "hot",
      headline: "이 정장은 32명의 디펜스를 함께했어요.",
      caption: "이번엔 당신의 차례. · ",
      nextNum: 33,
      timeline: [
        { n: "#32", user: "신유진", date: "2026.02", event: "디펜스", msg: "발표 잘 됐어요! 다음 분도 화이팅!" },
        { n: "#28", user: "한재호", date: "2025.11", event: "수선 · 안감 교체", msg: null },
        { n: "#22", user: "익명", date: "2025.09", event: "최종 면접", msg: "면접관이 잘 어울린다고 했어요" },
        { n: "#15", user: "익명", date: "2025.06", event: "박사 디펜스", msg: null },
        { n: "#08", user: "최영진", date: "2024.11", event: "학회 발표", msg: "사이즈 딱 맞음, 안주머니 활용도 ↑" },
        { n: "#01", user: "김선배 (졸업생)", date: "2024.03", event: "기증 — 시작", msg: "후배들이 부담 없이 입었으면 합니다." }
      ]
    },
    "00047": {
      id: "00047",
      name: "장우산 · 자동",
      category: "생활",
      size: "65cm",
      color: "그레이",
      emoji: "☂",
      locker: "U-12",
      storyBadge: "비 오는 날 47번",
      stock: 4,
      badgeStyle: "today",
      headline: "이 우산은 47번의 비를 함께 막아줬어요.",
      caption: "이번엔 당신의 차례. · ",
      nextNum: 48,
      timeline: [
        { n: "#47", user: "이도윤", date: "2026.05.14", event: "갑작스러운 소나기", msg: "덕분에 안 젖었어요 🙏" },
        { n: "#42", user: "익명", date: "2026.04.30", event: "도서관 → 기숙사", msg: null },
        { n: "#30", user: "박서연", date: "2026.03.18", event: "출근길", msg: "다음 분도 무사 귀가하세요!" },
        { n: "#15", user: "익명", date: "2025.09.05", event: "신학기 환영회", msg: null },
        { n: "#01", user: "시설팀 시드 비치", date: "2025.06.01", event: "기증 — 시작", msg: null }
      ]
    },
    "00008": {
      id: "00008",
      name: "실험복",
      category: "학업·연구",
      size: "남 L",
      color: "화이트",
      emoji: "🥼",
      locker: "L-03",
      storyBadge: "8명 거쳐옴",
      stock: 2,
      badgeStyle: "normal",
      headline: "이 실험복은 8명의 첫 랩을 거쳤어요.",
      caption: "이번엔 당신의 차례. · ",
      nextNum: 9,
      timeline: [
        { n: "#08", user: "조윤서", date: "2026.03", event: "새 랩 적응", msg: "사이즈 딱 맞아서 일주일 동안 잘 입었어요" },
        { n: "#05", user: "익명", date: "2025.09", event: "유기화학 실습", msg: null },
        { n: "#03", user: "김지원", date: "2025.06", event: "랩 로테이션", msg: "소매 길이 적당함" },
        { n: "#01", user: "DGIST 학생처 시드 비치", date: "2025.02", event: "기증 — 시작", msg: null }
      ]
    },
    "00001": {
      id: "00001",
      name: "블레이저",
      category: "취업·발표",
      size: "S",
      color: "베이지",
      emoji: "🧥",
      locker: "A-07",
      storyBadge: "첫 사용자 모집 중",
      stock: 1,
      badgeStyle: "new",
      headline: "아직 이야기가 없는 블레이저.",
      caption: "당신이 ",
      nextNum: 1,
      captionSuffix: "번째 사용자가 됩니다.",
      timeline: [
        { n: "#01", user: "한섬 CSR 기증", date: "2026.05", event: "기증 — 시작", msg: "당신이 첫 번째 이야기를 남겨주세요." }
      ]
    }
  },

  spots: [
    { name: "순환소 1호점", loc: "학정 1F", stock: 24, low: false, x: 42, y: 52 },
    { name: "순환소 2호점", loc: "기숙사 동 (예정)", stock: 0, low: true, x: 72, y: 28 },
    { name: "순환소 E5 거점", loc: "E5 공학관 1F (예정)", stock: 0, low: true, x: 18, y: 75 }
  ]
};
