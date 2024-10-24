import { useCallback, useState } from "react";
import { Document } from "@/components/Document";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useForm } from "react-hook-form";
import { BsFiletypePdf } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdCancel, MdDeleteOutline } from "react-icons/md";
import style from "@/components/Documents/Documents.module.css";
import { formatDate, formatDateForm } from "@/helpers/formatDate";
import { useFetch } from "@/hooks/useFetch";
import { Modal } from "@/components/Modal";
import LoadingSpinner from "@/components/LoadingSpinner";

export const Documents = ({ document, handleFormSubmit, types }) => {
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { editData, deleteData } = useFetch();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await editData(`document/${document._id}`, data);

      if (!response.status === 200) {
        throw new Error("Erro ao editar documento");
      }
      setEditable(false);
      setLoading(false);
      handleFormSubmit();
    } catch (error) {
      console.error("Erro ao editar documento:", error);
    } finally {
      handleFormSubmit();
    }
  };

  const handleEditForm = useCallback(() => {
    setEditable(true);

    setValue("name", document.name);
    setValue("companyName", document.companyName);
    setValue("emission", formatDateForm(document.emission));
    setValue("validity", formatDateForm(document.validity));
  }, []);

  const handleDeleteConfirmed = async (id) => {
    setLoading(true);

    try {
      const response = await deleteData(`document/${id}`, {
        withCredentials: true,
      });

      if (response.status !== 204) {
        throw new Error("Erro ao exluir documento");
      }

      setLoading(false);

      handleFormSubmit();
      setMessage("Documento excluído com sucesso!");
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
      handleFormSubmit();
    }
  };

  return (
    <>
      <Document.Body>
        <form key={document._id} className={style.form}>
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
                      <Select {...register("type")} defaultValue={document._id}>
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
                    <Document.Button
                      icon={<FaSave />}
                      action="custom"
                      callback={() => handleSubmit(onSubmit)()}
                    />
                  ) : (
                    <Document.Button
                      icon={<CiEdit />}
                      action="custom"
                      callback={() => handleEditForm()}
                    />
                  )}
                  {editable ? (
                    <Document.Button
                      icon={<MdCancel />}
                      action="custom"
                      callback={() => setEditable(false)}
                    />
                  ) : (
                    <Document.Button icon={<MdDeleteOutline />} action="open" />
                  )}
                </>
              </Document.Actions>
              <Modal.Body>
                <Modal.Content>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      {message ? (
                        <>
                          <div className={style.messageWrapper}>
                            <p className={style.modalParagraphMessage}>
                              {message}
                            </p>
                            <Document.Button action="close" icon="Fechar" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={style.modalDeleteDocument}>
                            <h2 className={style.modalTitle}>
                              Excluir Documento
                            </h2>

                            <p className={style.modalParagraph}>
                              Essa ação não pode ser desfeita. Deseja continuar?
                            </p>
                            <p>{document.name}</p>
                            <div className={style.buttonsWrapper}>
                              <Document.Button action="close" icon="Cancelar" />
                              <Document.Button
                                icon="Confirmar"
                                action="custom"
                                callback={() =>
                                  handleDeleteConfirmed(document._id)
                                }
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </Modal.Content>
              </Modal.Body>
            </Modal.Context>
          </Document.Content>
        </form>
      </Document.Body>
    </>
  );
};
