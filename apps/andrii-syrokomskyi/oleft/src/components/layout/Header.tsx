import Breadcrumb from "./Breadcrumb";

interface HeaderProps {
  pathname: string;
  country: string;
  language: string;
  articleTitle?: string;
  legalTitle?: string;
}

const Header = ({ pathname, country, language, articleTitle, legalTitle }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-100">
      <Breadcrumb
        pathname={pathname}
        countryOrCode={country}
        languageOrCode={language}
        articleTitle={articleTitle}
        legalTitle={legalTitle}
      />
    </header>
  );
};

export default Header;
