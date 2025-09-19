import { isHomePage } from "../../utils/tool";
import Breadcrumb from "./Breadcrumb";

interface HeaderProps {
  pathname: string;
  country: string;
  language: string;
}

const Header = ({ pathname, country, language }: HeaderProps) => {
  return (
    <header className="bg-white">
      {!isHomePage(pathname, country, language) && (
        <Breadcrumb
          pathname={pathname}
          countryOrCode={country}
          languageOrCode={language}
        />
      )}
    </header>
  );
};

export default Header;
