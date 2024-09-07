import styles from "./loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderCube}>
        <div className={`${styles.loaderSide} ${styles.front}`}></div>
        <div className={`${styles.loaderSide} ${styles.back}`}></div>
        <div className={`${styles.loaderSide} ${styles.left}`}></div>
        <div className={`${styles.loaderSide} ${styles.right}`}></div>
        <div className={`${styles.loaderSide} ${styles.top}`}></div>
        <div className={`${styles.loaderSide} ${styles.bottom}`}></div>
      </div>
    </div>
  );
};

export default Loader;
