import Logo from "../../assets/logos/Logo.png";
import AppStore from "../../assets/Images/AppStore.png";
import PlayStore from "../../assets/Images/PlayStore.png";
import Facebook from "../../assets/Icons/Facebook.png";
import Instagram from "../../assets/Icons/Instagram.png";
import TikTok from "../../assets/Icons/TikTok.png";
import Snapchat from "../../assets/Icons/Snapchat.png";

const appStores = [
  { id: 1, image: AppStore, alt: "App Store", link: "#" },
  { id: 2, image: PlayStore, alt: "Play Store", link: "#" },
];

const socialIcons = [
  { id: 1, image: Facebook, alt: "Facebook", link: "#" },
  { id: 2, image: Instagram, alt: "Instagram", link: "#" },
  { id: 3, image: TikTok, alt: "TikTok", link: "#" },
  { id: 4, image: Snapchat, alt: "Snapchat", link: "#" },
];

const legalLinks = [
  { id: 1, title: "Terms and conditions", link: "#" },
  { id: 2, title: "Privacy", link: "#" },
  { id: 3, title: "Cookies", link: "#" },
  { id: 4, title: "Modern Slavery Statement", link: "#" },
];

const importantLinks = [
  { id: 1, title: "Get help", link: "#" },
  { id: 2, title: "Add your restaurant", link: "#" },
  { id: 3, title: "Sign up to deliver", link: "#" },
  { id: 4, title: "Create a business account", link: "#" },
];

const bottomLinks = [
  { id: 1, title: "Privacy Policy", link: "#" },
  { id: 2, title: "Terms", link: "#" },
  { id: 3, title: "Pricing", link: "#" },
  { id: 4, title: "Do not sell or share my personal information", link: "#" },
];

function Footer() {
  return (
    <footer className="w-full bg-[#D9D9D9] mt-15">
      <div className="py-10 sm:py-16">
        {/* Main */}
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between gap-y-10">
            {/* Column 1 */}
            <div className="flex flex-col items-start w-full sm:w-auto sm:max-w-[260px] lg:mr-16 xl:mr-20">
              <div className="mb-4 w-full max-w-[220px] sm:max-w-[240px]">
                <img
                  src={Logo}
                  alt="Order UK Logo"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex items-center gap-2 mb-4 w-full">
                {appStores.map((store) => (
                  <a
                    key={store.id}
                    href={store.link}
                    className="flex-1 min-w-0"
                  >
                    <img
                      src={store.image}
                      alt={store.alt}
                      className="w-full h-auto max-h-[45px] object-contain hover:scale-105 duration-200"
                    />
                  </a>
                ))}
              </div>

              <p className="text-[13px] sm:text-[12px] leading-[20px] text-[#000000]">
                Company #490039-445, Registered with House of companies.
              </p>
            </div>

            {/* Column 2 */}
            <div className="w-full sm:w-auto sm:max-w-[381px] lg:mr-10 xl:mr-12">
              <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#03081F] mb-6 leading-snug">
                Get Exclusive Deals in your Inbox
              </h3>

              <div className="relative w-full sm:w-[381px] h-[54px] sm:h-[59px]">
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  className="w-full h-full rounded-full bg-[#CFCFCF] pl-5 sm:pl-6 pr-28 sm:pr-36 text-[14px] text-black outline-none placeholder:text-[#4B4B4B] placeholder:opacity-100"
                />

                <button className="absolute right-[2px] top-[2px] bottom-[2px] px-5 sm:px-7 bg-[#FC8A06] rounded-full text-white text-[13px] sm:text-[15px] font-medium flex items-center justify-center">
                  Subscribe
                </button>
              </div>

              <p className="text-[11px] text-[#000000] ml-4 sm:ml-6 mt-3">
                we won't spam, read our{" "}
                <span className="text-[#03081F] underline cursor-pointer hover:text-[#FC8A06] transition-colors duration-200">
                  email policy
                </span>
              </p>

              <div className="flex gap-4 mt-6 ml-2 sm:ml-3">
                {socialIcons.map((icon) => (
                  <a key={icon.id} href={icon.link}>
                    <img
                      src={icon.image}
                      alt={icon.alt}
                      className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer hover:scale-105 duration-200"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div className="lg:mr-10 xl:mr-12">
              <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#03081F] mb-6">
                Legal Pages
              </h3>
              <ul className="space-y-4 sm:space-y-5">
                {legalLinks.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.link}
                      className="text-[12px] sm:text-[15px] lg:text-[13px] text-[#000000] underline cursor-pointer hover:text-[#FC8A06]"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-[17px] sm:text-[18px]  font-semibold text-[#03081F] mb-6">
                Important Links
              </h3>
              <ul className="space-y-4 sm:space-y-5">
                {importantLinks.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.link}
                      className="text-[14px] sm:text-[15px] lg:text-[13px] text-[#000000] underline cursor-pointer hover:text-[#FC8A06]"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Last Section */}
      <div className="bg-[#03081F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 py-6 text-center lg:text-left">
            <div>
              <p className="text-white text-[13px] sm:text-[14px] text-center lg:text-left">
                Order.uk Copyright 2024, All Rights Reserved.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-6">
              {bottomLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className="text-white text-[12px] sm:text-[14px] hover:underline"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;