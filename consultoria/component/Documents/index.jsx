import { useState } from "react";
import { Document } from "../Document";
import { Input } from "../Input";
import { Select } from "../Select";
import { useForm } from "react-hook-form";
import { BsFiletypePdf } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdCancel, MdDeleteOutline } from "react-icons/md";
import style from "./Documents.module.css";
import { formatDate, formatDateForm } from "../../src/helpers/formatDate";
import { useFetch } from "../../src/hooks/useFetch";
import { Modal } from "../Modal";
import { useModal } from "../Modal/ModalContext";

export const Documents = ({ document, handleFormSubmit, types }) => {
  // console.log(document);

  const [editable, setEditable] = useState(false);

  const [loading, setLoading] = useState(false);

  const { editData } = useFetch();
  const { register, handleSubmit, setValue } = useForm();

  // console.log(types);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await editData(`document/${document._id}`, data);

      if (!response.status === 200) {
        throw new Error("Erro ao editar documento");
      }
      setEditable(false);
      handleFormSubmit();
    } catch (error) {
      console.error("Erro ao editar documento:", error);
    } finally {
      handleFormSubmit();
    }
  };

  const handleEditForm = () => {
    setEditable(true);
    setValue("name", document.name);
    setValue("companyName", document.companyName);
    setValue("emission", formatDateForm(document.emission));
    setValue("validity", formatDateForm(document.validity));
  };

  return (
    <>
      <Document.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          key={document._id}
          className={style.form}
        >
          <Document.Content>
            <input
              type="hidden"
              {...register("_id", { setValueAs: () => document._id })}
            />
            <div className={style.content}>
              <div className={style.itemHeader}>
                <Document.Item>
                  <p>Documento</p>
                  {editable ? (
                    <Input {...register("name")} />
                  ) : (
                    <p>{document.name}</p>
                  )}
                </Document.Item>

                <Document.Item>
                  <p>Empresa</p>
                  {editable ? (
                    <Input {...register("companyName")} />
                  ) : (
                    <p>{document.companyName}</p>
                  )}
                </Document.Item>
                <Document.Item>
                  <p>Tipo</p>
                  {editable ? (
                    <>
                      <Select
                        {...register("type")}
                        defaultValue={document.description}
                      >
                        {types?.map(({ _id, description }) => (
                          <option
                            key={_id}
                            value={_id}
                            disabled={types ? "" : "disabled"}
                            selected={document.type === _id ? "selected" : ""}
                          >
                            {types ? description : "carregando..."}
                          </option>
                        ))}
                      </Select>
                    </>
                  ) : (
                    <p>
                      {types
                        .filter(({ _id }) => _id === document.type)
                        .map(({ description }) => description).length > 0
                        ? types
                            .filter(({ _id }) => _id === document.type)
                            .map(({ description }) => description)
                        : ["Tipo não cadastrado"]}
                    </p>
                  )}
                </Document.Item>
              </div>

              <div className={style.itemHeader}>
                <Document.Item>
                  <p>Emissão</p>
                  {editable ? (
                    <Input {...register("emission")} type="date" />
                  ) : (
                    <p>{formatDate(document.emission)}</p>
                  )}
                </Document.Item>
                <Document.Item>
                  <p>Validade</p>
                  {editable ? (
                    <Input {...register("validity")} type="date" />
                  ) : (
                    <p>{formatDate(document.validity)}</p>
                  )}
                </Document.Item>
              </div>
            </div>
            <Modal.Context>
              <Document.Actions>
                <>
                  <a
                    href={document.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style.buttons}
                  >
                    <BsFiletypePdf />
                  </a>
                  {editable ? (
                    <>
                      <button
                        className={style.buttons}
                        // onClick={handleSaveEdit}
                      >
                        <FaSave />
                      </button>
                    </>
                  ) : (
                    <button
                      className={style.buttons}
                      // onClick={handleSubmit(handleEditButtonClick)}
                      onClick={handleEditForm}
                    >
                      <CiEdit />
                    </button>
                  )}
                  {editable ? (
                    <button
                      className={style.buttons}
                      onClick={() => setEditable(false)}
                    >
                      <MdCancel />
                    </button>
                  ) : (
                    <button
                      className={style.buttons}
                      // onClick={() => handleDeleteDocument(document._id)}
                      onClick={() => setIsOpen(true)}
                    >
                      <MdDeleteOutline />
                    </button>
                  )}
                </>
              </Document.Actions>
              <Modal.Body>
                <Modal.Button>Tetste</Modal.Button>
                <Modal.Content>sdfsdf</Modal.Content>
              </Modal.Body>
            </Modal.Context>
          </Document.Content>
        </form>
      </Document.Body>
    </>
  );
};

//  {documents.map((document) => (
//               <form
//                 onSubmit={handleSubmit(handleEditDocument)}
//                 key={document._id}
//               >
//                 <Document.Content>
//                   <div className={style.itemHeader}>
//                     <Document.Item>
//                       <p>Documento</p>
//                       {editable ? (
//                         <Input {...register("name")} />
//                       ) : (
//                         <p>{document.name}</p>
//                       )}
//                     </Document.Item>
//                     <Document.Item>
//                       <p>Empresa</p>
//                       {editable ? (
//                         <Input {...register("companyName")} />
//                       ) : (
//                         <p>{document.companyName}</p>
//                       )}
//                     </Document.Item>
//                     <Document.Item>
//                       <p>Tipo</p>
//                       {editable ? (
//                         <>
//                           <Select
//                             {...register("type")}
//                             defaultValue={document.type}
//                           >
//                             {types?.map(({ _id, description }) => (
//                               <option
//                                 key={_id}
//                                 value={_id}
//                                 disabled={types ? "" : "disabled"}
//                               >
//                                 {types ? description : "carregando..."}
//                               </option>
//                             ))}
//                           </Select>
//                         </>
//                       ) : (
//                         <p>
//                           {types
//                             .filter(({ _id }) => _id === document.type)
//                             .map(({ description }) => description).length > 0
//                             ? types
//                                 .filter(({ _id }) => _id === document.type)
//                                 .map(({ description }) => description)
//                             : ["Tipo não cadastrado"]}
//                         </p>
//                       )}
//                     </Document.Item>
//                   </div>
//                   <div className={style.itemHeader}>
//                     <Document.Item>
//                       <p>Emissão</p>
//                       {editable ? (
//                         <Input {...register("emission")} type="date" />
//                       ) : (
//                         <p>{formatDate(document.emission)}</p>
//                       )}
//                     </Document.Item>
//                     <Document.Item>
//                       <p>Validade</p>
//                       {editable ? (
//                         <Input {...register("validity")} type="date" />
//                       ) : (
//                         <p>{formatDate(document.validity)}</p>
//                       )}
//                     </Document.Item>
//                   </div>
//                   <Document.Actions>
//                     <>
//                       <a
//                         href={document.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className={style.buttons}
//                       >
//                         <BsFiletypePdf />
//                       </a>

//                       {editable ? (
//                         <>
//                           <button
//                             className={style.buttons}
//                             onClick={handleSaveEdit}
//                           >
//                             <FaSave />
//                           </button>
//                         </>
//                       ) : (
//                         <button
//                           className={style.buttons}
//                           onClick={handleSubmit(handleEditButtonClick)}
//                         >
//                           <CiEdit />
//                         </button>
//                       )}

//                       {editable ? (
//                         <button
//                           className={style.buttons}
//                           onClick={handleCancelEdit}
//                         >
//                           <MdCancel />
//                         </button>
//                       ) : (
//                         <button
//                           className={style.buttons}
//                           onClick={() => handleDeleteDocument(document._id)}
//                         >
//                           <MdDeleteOutline />
//                         </button>
//                       )}
//                     </>
//                   </Document.Actions>
//                 </Document.Content>
//               </form>
//             ))}
//           </Document.Body> */}
