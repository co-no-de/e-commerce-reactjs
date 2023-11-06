import classes from "./Footer.module.css";
import { PiInstagramLogo, PiYoutubeLogo } from "react-icons/pi";
import { CiFacebook } from "react-icons/ci";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className={`${classes.container}`}>
        <div className={`${classes.innerContainer}`}>
     
      <div className={`${classes.address}`}>
        <p className="subHeading">E-LECTRONICS</p>
        <p className="subHeading">Techstreet 0451</p>
        <p className="subHeading">ZIP Code 42223 </p>
        <p className="subHeading">Binary City</p>
        <p className="subHeading">Wireland</p>
      </div>
      
   
      
      
      <div className={`${classes.socials}`}>
        <PiInstagramLogo size={32} color={"white"} />
        <PiYoutubeLogo size={32} color={"white"} />
        <CiFacebook size={32} color={"white"} />
        <RiTwitterXLine size={26} color={"white"} />
      </div>
      </div>
    </footer>
  );
};

export default Footer;

// className={`${classes.container}`}
