import type React from "react";
import { useEffect, useState } from "react";
import { getCountryName, getLanguageName } from "../../utils/localization";
import { ArticlesDropdown } from "./Dropdown";
import ArticlesSearchBar from "./Search";

interface Props {
  categories: string[];
  country?: string;
  language?: string;
}

const Filters: React.FC<Props> = ({
  categories,
  country = "germany",
  language = "german",
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [categoriesValue, setCategoriesValue] = useState("");

  const filterRedirect = (key: string, val: string) => {
    if (val) {
      window.location.href = `/${getCountryName(country)}/${getLanguageName(language)}/articles/?${key}=${val}`;
    }
  };

  useEffect(() => {
    if (searchValue) {
      filterRedirect("s", searchValue);
    }

    if (categoriesValue) {
      filterRedirect("c", categoriesValue);
    }
  }, [searchValue, categoriesValue]);

  return (
    <div className="pt-24 mb-8 md:pt-6 lg:pb-6 lg:border-b lg:border-[#F0F0F0] lg:mb-14">
      <div className="container">
        <div className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-[14px] lg:grid-cols-4 lg:gap-x-4">
          <ArticlesSearchBar
            static
            size="lg"
            country={country}
            language={language}
            className="col-span-2"
            onEnter={(value) => setSearchValue(value)}
          />
          <ArticlesDropdown
            value={categoriesValue}
            options={categories}
            placeholder="Categories"
            dropdownPosition="left"
            onSelect={(value) => setCategoriesValue(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
