import { isHomePage } from "../utils/tool";
import Breadcrumb from "./Breadcrumb";

interface HeaderProps {
  pathname: string;
  country: string;
  language: string;
}

const Header = ({ pathname, country, language }: HeaderProps) => {
  const showBreadcrumb = !isHomePage(pathname, country, language);

  return (
    <>
      <header className="bg-white">
        {showBreadcrumb && (
          <Breadcrumb
            pathname={pathname}
            countryOrCode={country}
            languageOrCode={language}
          />
        )}
      </header>
      {/* Spacer для компенсации фиксированного Breadcrumb */}
      {showBreadcrumb && <div className="h-20" />}
    </>
  );
};

export default Header;
