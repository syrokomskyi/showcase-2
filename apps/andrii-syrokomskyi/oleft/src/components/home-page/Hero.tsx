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
    <section className="hero-section relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <BCMSImage
          media={coverImage}
          clientConfig={bcmsConfig}
          className="w-full h-full object-cover position-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/50 to-transparent" />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 h-full">
        <div className="container h-full">
          <div className="flex flex-col justify-center h-full py-24 lg:py-32">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-4xl">
              <ContentManager
                items={headline.nodes}
                className="homePage--hero-title text-xl leading-[1.2] font-medium text-white mb-3 md:text-3xl
                          lg:text-7xl lg:leading-[1.1] lg:mb-6"
              />
              <ContentManager
                items={description.nodes}
                className="text-xs leading-none font-medium text-white mb-6 md:text-sm lg:text-xl lg:leading-none
                          lg:mb-10 max-w-2xl"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageHero;
