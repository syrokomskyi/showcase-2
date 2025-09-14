interface Props {
  site?: string;
}

const Footer = ({ site }: Props) => {
  return (
    <footer className="bg-appGray-100 pt-6 pb-[35px] md:pb-8 lg:pt-14">
      <div className="container">
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
