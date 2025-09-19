import { useMemo, useState, useEffect } from "react";
import { getCountryName, getLanguageName } from "../../utils/localization";
import { isHomePage } from "../../utils/tool";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  pathname: string;
  countryOrCode: string;
  languageOrCode: string;
}

const Breadcrumb = ({
  pathname,
  countryOrCode,
  languageOrCode,
}: BreadcrumbProps) => {
  const country = getCountryName(countryOrCode).toLowerCase();
  const language = getLanguageName(languageOrCode).toLowerCase();
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Показываем breadcrumb при прокрутке вверх или в самом верху страницы
      if (currentScrollY < lastScrollY || currentScrollY <= 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Скрываем при прокрутке вниз, но только после 50px
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Добавляем небольшую задержку для инициализации
    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const breadcrumbItems = useMemo(() => {
    const items: BreadcrumbItem[] = [];
    const pathSegments = pathname.split("/").filter(Boolean);

    items.push({
      label: "Home",
      href: `/${country}/${language}`,
    });

    if (pathSegments.includes("articles")) {
      items.push({
        label: "Articles",
        // TODO href: `/${country}/${language}/articles`,
      });
    }

    if (pathSegments.includes("legal")) {
      items.push({ label: "Legal" });
    }

    return items;
  }, [pathname, language, country]);

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 transition-all duration-300 ease-in-out ${
        isVisible 
          ? 'transform translate-y-0 opacity-100' 
          : 'transform -translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="container">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumbItems.map((item) => (
            <li key={item.href || item.label} className="flex items-center">
              {!isHomePage(item.href) && (
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
