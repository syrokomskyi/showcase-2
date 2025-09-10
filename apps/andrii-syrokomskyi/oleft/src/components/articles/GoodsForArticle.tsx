import type { ClientConfig } from "@thebcms/client";
import { BCMSImage } from "@thebcms/components-react";
import classnames from "classnames";
import type React from "react";
import { useState } from "react";
import ArrowIcon from "../../assets/icons/arrow-right.svg?raw";
import Btn from "../Btn";
import type { GoodsForArticleGroup } from "../../../bcms/types/ts";

interface Props {
  title?: string;
  goods?: GoodsForArticleGroup[];
  previousButton?: string;
  nextButton?: string;
  bcmsConfig: ClientConfig;
}

export const GoodsForArticle: React.FC<Props> = ({
  title,
  goods = [],
  bcmsConfig,
  previousButton,
  nextButton,
}) => {
  const [activeGoods, setActiveGoods] = useState(0);
  return (
    <div className="mb-8 lg:mb-20 xl:mb-[120px]">
      {title && title.length > 0 && (
        <h2 className="leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-6 lg:text-2xl lg:leading-none lg:mb-10">
          {title}
        </h2>
      )}
      <div className="border border-[#E8E8E8] rounded-md p-4 pb-6 mb-6 lg:p-6 lg:pb-8 lg:rounded-xl lg:mb-12">
        {goods.map((goods, index) => (
          <div
            key={index}
            className={classnames("mb-5 lg:mb-10", {
              "absolute opacity-0 pointer-events-none": activeGoods !== index,
            })}
          >
            {/* Mobile layout: photo above, title and price below */}
            <div className="lg:hidden">
              {goods.cover && (
                <BCMSImage
                  media={goods.cover}
                  clientConfig={bcmsConfig}
                  className="aspect-[3.0] rounded-xl overflow-hidden w-full object-contain mb-6"
                />
              )}
              <div className="text-2xl leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-6">
                {goods.title}
              </div>
              {goods.price && (
                <div className="text-xl font-semibold text-appAccent">
                  {goods.price}
                </div>
              )}
            </div>

            {/* Desktop layout: photo on left, title and price on right */}
            <div className="hidden lg:flex lg:gap-6 lg:items-start">
              {goods.cover && (
                <div className="lg:flex-shrink-0 lg:w-1/2">
                  <BCMSImage
                    media={goods.cover}
                    clientConfig={bcmsConfig}
                    className="aspect-[3.0] rounded-xl overflow-hidden w-full object-contain"
                  />
                </div>
              )}
              <div className="lg:flex-1 lg:pt-4">
                <div className="text-2xl leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-6">
                  {goods.title}
                </div>
                {goods.price && (
                  <div className="text-xl font-semibold text-appAccent">
                    {goods.price}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2.5 lg:gap-[14px]">
          {Array(goods.length)
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                className={classnames(
                  "flex flex-1 h-1 transition-colors duration-300 lg:h-2 lg:rounded-sm",
                  {
                    "bg-appAccent": index <= activeGoods,
                    "bg-[#EBEBEB]": index > activeGoods,
                  },
                )}
                onClick={() => setActiveGoods(index)}
              />
            ))}
        </div>
      </div>
      {goods.length > 1 && (
        <div className="grid grid-cols-2 gap-2.5 lg:max-w-[424px] lg:mx-auto lg:gap-6">
          <Btn
            theme="gray"
            disabled={activeGoods === 0}
            className="justify-center"
            onClick={() => setActiveGoods((prev) => prev - 1)}
          >
            <div
              dangerouslySetInnerHTML={{ __html: ArrowIcon }}
              className="w-[14px] h-[14px] mr-2 rotate-180 lg:w-5 lg:h-5"
            />
            {previousButton && <span>{previousButton}</span>}
          </Btn>
          <Btn
            theme="gray"
            disabled={activeGoods === goods.length - 1}
            className="justify-center"
            onClick={() => setActiveGoods((prev) => prev + 1)}
          >
            {nextButton && <span className="mr-2">{nextButton}</span>}
            <div
              dangerouslySetInnerHTML={{ __html: ArrowIcon }}
              className="w-[14px] h-[14px] lg:w-5 lg:h-5"
            />
          </Btn>
        </div>
      )}
    </div>
  );
};
