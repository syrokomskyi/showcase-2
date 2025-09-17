import type { ClientConfig } from "@thebcms/client";
import type { Entry } from "@thebcms/types";
import { useMemo } from "react";
import type {
  ArticleEntry,
  ArticleEntryMetaItem,
} from "../../../bcms/types/ts";
import ArrowIcon from "../../assets/icons/arrow-right.svg?raw";
import { defaultCountry, defaultLanguage } from "../../configure";
import type { ArticleLight } from "../../utils/article";
import {
  getCountryName,
  getEntryMeta,
  getLanguageName,
} from "../../utils/localization";
import ArticlesCard from "../articles/Card";
import ArticlesSearchBar from "../articles/Search";
import Btn from "../Btn";

interface Props {
  title?: string;
  articles?: ArticleEntry[];
  bcmsConfig: ClientConfig;
  browseArticlesButton?: string;
  country?: string;
  language?: string;
}

const HomePageArticles = ({
  title,
  articles: items = [],
  bcmsConfig,
  browseArticlesButton,
  country = defaultCountry,
  language = defaultLanguage,
}: Props) => {
  const articles = useMemo(() => {
    return items.map((e) => {
      const meta = getEntryMeta<ArticleEntryMetaItem>(e as Entry, language);
      return {
        title: meta.title,
        slug: meta.slug,
        cover: meta.cover_image,
        categories: meta.category?.map(
          (e) => getEntryMeta<ArticleEntryMetaItem>(e as Entry, language).title,
        ),
        description: meta.description,
      } as ArticleLight;
    });
  }, [items, language]);

  return (
    <section className="articles-section relative z-10 bg-white py-12 lg:py-20 xl:py-24">
      <div className="container">
        <ArticlesSearchBar
          articles={articles}
          country={country}
          language={language}
          static
          className="relative z-10 mb-8 lg:hidden"
        />
        {title && (
          <h2 className="leading-none font-semibold tracking-[-0.41px] text-appGray-700 mb-5 lg:text-2xl lg:mb-9 xl:text-4xl xl:mb-12">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 mb-8 sm:grid-cols-2 lg:grid-cols-3 lg:mb-16 xl:gap-x-12 xl:gap-y-16">
          {articles.map((card, index) => (
            <ArticlesCard
              key={`article-${index}-${card.slug || index}`}
              bcmsConfig={bcmsConfig}
              card={card}
              country={country}
              language={language}
            />
          ))}
        </div>
        {browseArticlesButton && (
          <div className="flex justify-center">
            <Btn
              to={`/${getCountryName(country)}/${getLanguageName(language)}/articles`}
              theme="dark"
            >
              <span className="mr-2">{browseArticlesButton}</span>
              <div
                dangerouslySetInnerHTML={{ __html: ArrowIcon }}
                className="w-[14px] h-[14px] lg:w-5 lg:h-5"
              />
            </Btn>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePageArticles;
