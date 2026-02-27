import styles from "../../styles/footer.module.css";
import Image from "next/image";
import { FaInstagram, FaLinkedin, FaSlack, FaEnvelope } from "react-icons/fa";
import { SiTiktok } from "react-icons/si"; // TikTok icon from Simple Icons


const Footer = () => {
  return (
    <footer className={styles.footer}>
      
      {/* Logo Section */}
      <div className={styles.logo}>
        <Image 
          src="/logo/footer_logo.png"
          alt="NSBE Logo"
          width={300}
          height={300}
        />
      </div>

      {/* Newsletter Section */}
      <div className={styles.newsletter}>
        <h2><strong>Subscribe to Our Newsletter</strong></h2>
        <p>Get the latest updates and events straight to your inbox!</p>
        <form className={styles.form}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            required 
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Social / Contact Section */}
      <div className={styles.socials}>
        <h2><strong>Connect With Us</strong></h2>
        <p>Follow us on social media to stay updated!</p>

        <div className={styles.socialsLink}>
          <a href="https://www.instagram.com/nsbe_neu/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={28} color="#D4AF37" />
          </a>
          <a href="https://www.tiktok.com/@nsbe_neu" target="_blank" rel="noopener noreferrer">
            <SiTiktok size={28} color="#D4AF37" />
          </a>
          <a href="https://www.linkedin.com/company/national-society-of-black-engineers/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={28} color="#D4AF37" />
          </a>
          <a href="https://northeasternbess.slack.com" target="_blank" rel="noopener noreferrer">
            <FaSlack size={28} color="#D4AF37" />
          </a>
          <a href="https://outlook.office.com/mail/deeplink/compose?to=bess.nsbe.president@gmail.com"
          target="_blank"
          rel="noopener noreferrer">
            <FaEnvelope size={28} color="#D4AF37" />
          </a>
        </div>
      </div>

       {/* Copyright Section */}
      <div className={styles.copy}>
        &copy; {new Date().getFullYear()} BESS - NSBE Northeastern Chapter
      </div>

    </footer>
  );
};

export default Footer;
