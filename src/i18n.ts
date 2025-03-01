import { createI18n } from 'vue-i18n';
import en from '@/i18n/en';
import pl from '@/i18n/pl';

function getBestLocales(): string[] {
  const result = [];

  function insertLanguageCode(code: string): void {
    if (!result.includes(code)) {
      result.push(code);
    }
    while (code.includes('-')) {
      code = code.substring(0, code.lastIndexOf('-'));
      if (!result.includes(code)) {
        result.push(code);
      }
    }
  }
  if (localStorage.getItem('locale')) {
    insertLanguageCode(localStorage.getItem('locale'));
  }
  if (navigator.languages) {
    for (let language of navigator.languages) {
      insertLanguageCode(language);
    }
  }
  if (navigator.language) {
    insertLanguageCode(navigator.language);
  }
  return result;
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    pl,
  },
});

for (let locale of getBestLocales()) {
  // @ts-ignore
  if (i18n.global.availableLocales.includes(locale)) {
    // @ts-ignore
    i18n.global.locale = locale;
    document.documentElement.lang = locale;
    break;
  }
}

export default i18n;
