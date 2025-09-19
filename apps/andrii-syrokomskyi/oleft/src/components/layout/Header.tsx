import Breadcrumb from "./Breadcrumb";

interface HeaderProps {
  pathname: string;
  country: string;
  language: string;
}

const Header = ({ pathname, country, language }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-100">
      <Breadcrumb
        pathname={pathname}
        countryOrCode={country}
        languageOrCode={language}
      />
    </header>
  );
};

export default Header;
