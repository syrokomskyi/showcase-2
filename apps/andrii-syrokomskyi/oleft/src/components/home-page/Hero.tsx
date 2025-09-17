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
    <section className="hero-section relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <BCMSImage
          media={coverImage}
          clientConfig={bcmsConfig}
          className="w-full h-full object-cover position-top scale-105 hover:scale-100 transition-transform duration-[3000ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 h-full">
        <div className="container h-full">
          <div className="flex flex-col justify-center h-full py-24 lg:py-32">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-5xl animate-fade-in-up">
              <ContentManager
                items={headline.nodes}
                className="homePage--hero-title text-2xl leading-[1.15] font-bold text-white mb-4 md:text-4xl md:mb-6
                          lg:text-8xl lg:leading-[0.95] lg:mb-8 xl:text-9xl tracking-tight drop-shadow-2xl"
              />
              <ContentManager
                items={description.nodes}
                className="text-sm leading-relaxed font-normal text-white/90 mb-8 md:text-lg md:mb-10 lg:text-2xl 
                          lg:leading-relaxed lg:mb-12 max-w-3xl backdrop-blur-sm"
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
