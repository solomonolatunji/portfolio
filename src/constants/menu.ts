import type { MenuItem } from "@/interfaces/menu";
import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/vue/24/solid";

export const menuItems: MenuItem[] = [
  {
    name: "home",
    path: "/",
    icon: HomeIcon,
    title: "Home",
    label: "Home",
  },
  {
    name: "about",
    path: "/about",
    icon: UserIcon,
    title: "About",
    label: "About",
  },
  {
    name: "portfolio",
    path: "/portfolio",
    icon: BriefcaseIcon,
    title: "Portfolio",
    label: "Portfolio",
  },
  {
    name: "contact",
    path: "/contact",
    icon: EnvelopeIcon,
    title: "Contact",
    label: "Contact",
  },
  {
    name: "blog",
    path: "/blog",
    icon: ChatBubbleLeftRightIcon,
    title: "Blog",
    label: "Blog",
  },
];
