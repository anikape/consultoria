import style from "./ClientCompanyContent.module.css";
export const ClientCompanyContent = ({ children }) => {
  return (
    <>
      <div className={style.contentClient}>
        {/* {companys.map((company) => (
              <>
                <CompanyProfile company={company} key={company._id} />
              </>
            ))} */}
        {children}
      </div>
    </>
  );
};
