import styles from "../../app.module.css";
import Logos from "../../../design-system/atoms/Logos";

export const Header = () => {
  return (
    <header className={`${styles.header} mb-16 group`}>
      <div className={styles.viteLogoContainer}>
        <Logos.Vite className={styles.viteLogo} />
      </div>
      <h3 className={styles.headerTopTitle}>
        <span className={styles.headerTopTitleHighlight}>Figment</span>
      </h3>
      <h1 className={styles.headerTitle}>Product Engineering</h1>
      <h1 className="mb-2 ml-4 font-mono text-4xl text-gray-100 md:text-6xl">
        Hi, I&apos;m <br className="block md:hidden" />
        <span className="relative">
          <span className="h-20 pt-2 overflow-x-hidden whitespace-nowrap text-orange-400">
            Salman<span className="text-3xl md:text-5xl">👋</span>
          </span>
          <span
            className={`${styles.cursor} absolute -bottom-0 left-0 -top-1 inline-block bg-gray-900 w-full animate-type will-change`}
          ></span>
        </span>
      </h1>
    </header>
  );
};
