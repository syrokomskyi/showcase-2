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
  const country = getCountryName(countryOrCode).toLowerCase();
  const language = getLanguageName(languageOrCode).toLowerCase();

  const breadcrumbItems = useMemo(() => {
    const items: BreadcrumbItem[] = [];
    const pathSegments = pathname.split("/").filter(Boolean);

    items.push({
      label: "Home",
      href: `/${country}/${language}/`,
    });

    if (pathSegments.includes("articles")) {
      items.push({
        label: "Articles",
        // TODO href: `/${country}/${language}/articles/`,
      });
    }

    return items;
  }, [pathname, language, country]);

  function isHomePath(p?: string) {
    return p === `/${country}/${language}` || p === `/${country}/${language}/`;
  }

  // don't render breadcrumb on home page
  if (isHomePath(pathname)) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <div className="container">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumbItems.map((item) => (
            <li key={item.href || item.label} className="flex items-center">
              {!isHomePath(item.href) && (
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
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-600"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-gray-600">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
