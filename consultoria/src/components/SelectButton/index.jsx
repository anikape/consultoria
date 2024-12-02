import { useState } from "react";
import { useForm } from "react-hook-form";

import { BiEdit, BiSave, BiTrash } from "react-icons/bi";

import { useFetch } from "@/hooks/useFetch";

import "./style.css";

const SelectButton = ({ types, onDelete, onEdit }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [messageFeedback, setMessageFeedback] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  const { editData, deleteData } = useFetch();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = item => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleDelete = async id => {
    try {
      const response = await deleteData(`types/${id}`);

      if (response.status !== 204) {
        throw new Error("Não foi possivel exluir o tipo");
      }

      await onDelete(id);
      setIsOpen(true);
    } catch ({ message }) {
      setMessageFeedback(message);
    }
  };

  const handleEdit = id => {
    setEditItemId(id);
    const itemToEdit = types.find(type => type._id === id);
    setValue("description", itemToEdit.description);
  };

  const handleSave = async data => {
    setLoading(true);

    try {
      const response = await editData(`types/${editItemId}`, data);

      if (response.status !== 200) {
        throw new Error(response.response.data);
      }
      await onEdit(response.data);
      setEditItemId(null);
      setMessageFeedback("Tipo alterado com sucesso");
    } catch ({ message }) {
      setMessageFeedback(message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputClick = e => e.stopPropagation();

  return (
    <>
      <h3 className="select-simulado__title">
        Tipos de documento cadastrados:
      </h3>
      <div className="select-simulado">
        <div className="select-simulado__header" onClick={handleToggle}>
          <span>
            {selectedItem
              ? selectedItem.description
              : "Selecione um item para editar ou excluir"}
          </span>
        </div>

        {isOpen && (
          <ul className="select-simulado__list">
            <form onSubmit={handleSubmit(handleSave)}>
              {types?.map(({ _id, description }) => (
                <li key={_id} className="select-simulado__item">
                  <div className="select-simulado__description">
                    <span
                      className="select-simulado_span"
                      onClick={() => handleSelect({ _id, description })}>
                      <>
                        {editItemId === _id ? (
                          <input
                            type="text"
                            {...register("description")}
                            onClick={handleInputClick}
                          />
                        ) : (
                          <p>{description}</p>
                        )}
                      </>
                      {editItemId === _id && (
                        <p className="select-simulado__erro">
                          {loading ? "Carregando..." : messageFeedback}
                        </p>
                      )}
                    </span>
                    <div className="select-simulado__buttons">
                      {editItemId === _id ? (
                        <button className="delete-button">
                          <BiSave />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleEdit(_id)}
                          className="delete-button">
                          <BiEdit />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(_id)}
                        className="delete-button">
                        <BiTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </form>
          </ul>
        )}
      </div>
    </>
  );
};

export { SelectButton };
