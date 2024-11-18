import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import home from '@/assets/home.png';
import userAdd from '@/assets/useradd.png';
import userEdit from '@/assets/useredit.png';
import del from '@/assets/delete.png';

import { AuthContext } from '@contexts/Auth/AuthContext';
import { useFetch } from '@hooks/useFetch';

import style from '@components/AdminProfile/adm.module.css';

const AdminProfile = () => {
  const auth = useContext(AuthContext);
  const { getData, editData } = useFetch();
  const { register, handleSubmit, reset, setValue } = useForm();

  const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
  const [originalData, setOriginalData] = useState(null); // Armazena os dados originais do usuário
  const [loading, setLoading] = useState(false); // Indica se está carregando
  const [feedback, setFeedback] = useState(''); // Mensagem de sucesso ou erro

  // Função para carregar os dados do usuário
  const loadData = async () => {
    try {
      setLoading(true);
      const response = await getData(`admin/${auth.user?.id}`);
      if (response.status === 200) {
        setOriginalData(response.data); // Salva os dados originais
        reset(response.data); // Preenche o formulário com os dados
      } else {
        setFeedback('Erro ao carregar os dados do administrador.');
      }
    } catch (error) {
      console.log('Erro na requisição:', error);
      setFeedback('Erro ao buscar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega os dados ao montar o componente
  useEffect(() => {
    loadData();
  }, []);

  // Função para ativar o modo de edição
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Função para salvar as alterações
  const handleSaveClick = async (data) => {
    try {
      setLoading(true);
      const response = await editData(`/admin/${auth.user?.id}`, data);

      if (response.status === 200) {
        setFeedback('Dados atualizados com sucesso!');
        setIsEditing(false); // Sai do modo de edição
        loadData(); // Atualiza os dados com a versão salva
        setTimeout(() => {
          setFeedback(''); // Remove a mensagem após 3 segundos
          window.location.reload(); // Recarrega a página
        }, 3000);
      } else {
        setFeedback('Erro ao atualizar os dados. Verifique os campos.');
        console.error('Erro no response.status:', response);
      }
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      setFeedback('Erro ao salvar os dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Função para cancelar as alterações
  const handleCancelClick = () => {
    reset(originalData); // Restaura os dados originais no formulário
    setIsEditing(false); // Sai do modo de edição
    setFeedback(''); // Limpa a mensagem de feedback
  };

  return (
    <section className={style.admContainer}>
      <section className={style.admContent}>
        <div className={style.admNav}>
          <nav className={style.nav}>
            <ul>
              <li>
                <Link className={style.links} to="/Home">
                  <img src={home} alt="Home" />
                  Home
                </Link>
              </li>
              <li>
                <button className={style.links} onClick={handleEditClick}>
                  <img src={userEdit} alt="Editar" />
                  Editar
                </button>
              </li>
              <li>
                <button
                  className={style.links}
                  onClick={() => alert('Função de exclusão implementada!')}
                >
                  <img src={del} alt="Excluir" />
                  Excluir
                </button>
              </li>
              <li>
                <Link className={style.links} to="/CadastroAdm">
                  <img src={userAdd} alt="Novo Usuário" />
                  Novo Usuário
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={style.userData}>
          <h2 className={style.h2}>Dados do cadastro</h2>
          {feedback && <p className={style.feedback}>{feedback}</p>}
          {loading && <p>Carregando...</p>}
          <form className={style.form} onSubmit={handleSubmit(handleSaveClick)}>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input
                id="nome"
                {...register('name', { required: true })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                {...register('email', { required: true })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                {...register('cpf', { required: true })}
                disabled={!isEditing}
              />
            </div>
            {isEditing && (
              <div className={style.buttonGroup}>
                <button className={style.saveButton} type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  className={style.cancelButton}
                  type="button"
                  onClick={handleCancelClick}
                >
                  Cancelar
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </section>
  );
};

export { AdminProfile };
