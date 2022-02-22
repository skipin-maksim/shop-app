import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { withTranslation } from "react-i18next";
import { FaAngleDown } from "react-icons/fa";

//i18n
import i18n from "../../locales/i18n";
import languages, { ILanguages } from "../../common/data/languages";

interface ISelectedLang {
  shortName: string;
  data: {
    label: string;
    flag: string;
  };
}

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<ISelectedLang>(
    {} as ISelectedLang
  );

  useEffect(() => {
    const languageInStorage = localStorage.getItem("i18nextLng") || "en";

    setSelectedLang({
      shortName: languageInStorage,
      data: languages[languageInStorage as keyof ILanguages],
    });
  }, []);

  const changeLanguage = (data: ISelectedLang) => {
    i18n.changeLanguage(data.shortName).then((r) => setSelectedLang(data));
  };

  return (
    <>
      <Dropdown
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        className="d-inline-block"
      >
        <DropdownToggle className="btn color-inherit" tag="button">
          <FaAngleDown className={"me-2 color-inherit font-size-26"} />
          <img src={selectedLang?.data?.flag} alt="language" height="24" />
        </DropdownToggle>

        <DropdownMenu className="language-switch dropdown-menu-end">
          {Object.entries(languages).map((langItem) => {
            const [shortName, data] = langItem;

            return (
              <DropdownItem
                key={langItem[0]}
                onClick={() => changeLanguage({ shortName, data })}
                className={`notify-item ${
                  selectedLang.shortName === shortName ? "active" : "none"
                }`}
              >
                <img src={data.flag} alt="flag" className="me-1" height="18" />
                <span className="align-middle">{data.label}</span>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default withTranslation()(LanguageDropdown);
