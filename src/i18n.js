import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'ar'],
        fallbackLng: 'en',
        detection: {
            order: ['cookie', 'localStorage', 'path', 'subdomain'],
            caches: ['cookie'],
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
        react: { useSuspense: false },
    });

i18n.on('languageChanged', (lng) => {
    const html = document.documentElement;
    if (lng === 'ar') {
        html.dir = 'rtl';
        html.style.fontFamily = '"Tajawal", sans-serif';
    } else {
        html.dir = 'ltr';
        html.style.fontFamily = '"Roboto", sans-serif';
    }
});

export default i18n;
