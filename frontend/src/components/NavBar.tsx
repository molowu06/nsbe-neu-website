import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/navbar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/home">
          <Image 
              src="/logo/navbar_logo.png"
              alt="NSBE Logo" 
              width={160}
              height={160}
            />
           </Link>
          <h3><strong>BESS - NSBE Northeastern Chapter</strong> </h3>
      </div>

      <ul className={styles.links}>
        <li><Link href="/home">Home</Link></li>
        <li><Link href="/event">Events</Link></li>
        <li><Link href="/newsletter">Newsletter</Link></li>
        <li><Link href="/conferences">Archive</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>

    </nav>
  );
};

export default NavBar;
