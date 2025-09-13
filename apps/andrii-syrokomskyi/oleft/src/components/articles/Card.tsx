import type { ClientConfig } from "@thebcms/client";
import { BCMSImage } from "@thebcms/components-react";
import classnames from "classnames";
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
  country = "germany",
  language = "german",
}: Props) => {
  return (
    <article>
      <a
        href={`/${getCountryName(country)}/${getLanguageName(language)}/articles/${card.slug}`}
        className="flex flex-col"
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
                "rounded-[10px] aspect-square overflow-hidden object-cover w-full mb-[14px]",
                {
                  "lg:aspect-[1.88] lg:rounded-2xl lg:mb-0": showTitleLayer,
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
        <div className="mb-4 lg:flex lg:flex-row-reverse lg:justify-between lg:mb-3">
          <div className="flex flex-wrap gap-2 mb-2.5 lg:mb-0">
            {card.categories.map((category, index) => (
              <div
                key={index}
                className="px-2.5 py-[7px] bg-[#BCBD87]/10 rounded-[5px] text-xs leading-none font-medium tracking-[-0.41px] text-appAccent lg:px-[14px] lg:py-[9px] lg:text-sm lg:leading-none"
              >
                {category}
              </div>
            ))}
          </div>
          <div
            className={classnames(
              "text-appGray-600 text-sm leading-[1.3] font-medium tracking-[-0.41px] lg:leading-none",
              {
                "lg:text-xl": showTitleLayer,
                "lg:text-2xl": !showTitleLayer,
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
              "text-lg font-medium leading-[1.4] tracking-[-0.41px] text-appGray-500 max-lg:hidden",
              {
                "lg:mb-6": showTitleLayer,
                "mb-[18px]": !showTitleLayer,
              },
            )}
          />
        )}
      </a>
    </article>
  );
};

export default ArticlesCard;
