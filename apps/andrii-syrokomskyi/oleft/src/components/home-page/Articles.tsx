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
    <section className="articles-section relative z-10 bg-gradient-to-b from-gray-50/50 to-white py-16 lg:py-24 xl:py-32">
      <div className="container">
        <ArticlesSearchBar
          articles={articles}
          country={country}
          language={language}
          static
          className="relative z-10 mb-12 lg:hidden"
        />
        {title && (
          <h2 className="text-2xl leading-tight font-bold tracking-tight text-appGray-800 mb-8 lg:text-4xl lg:mb-16 xl:text-6xl xl:mb-20 text-center lg:text-left">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-3 lg:mb-20 xl:gap-12 2xl:gap-16">
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
