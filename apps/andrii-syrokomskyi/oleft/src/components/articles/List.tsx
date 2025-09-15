import type { ClientConfig } from "@thebcms/client";
import { useEffect, useMemo, useRef, useState } from "react";
import { defaultCountry, defaultLanguage } from "../../configure";
import type { ArticleLight } from "../../utils/article";
import ArticlesCard from "./Card";
import { ArticlesDropdown } from "./Dropdown";
import ArticlesSearchBar from "./Search";

interface Props {
  articles: ArticleLight[];
  bcmsConfig: ClientConfig;
  country?: string;
  language?: string;
}

const ArticlesList = ({
  articles,
  bcmsConfig,
  country = defaultCountry,
  language = defaultLanguage,
}: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [categoriesValue, setCategoriesValue] = useState("");
  const articlesListDOM = useRef<HTMLDivElement | null>(null);
  const [articlesPerPage, setArticlesPerPage] = useState(8);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setArticlesPerPage(articlesPerPage);
    }
  }, [articlesPerPage]);

  const categoriesOptions = useMemo(() => {
    return (
      articles.reduce((acc, e) => {
        e.categories.forEach((category) => {
          if (!acc.includes(category ?? "")) {
            acc.push(category ?? "");
          }
        });
        return acc;
      }, [] as string[]) ?? []
    );
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return (
      articles.filter((e) => {
        let show = true;

        if (searchValue) {
          show =
            show &&
            `${e.title} ${e.description}`
              .toLowerCase()
              .includes(searchValue.toLowerCase());
        }

        if (categoriesValue) {
          show = show && !!e.categories.find((i) => i === categoriesValue);
        }

        return show;
      }) ?? []
    );
  }, [searchValue, categoriesValue, articles]);

  return (
    <div>
      <div className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-[14px] mb-8 max-w-[608px] mx-auto lg:gap-6 lg:mb-24">
        <ArticlesSearchBar
          value={searchValue}
          country={country}
          language={language}
          static
          size="lg"
          showResults={false}
          className="col-span-2"
          onInput={(value) => setSearchValue(value)}
        />
        <ArticlesDropdown
          value={categoriesValue}
          options={categoriesOptions}
          placeholder="Categories"
          onSelect={(value) => setCategoriesValue(value)}
        />
      </div>
      {filteredArticles.length > 0 ? (
        <div
          ref={articlesListDOM}
          className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3 xl:gap-x-12 xl:gap-y-16"
        >
          {filteredArticles.map((article, index) => (
            <ArticlesCard
              key={article.slug + index}
              bcmsConfig={bcmsConfig}
              card={article}
              country={country}
              language={language}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500">
          There are no articles for the applied filters
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
