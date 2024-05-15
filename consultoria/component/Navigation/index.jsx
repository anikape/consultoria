import style from "./Navigation.module.css";
export const Navigation = ({ children }) => {
  return (
    <>
      <nav className={style.nav}>
        <div className={style.buttonContainer}>{children}</div>
      </nav>
      <nav className={style.navMobile}>
        <div className={style.buttonContainer}>{children}</div>
      </nav>
    </>
  );
};
