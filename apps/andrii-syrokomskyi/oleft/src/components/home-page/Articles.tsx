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
    <section className="articles-section relative z-10 bg-gradient-to-b from-gray-50/50 to-white py-24 md:py-32 lg:py-40 xl:py-48 2xl:py-56 safe-area">
      <div className="container">
        <ArticlesSearchBar
          articles={articles}
          country={country}
          language={language}
          static
          className="relative z-10 mb-16 lg:hidden"
        />
        {title && (
          <h2 className="text-2xl leading-tight font-bold tracking-tight text-appGray-800 mb-12 md:mb-16 lg:text-4xl lg:mb-24 xl:text-6xl xl:mb-28 text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-12 mb-20 sm:grid-cols-2 lg:grid-cols-3 lg:mb-28 xl:gap-16 2xl:gap-20">
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
          <div className="flex justify-center pt-8 lg:pt-12">
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
