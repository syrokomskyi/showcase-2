import { useMemo } from "react";
import { getCountryName, getLanguageName } from "../../utils/localization";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  pathname: string;
  countryOrCode: string;
  languageOrCode: string;
  articleTitle?: string;
}

const Breadcrumb = ({
  pathname,
  countryOrCode,
  languageOrCode,
  articleTitle,
}: BreadcrumbProps) => {
  const country = getCountryName(countryOrCode);
  const language = getLanguageName(languageOrCode);

  const breadcrumbItems = useMemo(() => {
    const items: BreadcrumbItem[] = [];
    const pathSegments = pathname.split("/").filter(Boolean);

    items.push({
      label: "Home",
      href: `/${country}/${language}/`,
    });

    if (pathSegments.includes("articles")) {
      //   TODO items.push({
      //     label: "Articles",
      //     href: `/${country}/${language}/articles/`,
      //   });

      if (articleTitle && pathSegments.length > 3) {
        items.push({
          label: articleTitle,
        });
      }
    }

    return items;
  }, [pathname, language, articleTitle, country]);

  // don't render breadcrumb on home page
  if (
    pathname === `/${country}/${language}` ||
    pathname === `/${country}/${language}/`
  ) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <div className="container">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumbItems.map((item) => (
            <li key={item.href || item.label} className="flex items-center">
              {item.href !== `/${country}/${language}/` && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {item.href ? (
                <a
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
