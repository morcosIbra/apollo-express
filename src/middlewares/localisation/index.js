import i18next from "i18next";
import i18nextMiddleware from "i18next-express-middleware";
import Backend from 'i18next-node-fs-backend';

const middleware = app => {
    i18next
        .use(i18nextMiddleware.LanguageDetector)
        .use(Backend)
        .init({
            backend: {
                loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json'
            },
            debug: false,
            ns: ['common'],
            defaultNS: 'common',
            detection: {
                order: ['header'],
                lookupHeader: 'accept-language'
            },
            preload: ['en', 'ru'],
            saveMissing: true,
            fallBackLng: ['en'],
            initImmediate: false

        });
    i18next
        .use(Backend)
        .init({ initImmediate: false, });

    app.use(i18nextMiddleware.handle(i18next));
}

export default middleware;
