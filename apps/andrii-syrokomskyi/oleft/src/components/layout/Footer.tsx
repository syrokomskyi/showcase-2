interface LegalLink {
  title: string;
  slug: string;
  url: string;
}

interface Props {
  site?: string;
  legalLinks?: LegalLink[];
}

const Footer = ({ site, legalLinks = [] }: Props) => {
  return (
    <footer className="bg-appGray-100">
      <div className="container">
        {/* Legal Links Section */}
        {legalLinks.length > 0 && (
          <div>
            <div className="flex flex-wrap justify-center md:justify-start">
              {legalLinks.map((link) => (
                <a
                  key={link.slug}
                  href={link.url}
                  className="text-sm lg:text-base text-[#898C8A] hover:text-appGray-700 transition-colors duration-200 font-medium tracking-[-0.41px] relative group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-appGray-700 transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Copyright Section */}
        <div className="text-[#898C8A] leading-none font-medium tracking-[-0.41px] md:flex md:items-center md:justify-end">
          <div className="text-xs lg:text-base lg:leading-none">
            &copy; {new Date().getFullYear()}
            {site && ` ${site}`}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
