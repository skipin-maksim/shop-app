import usa from "../../assets/images/jpg/flags/us.jpg";
import russia from "../../assets/images/jpg/flags/russia.jpg";

interface ILanguage {
  label: string;
  flag: string;
}

export interface ILanguages {
  ru: ILanguage;
  en: ILanguage;
}

const languages: ILanguages = {
  ru: {
    label: "Russian",
    flag: russia,
  },
  en: {
    label: "English",
    flag: usa,
  },
};

export default languages;
