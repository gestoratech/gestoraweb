import { useEffect, useState } from 'react';
import { Header } from '../../../components/header';
import { PiPencilBold, PiTrashBold } from 'react-icons/pi';
import api from '../../../services/api';

export function CollaboratorView() {
  const [collaborators, setCollaborators] = useState([]);
  const [currentCollaborator, setCurrentCollaborator] = useState({});
  const [filter, setFilter] = useState('');
  const [errors, setErrors] = useState({});

  function onSubmit(event) {
    event.preventDefault();
    if(validateForm()) {
      if (isEdit()) {
        updateCollaborator();
      } else {
        createCollaborator();
      }

      setErrors({});
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  function validateForm() {
    const newErrors = {};

    if(!currentCollaborator.name) {
      newErrors.name = 'Nome é obrigatório!'
    }

    if(!currentCollaborator.email) {
      newErrors.email = 'Email é obrigatório!'
    } else if(!isValidEmail(currentCollaborator.email)) {
      newErrors.email = 'Informe um e-mail válido!'
    }

    if(!currentCollaborator.pass_email) {
      newErrors.pass_email = 'A senha do email é obrigatório!'
    }

    if(!currentCollaborator.skype) {
      newErrors.skype = 'Skype é obrigatório!'
    }

    if(!currentCollaborator.pass_skype) {
      newErrors.pass_skype = 'A senha do skype é obrigatório!'
    }

    if(!currentCollaborator.gmail) {
      newErrors.gmail = 'Gmail é obrigatório!'
    }

    if(!currentCollaborator.pass_gmail) {
      newErrors.pass_gmail = 'A senha do gmail é obrigatório!'
    }

    if(!currentCollaborator.env_user) {
      newErrors.env_user = 'O usuário ambiente é obrigatório!'
    }

    if(!currentCollaborator.env_pass_user) {
      newErrors.env_pass_user = 'A senha do usuário ambiente é obrigatório!'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function isEdit() {
    return currentCollaborator.id !== null;
  }

  function setFieldValueInCurrentCollaborator(event) {
    setCurrentCollaborator({ ...currentCollaborator, [event.target.name]: event.target.value });
  }

  function handleCreateCollaborator() {
    var collaborator = {
      id: null,
      name: '',
      email: '',
      pass_email: '',
      skype: '',
      pass_skype: '',
      gmail: '',
      pass_gmail: '',
      env_user: '',
      env_pass_user: ''
    };
    setCurrentCollaborator(collaborator);
  }

  function handleUpdateCollaborator(collaborator) {
    setCurrentCollaborator(collaborator);
  }

  function createCollaborator() {
    const collaborator = currentCollaborator;
    api
      .post('/colaboradores', collaborator)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        alert('Ocorreu um erro');
      });
  }

  function updateCollaborator() {
    const collaborator = currentCollaborator;
    api
      .put(`/colaboradores/${collaborator.id}`, collaborator)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        alert('Ocorreu um erro');
      });
  }

  function deleteCollaborator(id) {
    api
      .delete(`/colaboradores/${id}`)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        alert('Ocorreu um erro!');
      });
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  useEffect(() => {
    async function getCollaborators() {
      const response = await api.get('/colaboradores');
      const filteredCollaborators = response.data.filter(collaborator => {
          return (
            collaborator.name.toString().toLowerCase().includes(filter.toLowerCase()) ||
            collaborator.email.toString().toLowerCase().includes(filter.toLowerCase()) ||
            collaborator.pass_email.toString().toLowerCase().includes(filter.toLowerCase()) ||
            collaborator.skype.toString().toLowerCase().includes(filter.toLowerCase()) ||
            collaborator.pass_skype.toString().toLowerCase().includes(filter.toLowerCase()) ||
            collaborator.gmail.toString().toLowerCase().includes(filter.toLowerCase()) ||
            collaborator.pass_gmail.toString().toLowerCase().includes(filter.toLowerCase()) ||
            collaborator.env_user.toString().toLowerCase().includes(filter.toLowerCase()) ||
            collaborator.env_pass_user.toString().toLowerCase().includes(filter.toLowerCase())
          )
        }
      );
      setCollaborators(filteredCollaborators);
    }

    getCollaborators();
  }, [filter]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h3 className="text-center  mb-5">Colaboradores</h3>
        <div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary mb-3"
              data-bs-toggle="modal"
              data-bs-target="#userForm"
              onClick={handleCreateCollaborator}
            >
              Adicionar
            </button>
            <div className="d-flex gap-3 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filtro de colaboradores"
                id="filter"
                name="filter"
                value={filter}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          {collaborators.length <= 0 ? (
            <div className="d-flex justify-content-center mt-3">
              <p>Nenhuma informação foi encontrada!</p>
            </div>
          ) : (
            <div className="table-responsive overflow-auto p-2">
              <table className="table">
                <thead>
                  <tr className='h6'>
                    <th className="text-center">Nome</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Senha</th>
                    <th className="text-center">Skype</th>
                    <th className="text-center">Senha</th>
                    <th className="text-center">Gmail</th>
                    <th className="text-center">Senha</th>
                    <th className="text-center">Usuário</th>
                    <th className="text-center">Senha</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {collaborators.map(collaborator => (
                    <tr key={collaborator.id}>
                      <td className="text-center">{collaborator.name}</td>
                      <td className="text-center">{collaborator.email}</td>
                      <td className="text-center">{collaborator.pass_email}</td>
                      <td className="text-center">{collaborator.skype}</td>
                      <td className="text-center">{collaborator.pass_skype}</td>
                      <td className="text-center">{collaborator.gmail}</td>
                      <td className="text-center">{collaborator.pass_gmail}</td>
                      <td className="text-center">{collaborator.env_user}</td>
                      <td className="text-center">{collaborator.env_pass_user}</td>
                      <td className="text-center">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                        <button
                            className="btn btn-warning pb-2 btn-light"
                            data-bs-toggle="modal"
                            data-bs-target="#userForm"
                            onClick={() => {
                              handleUpdateCollaborator(collaborator);
                            }}
                          >
                            <PiPencilBold />
                          </button>
                          <button
                            className="btn btn-danger pb-2 btn-light"
                            onClick={() => {
                              deleteCollaborator(collaborator.id);
                            }}
                          >
                            <PiTrashBold />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL EDITAR/CRIAR PCS */}
      <div className="modal" tabIndex="-1" id="userForm">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit() ? 'Editar Colaborador' : 'Adicionar Colaborador'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                {/* input nome */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nome"
                    id="name"
                    name="name"
                    value={currentCollaborator.name}
                    onChange={setFieldValueInCurrentCollaborator}
                  />
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>

                <div className='d-flex gap-2'>

                </div>
                {/* input email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={currentCollaborator.email}
                    onChange={setFieldValueInCurrentCollaborator}
                  />
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
                {/* input senha email */}
                <div className="mb-3">
                  <label htmlFor="pass_email" className="form-label">
                    Senha Email
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Senha Email"
                    id="pass_email"
                    name="pass_email"
                    value={currentCollaborator.pass_email}
                    onChange={setFieldValueInCurrentCollaborator}
                  />
                  {errors.pass_email && <p className="text-danger">{errors.pass_email}</p>}
                </div>

                {/* input skype */}
                <div className="mb-3">
                  <label htmlFor="skype" className="form-label">
                    Skype
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Skype"
                    id="skype"
                    name="skype"
                    value={currentCollaborator.skype}
                    onChange={setFieldValueInCurrentCollaborator}
                  />
                  {errors.skype && <p className="text-danger">{errors.skype}</p>}
                </div>
                {/* input senha email */}
                <div className="mb-3">
                  <label htmlFor="pass_skype" className="form-label">
                    Senha Skype
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Senha Skype"
                    id="pass_skype"
                    name="pass_skype"
                    value={currentCollaborator.pass_skype}
                    onChange={setFieldValueInCurrentCollaborator}
                  />
                  {errors.pass_skype && <p className="text-danger">{errors.pass_skype}</p>}
                </div>

                {/* input gmail */}
                <div className="mb-3">
                  <label htmlFor="gmail" className="form-label">
                    Gmail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Gmail"
                    id="gmail"
                    name="gmail"
                    value={currentCollaborator.gmail}
                    onChange={setFieldValueInCurrentCollaborator}
                  />
                  {errors.gmail && <p className="text-danger">{errors.gmail}</p>}
                </div>
                {/* input senha gmail */}
                <div className="mb-3">
                  <label htmlFor="pass_gmail" className="form-label">
                    Senha Gmail
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Senha Gmail"
                    id="pass_gmail"
                    name="pass_gmail"
                    value={currentCollaborator.pass_gmail}
                    onChange={setFieldValueInCurrentCollaborator}
                  />
                  {errors.pass_gmail && <p className="text-danger">{errors.pass_gmail}</p>}
                </div>

                {/* input usuario ambiente  */}
                <div className="mb-3">
                  <label htmlFor="env_user" className="form-label">
                    Usuário Ambiente
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Usuário Ambiente"
                    id="env_user"
                    name="env_user"
                    value={currentCollaborator.env_user}
                    onChange={setFieldValueInCurrentCollaborator}
                  />
                  {errors.env_user && <p className="text-danger">{errors.env_user}</p>}
                </div>
                {/* input senha usuário ambiente */}
                <div className="mb-3">
                  <label htmlFor="env_pass_user" className="form-label">
                    Senha Usuário Ambiente
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Senha Usuário Ambiente"
                    id="env_pass_user"
                    name="env_pass_user"
                    value={currentCollaborator.env_pass_user}
                    onChange={setFieldValueInCurrentCollaborator}
                  />
                  {errors.env_pass_user && <p className="text-danger">{errors.env_pass_user}</p>}
                </div>
                
                <div className="d-flex justify-content-center modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
