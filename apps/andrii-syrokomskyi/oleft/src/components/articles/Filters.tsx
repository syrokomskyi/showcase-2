import { useEffect, useState } from "react";
import { defaultCountry, defaultLanguage } from "../../configure";
import { getCountryName, getLanguageName } from "../../utils/localization";
import ArticlesSearchBar from "./Search";

interface Props {
  country?: string;
  language?: string;
}

const Filters = ({
  country = defaultCountry,
  language = defaultLanguage,
}: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const filterRedirect = (key: string, val: string) => {
    if (val) {
      window.location.href = `/${getCountryName(country)}/${getLanguageName(language)}/articles/?${key}=${val}`;
    }
  };

  useEffect(() => {
    if (searchValue) {
      filterRedirect("s", searchValue);
    }
  }, [searchValue, filterRedirect]);

  return (
    <div className="pt-24 mb-8 md:pt-6 lg:pb-6 lg:border-b lg:border-[#F0F0F0] lg:mb-14">
      <div className="container">
        <div className="relative z-10 gap-x-3 gap-y-[14px]">
          <ArticlesSearchBar
            static
            size="lg"
            country={country}
            language={language}
            className="w-full"
            onEnter={(value) => setSearchValue(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
