import {Link} from "react-router-dom";
import { formatDate } from "../../src/helpers/formatDate";
import { documentType } from "../../src/helpers/documentType";
import { AiOutlineFilePdf } from "react-icons/ai";
import { Loading } from "../Loading";
import { Popper } from "../Popper";
import { useState } from "react";
import style from "./DocumentWrapper.module.css";
import { useFetch } from "../../src/hooks/useFetch";
import { useData } from "../../src/hooks/useData";
import { useEffect } from "react";

export const DocumentContainer = ({ document }) => {
  const [show, setShow] = useState(false);
  const {['data']:types, loading, request}=useData()
  const { deleteData } = useFetch();

  const loadData = async()=>{
    const {response} = await request('get','types',{withCredentials:true})
    
    try {
      if(response.status !== 200){
        throw new Error('Não foi possível obter os dados')
      }
  
    } catch (error) {
      console.log(error)
    }
    
  }
  
  useEffect(()=>{
    loadData()
  },[])
  
  const handleDeleteDocument = (documentId) => {
    deleteData(`document/${documentId}`, documentId);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Popper.Button show={show} setShow={setShow}>
            {types?.filter(({_id})=>(
               _id ===document.type ? <>{_id}</> :''
            )).map(({description})=>description)}
          </Popper.Button>
          <Popper.Content show={show}>
            <div className={style.infoEnterpriseWrapper}>
              <div className={style.infoEnterprise}>
                <p className={style.infoName}>Nome da empresa:</p>
                <p>{document.companyName}</p>
              </div>
              <div className={style.infoEnterprise}>
                <p className={style.infoName}>Nome do Arquivo:</p>
                <p>{document.name}</p>
              </div>
            </div>

            <div className={style.infoEnterpriseWrapper}>
              <div className={style.infoEnterprise}>
                <p className={style.infoName}>Emissao:</p>
                <p>{formatDate(document.emission)}</p>
              </div>
              <div className={style.infoEnterprise}>
                <p className={style.infoName}>Vencimento:</p>
                <p>{formatDate(document.validity)}</p>
              </div>
            </div>
            <div className={style.buttonsActions}>
              <Link to={document.url} target="_blank" download>
                <div className={style.button}>
                  <AiOutlineFilePdf />
                  Abrir arquivo
                </div>
              </Link>
               <button
                  className={style.button}
                  onClick={() => handleDeleteDocument(document.company)}>
                  Excluir Documento
                </button>
            </div>
          </Popper.Content>
        </>
      )}
    </>
  );
};
