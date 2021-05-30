import { PhoneIcon } from "@heroicons/react/outline";

let currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <>
      <div className="flex items-center mx-8 my-4 flex-col md:flex-row">
        <p className="flex-grow text-lg font-semibold text-gray-600">
          {currentYear} {"\u00A9"} Saharok
        </p>
        <p className="text-lg font-semibold text-gray-600">
          Есть вопросы? Звоните:{"\u00A0"}
        </p>
        <a href="tel:+998998952856">
          <span className="flex flex-row text-lg font-semibold text-gray-900">
            +99899 895 28 56 {"\u00A0"}
            <PhoneIcon className="h-4 w-4 text-gray-900 my-auto" />
          </span>
        </a>
      </div>
      <div className="flex mx-4 mb-4 md:mx-auto gap-3 mt-0 flex-col md:flex-row">
        <p className="text-lg self-center font-semibold text-gray-600 text-center">
          Следите за акциями, скидками и новинками:
        </p>
        <span className="flex mx-auto gap-8 mt-0 flex-row">
          <a
            href="https://t.me/sahhhar_ok"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10"
          >
            <img src="/telegram.svg" alt="Telegram channel" />
          </a>
          <a
            href="https://www.instagram.com/sahhhar_ok/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10"
          >
            <img src="/instagram.svg" alt="Instagram profile" />
          </a>
        </span>
      </div>
    </>
  );
};

export default Footer;
