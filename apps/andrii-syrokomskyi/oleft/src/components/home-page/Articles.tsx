import type { ClientConfig } from "@thebcms/client";
import type React from "react";
import { useMemo } from "react";
import type {
  ArticleEntry,
  ArticleEntryMetaItem,
} from "../../../bcms/types/ts";
import ArrowIcon from "../../assets/icons/arrow-right.svg?raw";
import type { ArticleLight } from "../../utils/article";
import {
  getCountryName,
  getEntryMeta,
  getLanguageName,
} from "../../utils/localization";
import ArticlesCard from "../articles/Card";
import ArticlesSearchBar from "../articles/Search";
import Btn from "../Btn";
import type { Entry } from "@thebcms/types";

interface Props {
  title: string;
  articles: ArticleEntry[];
  bcmsConfig: ClientConfig;
  browseArticlesButton?: string;
  country?: string;
  language?: string;
}

const HomePageArticles: React.FC<Props> = ({
  title,
  articles: items,
  bcmsConfig,
  browseArticlesButton,
  country = "germany",
  language = "german",
}) => {
  const articles = useMemo(() => {
    return items.map((e) => {
      const meta = getEntryMeta<ArticleEntryMetaItem>(e as Entry, language);
      return {
        title: meta.title,
        slug: meta.slug,
        cover: meta.cover_image,
        categories: meta.categories?.map(
          (e) => getEntryMeta<ArticleEntryMetaItem>(e as Entry, language).title,
        ),
        description: meta.description,
      } as ArticleLight;
    });
  }, [items]);

  return (
    <section className="py-8 lg:py-20 xl:pt-[128px] xl:pb-[120px]">
      <div className="container">
        <ArticlesSearchBar
          articles={articles}
          country={country}
          language={language}
          static
          className="relative z-10 mb-8 lg:hidden"
        />
        <h2 className="leading-none font-semibold tracking-[-0.41px] text-appGray-700 mb-5 lg:text-2xl lg:mb-9 xl:text-4xl xl:mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 mb-8 lg:grid-cols-3 lg:mb-16 xl:gap-x-12 xl:gap-y-16">
          {articles.map((card, index) => (
            <ArticlesCard
              key={index}
              bcmsConfig={bcmsConfig}
              card={card}
              country={country}
              language={language}
            />
          ))}
        </div>
        <div className="flex justify-center">
          {browseArticlesButton && (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePageArticles;
