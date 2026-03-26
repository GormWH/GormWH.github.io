export const languages = {
  en: "English",
  ja: "日本語",
  ko: "한국어",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

const en = {
  // Navigation
  "nav.home": "Home",
  "nav.about": "About",
  "nav.projects": "Projects",
  "nav.contact": "Contact",

  // Meta (BaseLayout)
  "meta.description":
    "SuHong Park - portfolio: projects, notes, and systems-oriented engineering.",
  "meta.titleSuffix": "SuHong Park",

  // Accessibility labels
  "header.siteAria": "Site",
  "header.primaryNavAria": "Primary",
  "header.changeLanguageAria": "Change language",
  "header.languageMenuHeading": "Language",
  "footer.siteAria": "Site footer",

  // Footer
  "footer.languageHeading": "Language",
  "footer.opportunitiesHeading": "Open to opportunities",
  "footer.openToOpportunities":
    "Open to software engineering opportunities focused on backend, system design, and reliability.",
  "footer.copyright": "SuHong Park",
  "footer.onGithubPages": "Static site on",
  "footer.githubPages": "GitHub Pages",

  // Project detail chrome
  "project.backToList": "Back to projects list",
  "project.tocHeading": "On this page",

  // Page titles (browser tab)
  "page.home": "Home",
  "page.about": "About",
  "page.contact": "Contact",
  "page.projects": "Projects",
  "page.skills": "Skills & Experience",

  // Home page
  "home.heroTitle": "Software Engineer focused on system design.",
  "home.line1": "I start with why and constraints.",
  "home.line2": "I design structure before implementation.",
  "home.line3": "I choose tools based on fit, not trend.",
  "home.line4": "Focused on building reliable backend and real-time systems.",

  // About page
  "about.sectionTitle": "About me",
  "about.p1":
    "I studied mechanical engineering for both my bachelor's and master's degrees, where I used computational fluid dynamics in my graduation theses. That work pulled me into the world of programming, and I became a software engineer simply because writing code was fun.",
  "about.p2":
    "Over the last about three years as a software engineer, I've realized what I really enjoy is not just coding, but building systems. I care about how to make a system stable and scalable, and how to design it so that new teammates (and even AI agents) can join the project smoothly.",
  "about.p3":
    "Along the way, I've found that I care as much about the working environment as the code itself. I enjoy writing clear READMEs so people can understand and participate quickly, designing unit-testable structures to reduce risk, and using tools like Docker and docker-compose to keep local and deployment environments predictable. My current company has no dedicated DevOps team, so I've gradually taken on more of that responsibility and I'm interested in growing further in that direction.",
  "about.p4Lead":
    "Today I focus on system design for real-time systems. Every component should have a clear reason to exist, which makes the architecture easier to understand and gives everyone a shared sense of why things are done this way. If you'd like to see how I apply these ideas in practice, you can find a few of my recent projects on the",
  "about.p4LinkText": "Projects",
  "about.p4Tail": "page.",

  // Contact page
  "contact.sectionTitle": "Contact",
  "contact.p1Lead": "I'm currently working as a software engineer at",
  "contact.p1Tail":
    "where I work across desktop/web applications, cloud systems, robot controls, and embedded systems. I'm interested in roles that involve system design, backend development, and DevOps.",
  "contact.p2":
    "If you'd like to chat about work, system design, or anything else, feel free to reach out. LinkedIn is the best way to reach me.",

  // Skills page
  "skills.sectionTitle": "Skills & Experience",
  "skills.body": "Selected technologies and execution experience are being curated.",
} as const;

export type UiKey = keyof typeof en;

export const ui = {
  en,
  ja: {
    "nav.home": "ホーム",
    "nav.about": "プロフィール",
    "nav.projects": "プロジェクト",
    "nav.contact": "連絡先",
    "meta.description":
      "スホン・パクのポートフォリオ - プロジェクト、ノート、システム志向のエンジニアリング。",
    "meta.titleSuffix": "SuHong Park",
    "header.siteAria": "サイト",
    "header.primaryNavAria": "メインナビゲーション",
    "header.changeLanguageAria": "言語を変更",
    "header.languageMenuHeading": "言語",
    "footer.siteAria": "サイトフッター",
    "footer.languageHeading": "言語",
    "footer.opportunitiesHeading": "Open to opportunities",
    "footer.openToOpportunities":
      "バックエンド、システム設計、信頼性に重点を置いたソフトウェアエンジニアリングの機会を歓迎しています。",
    "footer.copyright": "SuHong Park",
    "footer.onGithubPages": "静的サイト:",
    "footer.githubPages": "GitHub Pages",
    "project.backToList": "プロジェクト一覧に戻る",
    "project.tocHeading": "このページ内",
    "page.home": "ホーム",
    "page.about": "プロフィール",
    "page.contact": "連絡先",
    "page.projects": "プロジェクト",
    "page.skills": "スキルと経験",
    "home.heroTitle": "システム設計に注力するソフトウェアエンジニア",
    "home.line1": "まず目的と制約を明確にします。",
    "home.line2": "実装の前に構造を設計します。",
    "home.line3": "流行ではなく適合性でツールを選びます。",
    "home.line4": "信頼性の高いバックエンドとリアルタイムシステム構築に注力しています。",
    "about.sectionTitle": "プロフィール",
    "about.p1":
      "私は学部・修士ともに機械工学を専攻し、卒業研究では数値流体力学（CFD）を扱いました。その過程でプログラミングに引き込まれ、コードを書く楽しさからソフトウェアエンジニアになりました。",
    "about.p2":
      "ソフトウェアエンジニアとして約3年働く中で、私が本当に好きなのは単なるコーディングではなく、システムを作ることだと実感しました。システムを安定かつスケーラブルにする方法、そして新しいメンバー（AIエージェントを含む）がスムーズに参加できる設計に関心があります。",
    "about.p3":
      "また、コードそのものと同じくらい作業環境も重要だと考えています。誰でも早く理解して参加できる明確なREADMEを書き、リスクを下げるために単体テストしやすい構造を設計し、Dockerやdocker-composeでローカルと本番環境の再現性を保つことを大切にしています。現職には専任のDevOpsチームがないため、その領域も徐々に担当しており、今後さらに伸ばしていきたい分野です。",
    "about.p4Lead":
      "現在はリアルタイムシステムのためのシステム設計に注力しています。各コンポーネントには明確な存在理由があるべきで、それによりアーキテクチャの理解がしやすくなり、なぜその設計にしたのかをチーム全体で共有できます。こうした考え方を実践した例は",
    "about.p4LinkText": "プロジェクト",
    "about.p4Tail": "ページでご覧いただけます。",
    "contact.sectionTitle": "連絡先",
    "contact.p1Lead": "現在は",
    "contact.p1Tail":
      "でソフトウェアエンジニアとして、デスクトップ/ウェブアプリ、クラウドシステム、ロボット制御、組み込みシステムまで幅広い領域に取り組んでいます。システム設計、バックエンド開発、DevOpsを含む役割に関心があります。",
    "contact.p2":
      "仕事やシステム設計、そのほかの話題でも気軽にご連絡ください。最も連絡しやすいのはLinkedInです。",
    "skills.sectionTitle": "スキルと経験",
    "skills.body": "主要技術と実務経験を整理中です。",
  },
  ko: {
    "nav.home": "홈",
    "nav.about": "소개",
    "nav.projects": "프로젝트",
    "nav.contact": "연락처",
    "meta.description":
      "수홍 박의 포트폴리오 - 프로젝트, 노트, 시스템 중심 엔지니어링 기록.",
    "meta.titleSuffix": "SuHong Park",
    "header.siteAria": "사이트",
    "header.primaryNavAria": "주요 탐색",
    "header.changeLanguageAria": "언어 변경",
    "header.languageMenuHeading": "언어",
    "footer.siteAria": "사이트 바닥글",
    "footer.languageHeading": "언어",
    "footer.opportunitiesHeading": "Open to opportunities",
    "footer.openToOpportunities":
      "백엔드, 시스템 설계, 신뢰성에 중점을 둔 소프트웨어 엔지니어링 기회에 열려 있습니다.",
    "footer.copyright": "SuHong Park",
    "footer.onGithubPages": "정적 사이트:",
    "footer.githubPages": "GitHub Pages",
    "project.backToList": "프로젝트 목록으로 돌아가기",
    "project.tocHeading": "이 페이지에서",
    "page.home": "홈",
    "page.about": "소개",
    "page.contact": "연락처",
    "page.projects": "프로젝트",
    "page.skills": "기술 및 경험",
    "home.heroTitle": "시스템 설계에 집중하는 소프트웨어 엔지니어",
    "home.line1": "왜 이 일을 하는지와 제약조건부터 시작합니다.",
    "home.line2": "구현 전에 구조를 먼저 설계합니다.",
    "home.line3": "유행보다 문제 적합성으로 도구를 선택합니다.",
    "home.line4": "신뢰할 수 있는 백엔드와 실시간 시스템 구축에 집중합니다.",
    "about.sectionTitle": "소개",
    "about.p1":
      "저는 학사와 석사 모두 기계공학을 전공했고, 졸업 논문에서 전산유체역학(CFD)을 활용했습니다. 이 과정에서 자연스럽게 프로그래밍에 빠져들었고, 코드 작성 자체의 재미로 소프트웨어 엔지니어가 되었습니다.",
    "about.p2":
      "약 3년 동안 소프트웨어 엔지니어로 일하며 제가 정말 즐기는 일은 단순한 코딩이 아니라 시스템을 만드는 일이라는 점을 깨달았습니다. 시스템을 안정적이고 확장 가능하게 만드는 방법, 그리고 새로운 동료(심지어 AI 에이전트까지)도 빠르게 합류할 수 있도록 설계하는 방법에 관심이 많습니다.",
    "about.p3":
      "또한 코드만큼이나 작업 환경의 품질도 중요하게 생각합니다. 누구나 빠르게 이해하고 참여할 수 있도록 명확한 README를 작성하고, 리스크를 줄이기 위해 단위 테스트 가능한 구조를 설계하며, Docker와 docker-compose로 로컬과 배포 환경의 일관성을 유지하는 것을 좋아합니다. 현재 회사에는 전담 DevOps 팀이 없어 관련 역할을 점차 맡아 왔고, 앞으로도 그 방향으로 더 성장하고 싶습니다.",
    "about.p4Lead":
      "현재는 실시간 시스템을 위한 시스템 설계에 집중하고 있습니다. 모든 구성요소는 존재 이유가 분명해야 하며, 그렇게 해야 아키텍처를 이해하기 쉬워지고 왜 이렇게 설계했는지에 대한 공통 이해가 생깁니다. 이 원칙을 실제 프로젝트에 어떻게 적용하는지 궁금하시다면",
    "about.p4LinkText": "프로젝트",
    "about.p4Tail": "페이지를 확인해 주세요.",
    "contact.sectionTitle": "연락처",
    "contact.p1Lead": "현재",
    "contact.p1Tail":
      "에서 소프트웨어 엔지니어로 일하며 데스크톱/웹 애플리케이션, 클라우드 시스템, 로봇 제어, 임베디드 시스템 등 다양한 영역을 다루고 있습니다. 시스템 설계, 백엔드 개발, DevOps가 포함된 역할에 관심이 있습니다.",
    "contact.p2":
      "업무나 시스템 설계, 혹은 어떤 주제든 편하게 이야기 나누고 싶다면 연락 주세요. 가장 빠른 연락 수단은 LinkedIn입니다.",
    "skills.sectionTitle": "기술 및 경험",
    "skills.body": "주요 기술과 실행 경험을 정리하고 있습니다.",
  },
} as const;
