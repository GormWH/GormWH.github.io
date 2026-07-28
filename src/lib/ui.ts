// UI chrome strings, keyed by language code (not locale path — 'en'/'ja'/'ko',
// matching LocaleInfo.code from src/lib/i18n.ts). Hand-authored, no machine
// translation. NO EMOJI — allowed glyphs: → · — ※ ✻ (CJK content is fine).
export interface UiDict {
  nav: {
    about: string;
    work: string;
    writing: string;
    contact: string;
  };
  home: {
    hero: {
      ctaWork: string;
      ctaContact: string;
      basedIn: string;
      languages: string;
      now: string;
    };
    about: {
      eyebrow: string;
      heading: string;
      showMore: string;
      showLess: string;
      timeline: string;
    };
    work: {
      eyebrow: string;
      heading: string;
      viewAll: string;
    };
    writing: {
      eyebrow: string;
      heading: string;
      viewAll: string;
      intro: string;
    };
    contact: {
      eyebrow: string;
      heading: string;
    };
  };
  footer: {
    copyright: string;
    location: string;
  };
  listing: {
    workMeta: string;
    workHeading: string;
    writingMeta: string;
    writingHeading: string;
    emptyWork: string;
    emptyWriting: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    lead: string;
    whereEyebrow: string;
    whereHeading: string;
    timezoneLabel: string;
    languagesLabel: string;
    hoursLabel: string;
    availabilityEyebrow: string;
  };
  notFound: {
    eyebrow: string;
    heading: string;
    lead: string;
    home: string;
    allWork: string;
    allWriting: string;
    contact: string;
  };
  fallbackNotice: string;
}

const en: UiDict = {
  nav: { about: 'About', work: 'Work', writing: 'Writing', contact: 'Contact' },
  home: {
    hero: {
      ctaWork: 'Recent work',
      ctaContact: 'Get in touch',
      basedIn: 'Based in',
      languages: 'Languages',
      now: 'Now',
    },
    about: {
      eyebrow: '01 — About',
      heading: 'A few things about me',
      showMore: 'Show more',
      showLess: 'Show less',
      timeline: 'Timeline',
    },
    work: { eyebrow: '02 — Work', heading: 'Recent work', viewAll: 'all projects' },
    writing: {
      eyebrow: '03 — Writing',
      heading: 'Notes from the bench',
      viewAll: 'all writing',
      intro:
        'I write to think out loud — short notes from the work, longer essays when something earns the airtime.',
    },
    contact: {
      eyebrow: '04 — Contact',
      heading: "If it's worth doing, I'd like to hear about it.",
    },
  },
  footer: { copyright: 'Copyright', location: 'Osaka, Japan' },
  listing: {
    workMeta: 'Work',
    workHeading: 'All projects',
    writingMeta: 'Writing',
    writingHeading: 'All writing',
    emptyWork: 'No work entries yet.',
    emptyWriting: 'No writing yet.',
  },
  contact: {
    eyebrow: 'Contact',
    heading: "If it's worth doing, I'd like to hear about it.",
    lead: 'LinkedIn is the easiest way to reach me. I read everything; I reply to most things within a few days.',
    whereEyebrow: 'Where',
    whereHeading: 'Currently in Osaka, JP.',
    timezoneLabel: 'Time zone',
    languagesLabel: 'Languages',
    hoursLabel: 'Working hours',
    availabilityEyebrow: 'Availability',
  },
  notFound: {
    eyebrow: '404 · Not found',
    heading: "This page isn't here.",
    lead: 'Either the URL is stale, or the page never existed. A few good places to land:',
    home: 'Home',
    allWork: 'All work',
    allWriting: 'All writing',
    contact: 'Contact',
  },
  fallbackNotice: "This article hasn't been translated yet — showing the original.",
};

const ja: UiDict = {
  nav: { about: '自己紹介', work: '実績', writing: '執筆', contact: '連絡先' },
  home: {
    hero: {
      ctaWork: '最近の実績',
      ctaContact: '連絡する',
      basedIn: '拠点',
      languages: '言語',
      now: '現在',
    },
    about: {
      eyebrow: '01 — 自己紹介',
      heading: '私について',
      showMore: 'もっと見る',
      showLess: '閉じる',
      timeline: '経歴',
    },
    work: { eyebrow: '02 — 実績', heading: '最近の実績', viewAll: 'すべての実績' },
    writing: {
      eyebrow: '03 — 執筆',
      heading: '現場からのノート',
      viewAll: 'すべての記事',
      intro:
        '考えを整理するために書いています — 日々の仕事からの短いメモ、書く価値があるときは長めのエッセイも。',
    },
    contact: {
      eyebrow: '04 — 連絡先',
      heading: 'やる価値があることなら、ぜひ聞かせてください。',
    },
  },
  footer: { copyright: '著作権', location: '大阪、日本' },
  listing: {
    workMeta: '実績',
    workHeading: '実績一覧',
    writingMeta: '執筆',
    writingHeading: '記事一覧',
    emptyWork: 'まだ実績がありません。',
    emptyWriting: 'まだ記事がありません。',
  },
  contact: {
    eyebrow: '連絡先',
    heading: 'やる価値があることなら、ぜひ聞かせてください。',
    lead: 'LinkedIn が一番早く連絡が届く方法です。すべて目を通していて、たいてい数日以内に返信します。',
    whereEyebrow: '所在地',
    whereHeading: '現在は大阪在住です。',
    timezoneLabel: 'タイムゾーン',
    languagesLabel: '言語',
    hoursLabel: '対応時間',
    availabilityEyebrow: '対応状況',
  },
  notFound: {
    eyebrow: '404・ページが見つかりません',
    heading: 'このページは存在しません。',
    lead: 'URL が古いか、そもそも存在しないページです。よければ次のページへ:',
    home: 'ホーム',
    allWork: '実績一覧',
    allWriting: '記事一覧',
    contact: '連絡先',
  },
  fallbackNotice: 'この記事はまだ翻訳されていません — 元の言語で表示しています。',
};

const ko: UiDict = {
  nav: { about: '소개', work: '작업', writing: '글', contact: '연락처' },
  home: {
    hero: {
      ctaWork: '최근 작업',
      ctaContact: '연락하기',
      basedIn: '거주지',
      languages: '언어',
      now: '현재',
    },
    about: {
      eyebrow: '01 — 소개',
      heading: '저에 대해',
      showMore: '더 보기',
      showLess: '접기',
      timeline: '경력',
    },
    work: { eyebrow: '02 — 작업', heading: '최근 작업', viewAll: '전체 작업 보기' },
    writing: {
      eyebrow: '03 — 글',
      heading: '현장에서 쓴 글',
      viewAll: '전체 글 보기',
      intro:
        '생각을 정리하려고 씁니다 — 업무에서 나온 짧은 메모, 그리고 쓸 가치가 있을 때는 더 긴 에세이도.',
    },
    contact: {
      eyebrow: '04 — 연락처',
      heading: '할 만한 가치가 있는 일이라면, 꼭 들어보고 싶습니다.',
    },
  },
  footer: { copyright: '저작권', location: '오사카, 일본' },
  listing: {
    workMeta: '작업',
    workHeading: '전체 작업',
    writingMeta: '글',
    writingHeading: '전체 글',
    emptyWork: '아직 작업이 없습니다.',
    emptyWriting: '아직 글이 없습니다.',
  },
  contact: {
    eyebrow: '연락처',
    heading: '할 만한 가치가 있는 일이라면, 꼭 들어보고 싶습니다.',
    lead: 'LinkedIn이 가장 빠르게 연락할 수 있는 방법입니다. 모두 확인하며, 대부분 며칠 안에 답장합니다.',
    whereEyebrow: '위치',
    whereHeading: '현재 오사카에 거주 중입니다.',
    timezoneLabel: '시간대',
    languagesLabel: '언어',
    hoursLabel: '근무 시간',
    availabilityEyebrow: '협업 가능 여부',
  },
  notFound: {
    eyebrow: '404 · 페이지를 찾을 수 없음',
    heading: '이 페이지는 존재하지 않습니다.',
    lead: 'URL이 오래되었거나 처음부터 존재하지 않는 페이지입니다. 대신 아래로 이동해보세요:',
    home: '홈',
    allWork: '전체 작업',
    allWriting: '전체 글',
    contact: '연락처',
  },
  fallbackNotice: '이 글은 아직 번역되지 않았습니다 — 원문을 표시합니다.',
};

export type UiLanguageCode = 'en' | 'ja' | 'ko';

export const ui: Record<UiLanguageCode, UiDict> = { en, ja, ko };

function isUiLanguageCode(code: string): code is UiLanguageCode {
  return code === 'en' || code === 'ja' || code === 'ko';
}

type Join<K extends string, P extends string> = `${K}.${P}`;

type Paths<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string ? K : Join<K, Paths<T[K]>>;
    }[keyof T & string];

export type UiKey = Paths<UiDict>;

function getPath(dict: UiDict, key: string): string | undefined {
  const parts = key.split('.');
  let cursor: unknown = dict;
  for (const part of parts) {
    if (cursor !== null && typeof cursor === 'object' && part in cursor) {
      cursor = (cursor as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof cursor === 'string' ? cursor : undefined;
}

/** Returns a `t(key)` lookup for the given language code, falling back to English for unknown codes or missing keys. */
export function useTranslations(code: string): (key: UiKey) => string {
  const dict = isUiLanguageCode(code) ? ui[code] : ui.en;
  return function t(key: UiKey): string {
    return getPath(dict, key) ?? getPath(ui.en, key) ?? key;
  };
}
