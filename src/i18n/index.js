import { createI18n } from "vue-i18n";

const messages = {
  en: {
    nav: {
      home: "Home",
      about: "About",
    },
    home: {
      header: "Welcome to the Vue 3 I18n tutorial!",
      created_by: "This tutorial was brought to you by Lokalise.",
    },
    about: {
      header: "About us",
    },
  },
  fr: {
    nav: {
      home: "Главная",
      about: "О нас",
    },
    home: {
      header: "Добро пожаловать в руководство Vue 3 I18n!",
      created_by: "Это руководство создано для вас компанией Lokalise.",
    },
    about: {
      header: "О нас",
    },
  },
};

export default createI18n({
  locale: "fr", // <--- 1
  fallbackLocale: "en", // <--- 2
  legacy: false, // <--- 3
  globalInjection: true,
  messages,
});
