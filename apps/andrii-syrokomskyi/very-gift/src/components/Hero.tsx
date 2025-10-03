import type { ClientConfig } from "@thebcms/client";
import { BCMSImage } from "@thebcms/components-react";
import type {
  PropMediaDataParsed,
  PropRichTextDataParsed,
} from "@thebcms/types";
import { defaultCountry, defaultLanguage } from "../configure";
import { getCountryName, getLanguageName } from "../utils/localization";
import Btn from "./Btn";
import ContentManager from "./ContentManager";
import ArrowIcon from "./icons/ArrowIcon";

interface Props {
  headline: PropRichTextDataParsed;
  description: PropRichTextDataParsed;
  browseHeroButton?: string;
  coverImage: PropMediaDataParsed;
  bcmsConfig: ClientConfig;
  country?: string;
  language?: string;
}

const HomePageHero = ({
  headline,
  description,
  browseHeroButton,
  coverImage,
  bcmsConfig,
  country = defaultCountry,
  language = defaultLanguage,
}: Props) => {
  return (
    <section className="hero-section relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 group">
        <div className="w-full h-full overflow-hidden" role="img" aria-label="Hero background image">
          <BCMSImage
            media={coverImage}
            clientConfig={bcmsConfig}
            className="w-full h-full object-cover position-top scale-106 group-hover:scale-100 transition-transform duration-[3000ms] ease-out"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full">
        <div className="container h-full">
          <div className="flex flex-col justify-center h-full py-32 md:py-40 lg:py-48 xl:py-56">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-4xl mx-auto lg:mx-0 animate-fade-in-up">
              <ContentManager
                items={headline.nodes}
                className="homePage--hero-title text-2xl leading-[1.15] font-bold text-white mb-8 md:text-4xl md:mb-12
                          lg:text-8xl lg:leading-[0.95] lg:mb-16 xl:text-9xl tracking-tight drop-shadow-2xl"
              />
              <ContentManager
                items={description.nodes}
                className="text-sm leading-relaxed font-normal text-white/60 mb-12 md:text-lg md:mb-16 lg:text-4xl 
                          lg:leading-relaxed lg:mb-20 max-w-4xl backdrop-blur-sm"
              />
              {browseHeroButton && (
                <Btn
                  to={`/${getCountryName(country)}/${getLanguageName(language)}/articles`}
                  ariaLabel={`${browseHeroButton} - Navigate to articles page`}
                >
                  <span className="mr-2">{browseHeroButton}</span>
                  <ArrowIcon className="w-[14px] h-[14px] lg:w-5 lg:h-5" />
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
