import {
  BCMSContentManager,
  type BCMSWidgetComponents,
} from "@thebcms/components-react";
import type { EntryContentParsedItem } from "@thebcms/types";

interface Props {
  items: EntryContentParsedItem[];
  widgetComponents?: BCMSWidgetComponents;
  className?: string;
}

const ContentManager = ({ items, widgetComponents, className = "" }: Props) => {
  return (
    <div>
      <BCMSContentManager
        className={className}
        items={items}
        widgetComponents={widgetComponents ?? {}}
      />
    </div>
  );
};

export default ContentManager;
