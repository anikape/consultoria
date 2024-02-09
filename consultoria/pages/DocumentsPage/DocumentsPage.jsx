import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../src/hooks/useData';
import style from './Documents.module.css';
import pdf from '../../src/assets/pdf.png';
import edity from '../../src/assets/edity.png';
import home from '../../src/assets/home.png';
import Modal from 'react-modal';
import { AiFillSetting } from 'react-icons/ai';
import Footer from '../../component/Footer';
import Dropzone from 'react-dropzone-uploader';

Modal.setAppElement('#root');

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const DocumentsPage = () => {
  const [clientBack, loadingClient, error2] = useData({
    method: 'GET',
    url: 'client',
    withCredentials: true,
  });

  const [documents, loading, error] = useData({
    method: 'GET',
    url: 'document',
    withCredentials: true,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      setDroppedFiles([...droppedFiles, file]);
    } else if (status === 'removed') {
      const updatedFiles = droppedFiles.filter((f) => f.meta.id !== meta.id);
      setDroppedFiles(updatedFiles);
    }
  };
  
  const [viewFileType, setViewFileType] = useState(null);

  const handleSaveFiles = () => {
    // Aqui você deve implementar a lógica para enviar os arquivos para o backend
    // Você pode usar a biblioteca 'axios' ou a função 'fetch' para fazer a requisição
    // Substitua 'your-upload-endpoint' pela URL correta do seu backend
    const uploadEndpoint = 'your-upload-endpoint';
    const formData = new FormData();

    droppedFiles.forEach((file) => {
      formData.append('files', file.file);
    });

    // Exemplo usando fetch:
    fetch(uploadEndpoint, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Arquivos enviados com sucesso!', data);
        // Adicione aqui qualquer lógica adicional após o envio bem-sucedido
      })
      .catch((error) => {
        console.error('Erro ao enviar arquivos:', error);
      });
  };


  return (
    <div className={style.documentContainer}>
      <Link className={style.homeButton} to="/home">
        <button>
          {' '}
          <img src={home} className={style.home} alt="" />
        </button>
      </Link>

      <section className={style.tableContent}>
        <table>
          <thead>
            <tr>
              <th className={style.infos}> </th>
              <th className={style.infos}>Documento</th>
              <th className={style.infos}>Tipo</th>
              <th className={style.infos}>Empresa</th>
              <th className={style.infos}>Emissão</th>
              <th className={style.infos}>Vencimento</th>
              <th className={style.infos}>
                <AiFillSetting />
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((item) => (
              <tr key={item._id}>
                <td></td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.client}</td>
                <td>{formatDate(item.emission)}</td>
                <td>{formatDate(item.validity)}</td>
                <td>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <img className={style.documentsIcons} src={pdf} alt="" />
                  </a>
                  <button className={style.iconButton} onClick={openEditModal}>
                    <img className={style.documentsIcons} src={edity} alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Modal
  isOpen={isEditModalOpen}
  onRequestClose={closeEditModal}
  contentLabel="Edit Modal"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }}
>
  <button onClick={closeEditModal}>Fechar</button>
  <Dropzone
    getUploadParams={() => ({ url: 'your-upload-endpoint' })}
    onChangeStatus={handleChangeStatus}
    accept="image/*,audio/*,video/*,application/pdf"
    maxFiles={1}
    multiple={false}
    inputContent="Arraste e solte arquivos aqui ou clique para selecionar"
    styles={{
      dropzone: { minHeight: 200, overflow: 'auto' },
      dropzoneActive: { borderColor: 'green' },
    }}
  />
  <button
  style={{
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }}
  onClick={handleSaveFiles}
>
  Salvar
</button>
  <div>
    {droppedFiles.length > 0 && (
      <div>
        <h4>Arquivos adicionados:</h4>
        <ul>
          {droppedFiles.map((file) => (
            <li key={file.meta.id}>{file.meta.name}</li>
          ))}
        </ul>
        
      </div>
    )}
  </div>
</Modal>


      <section className={style.footer}>
        <Footer />
      </section>
    </div>
  );
};

export default DocumentsPage;
