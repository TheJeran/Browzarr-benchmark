import { logoSeasFire } from "@/assets/index";
import AboutButton from "@/components/UI/AboutButton";
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="https://github.com/EarthyScience/ViZarrDev" target="_blank" rel="noreferrer">
        <img src={logoSeasFire} alt="ViZarrDev"/>
      </a>
      <AboutButton />
    </nav>
  );
};

export default Navbar;