import Image from "next/image";
import { logoSeasFire } from "@/assets/index";
import { AboutButton } from "@/components/ui";
import ThemeSwitch  from "@/components/ui/ThemeSwitch";
import logo from "@/app/logo.png"
import './css/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="https://github.com/EarthyScience/Browzarr/" target="_blank" rel="noopener noreferrer">
        <Image src={logo} alt="browzarr" />
      </a>
      <ThemeSwitch />
      <AboutButton />
    </nav>
  );
};

export default Navbar;