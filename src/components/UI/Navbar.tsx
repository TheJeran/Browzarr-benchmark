import Image from "next/image";
import { logoSeasFire } from "@/assets/index";
import { AboutButton } from "@/components/ui";
import ThemeSwitch  from "./ThemeSwitch";
import './css/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <a>
        <Image src={logoSeasFire} alt="vizarrstores" />
      </a>
      <ThemeSwitch />
      <AboutButton />
    </nav>
  );
};

export default Navbar;