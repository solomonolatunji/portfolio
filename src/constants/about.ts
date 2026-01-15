import avatarImg from "@/assets/avatar.jpg";

export const aboutData = {
  greeting: "HELLO THERE 👋",
  name: "SOLOMON OLATUNJI",
  roles: ["SOFTWARE ENGINEER", "FULL STACK DEVELOPER", "MOBILE APP DEVELOPER", "TECHNICAL WRITER"],
  description:
    "Full Stack Engineer building modern, scalable web & mobile apps with clean code and performance in mind.",
  profileImage: {
    src: avatarImg,
    alt: "Solomon Olatunji",
  },
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/eminisolomon",
      ariaLabel: "GitHub Profile",
      icon: "IconBrandGithub",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/eminisolomon",
      ariaLabel: "Twitter Profile",
      icon: "IconBrandTwitter",
    },
    {
      platform: "Telegram",
      url: "https://t.me/eminisolomon",
      ariaLabel: "Telegram Profile",
      icon: "IconBrandTelegram",
    },
    {
      platform: "WhatsApp",
      url: "https://wa.me/2348130690998",
      ariaLabel: "WhatsApp Contact",
      icon: "IconBrandWhatsapp",
    },
  ],
};
