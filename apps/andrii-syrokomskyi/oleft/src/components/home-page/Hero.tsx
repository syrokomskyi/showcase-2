import type { ClientConfig } from "@thebcms/client";
import { BCMSImage } from "@thebcms/components-react";
import type {
  PropMediaDataParsed,
  PropRichTextDataParsed,
} from "@thebcms/types";
import ArrowIcon from "../../assets/icons/arrow-right.svg?raw";
import { defaultCountry, defaultLanguage } from "../../configure";
import type { ArticleLight } from "../../utils/article";
import { getCountryName, getLanguageName } from "../../utils/localization";
import ArticlesSearchBar from "../articles/Search";
import Btn from "../Btn";
import ContentManager from "../ContentManager";

interface Props {
  headline: PropRichTextDataParsed;
  description: PropRichTextDataParsed;
  browseHeroButton?: string;
  coverImage: PropMediaDataParsed;
  articles: ArticleLight[];
  bcmsConfig: ClientConfig;
  country?: string;
  language?: string;
}

const HomePageHero = ({
  headline,
  description,
  browseHeroButton,
  coverImage,
  articles,
  bcmsConfig,
  country = defaultCountry,
  language = defaultLanguage,
}: Props) => {
  return (
    <section className="relative">
      <div className="container">
        <div className="relative pt-24 pb-6 md:pb-10 lg:pt-[250px] lg:pb-[88px]">
          <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            <ContentManager
              items={headline.nodes}
              className="homePage--hero-title text-xl leading-[1.2] font-medium text-white mb-3 md:text-3xl
                        lg:text-7xl lg:leading-[1.1] lg:mb-6"
            />
            <ContentManager
              items={description.nodes}
              className="text-xs leading-none font-medium text-white mb-6 md:text-sm lg:text-xl lg:leading-none
                        lg:mb-10"
            />
            {browseHeroButton && (
              <Btn
                to={`/${getCountryName(country)}/${getLanguageName(language)}/articles`}
              >
                <span className="mr-2">{browseHeroButton}</span>
                <div
                  dangerouslySetInnerHTML={{ __html: ArrowIcon }}
                  className="w-[14px] h-[14px] lg:w-5 lg:h-5"
                />
              </Btn>
            )}
          </div>
          <ArticlesSearchBar
            articles={articles}
            country={country}
            language={language}
            className="absolute z-10 top-10 right-0 w-[300px] max-lg:hidden"
          />
        </div>
      </div>
      <div className="absolute top-0 left-0 size-full">
        <BCMSImage
          media={coverImage}
          clientConfig={bcmsConfig}
          className="size-full object-cover position-top"
        />
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#1E1E1E] to-[#1E1E1E]/0" />
      </div>
    </section>
  );
};

export default HomePageHero;
