import type { ClientConfig } from "@thebcms/client";
import { BCMSImage } from "@thebcms/components-react";
import classnames from "classnames";
import { defaultCountry, defaultLanguage } from "../../configure";
import type { ArticleLight } from "../../utils/article";
import { getCountryName, getLanguageName } from "../../utils/localization";
import ContentManager from "../ContentManager";

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
    <article className="group mx-4 md:mx-6 lg:mx-0">
      <a
        href={`/${getCountryName(country)}/${getLanguageName(language)}/articles/${card.slug}`}
        className="flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl p-6 md:p-8 lg:p-6 xl:p-8 rounded-3xl hover:bg-white/60"
      >
        <div
          className={classnames("relative", {
            "lg:mb-[34px]": showTitleLayer,
          })}
        >
          {card.cover && (
            <BCMSImage
              media={card.cover}
              clientConfig={bcmsConfig}
              className={classnames(
                "rounded-2xl aspect-square overflow-hidden object-cover w-full mb-4 transition-all duration-300 group-hover:rounded-3xl group-hover:shadow-lg",
                {
                  "lg:aspect-[1.88] lg:rounded-3xl lg:mb-0 lg:group-hover:rounded-[2rem]":
                    showTitleLayer,
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
        <div className="mb-8 lg:flex lg:flex-row-reverse lg:justify-between lg:mb-6">
          <div className="flex flex-wrap gap-3 mb-4 lg:mb-0">
            {card.categories.map((category) => (
              <div
                key={category}
                className="px-4 py-2.5 bg-gradient-to-r from-appAccent/10 to-appAccent/5 rounded-full text-xs leading-none font-semibold tracking-wide text-appAccent border border-appAccent/20 transition-all duration-300 hover:bg-appAccent/20 hover:scale-105 lg:px-5 lg:py-3 lg:text-sm"
              >
                {category}
              </div>
            ))}
          </div>
          <div
            className={classnames(
              "text-appGray-700 font-bold leading-[1.2] tracking-tight transition-colors duration-300 group-hover:text-appAccent",
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
              "text-lg font-medium leading-[1.5] tracking-[-0.41px] text-appGray-500 max-lg:hidden mt-4 px-2 lg:px-0",
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
