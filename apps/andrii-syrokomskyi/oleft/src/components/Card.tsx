import type { ClientConfig } from "@thebcms/client";
import { BCMSImage } from "@thebcms/components-react";
import classnames from "classnames";
import { defaultCountry, defaultLanguage } from "../configure";
import type { ArticleLight } from "../utils/article";
import { getCountryName, getLanguageName } from "../utils/localization";
import ContentManager from "./ContentManager";

interface Props {
  card: ArticleLight;
  showTitleLayer?: boolean;
  bcmsConfig: ClientConfig;
  country?: string;
  language?: string;
}

const ArticlesCard = ({
  card,
  showTitleLayer,
  bcmsConfig,
  country = defaultCountry,
  language = defaultLanguage,
}: Props) => {
  return (
    <article className="group">
      <a
        href={`/${getCountryName(country)}/${getLanguageName(language)}/articles/${card.slug}`}
        className="flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-white rounded-2xl shadow-lg p-8 md:p-10 lg:p-12 hover:bg-white/95"
      >
        <div
          className={classnames("relative overflow-hidden rounded-2xl", {
            "mb-8 lg:mb-12 show-title-layer": showTitleLayer,
            "mb-10": !showTitleLayer,
          })}
        >
          {card.cover && (
            <BCMSImage
              media={card.cover}
              clientConfig={bcmsConfig}
              className={classnames(
                "aspect-square object-cover w-full shadow-lg scale-106 group-hover:scale-100 transition-transform duration-[3000ms] ease-out",
                {
                  "lg:aspect-[1.88]": showTitleLayer,
                },
              )}
            />
          )}
          <div
            className={classnames(
              "absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center p-4 rounded-2xl",
              {
                "max-lg:hidden": showTitleLayer,
                hidden: !showTitleLayer,
              },
            )}
          >
            <div className="text-[32px] leading-none font-semibold tracking-[-0.41px] text-white text-center">
              {card.title}
            </div>
          </div>
        </div>
        <div className="article-card-title-container mb-8 lg:flex lg:flex-row-reverse lg:justify-between lg:mb-6">
          <div className="flex flex-wrap gap-3 mb-4 lg:mb-0">
            {card.categories.map((category) => (
              <div
                key={category}
                className="px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-xs leading-none font-semibold tracking-wide text-gray-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 hover:text-blue-700 hover:scale-105 lg:px-5 lg:py-3 lg:text-sm"
              >
                {category}
              </div>
            ))}
          </div>
          <div
            className={classnames(
              "text-gray-900 font-bold leading-[1.2] tracking-tight transition-colors duration-300 group-hover:text-blue-600",
              {
                "text-lg lg:text-2xl": showTitleLayer,
                "text-base lg:text-3xl": !showTitleLayer,
              },
            )}
          >
            {card.title}
          </div>
        </div>
        {card.description && card.description.nodes.length > 0 && (
          <ContentManager
            items={card.description?.nodes}
            className={classnames(
              "text-lg font-medium leading-[1.5] tracking-[-0.41px] text-gray-600 max-lg:hidden mt-4 transition-colors duration-300 group-hover:text-gray-700",
              {
                "lg:mb-8 lg:mt-6": showTitleLayer,
                "mb-6 mt-4": !showTitleLayer,
              },
            )}
          />
        )}
      </a>
    </article>
  );
};

export default ArticlesCard;
