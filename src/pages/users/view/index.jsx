import { useEffect, useState } from 'react';
import { Header } from '../../../components/header';
import { PiPencilBold, PiTrashBold } from 'react-icons/pi';
import api from '../../../services/api';

export function UserView() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [filter, setFilter] = useState('');
  const [errors, setErrors] = useState({});

  function onSubmit(event) {
    event.preventDefault();
    if(validateForm()) {
      if (isEdit()) {
        updateUser();
      } else {
        createUser();
      }

      setErrors({});
    }
  }

  function validateForm() {
    const newErrors = {};

    if(!currentUser.name) {
      newErrors.name = 'Nome é obrigatório!'
    }

    if(!currentUser.email) {
      newErrors.email = 'Email é obrigatório!'
    } else if(!isValidEmail(currentUser.email)) {
      newErrors.email = 'Informe um e-mail válido!'
    }

    if(!currentUser.password) {
      newErrors.password = 'Senha é obrigatório!'
    }

    if(!currentUser.ramal) {
      newErrors.ramal = 'Ramal é obrigatório!'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  function isEdit() {
    return currentUser.id !== null;
  }

  function setFieldValueInCurrentUser(event) {
    setCurrentUser({ ...currentUser, [event.target.name]: event.target.value });
  }

  function handleCreateUser() {
    var user = {
      id: null,
      name: '',
      email: '',
      password: '',
      ramal: 0,
      role: 'Usuário',
      sector: 'Indeterminado',
    };
    setCurrentUser(user);
  }

  function handleUpdateUser(user) {
    setCurrentUser(user);
  }

  function createUser() {
    const user = currentUser;
    api
      .post('/usuarios', user)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        alert('Ocorreu um erro');
      });
  }

  function updateUser() {
    const user = currentUser;
    api
      .put(`/usuarios/${user.id}`, user)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        alert('Ocorreu um erro');
      });
  }

  function deleteUser(id) {
    api
      .delete(`/usuarios/${id}`)
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
    async function getUsers() {
      const response = await api.get('/usuarios');
      const filteredUsers = response.data.filter(user => {
          return (
            user.name.toLowerCase().includes(filter.toLowerCase()) ||
            user.ramal.toString().toLowerCase().includes(filter.toLowerCase()) ||
            user.email.toString().toLowerCase().includes(filter.toLowerCase()) ||
            user.role.toString().toLowerCase().includes(filter.toLowerCase()) ||
            user.sector.toString().toLowerCase().includes(filter.toLowerCase())
          )
        }
      );
      setUsers(filteredUsers);
    }

    getUsers();
  }, [filter]);

  return (
    <>
      <Header />
      <div className="container mt-5" style={{ overflow: 'hidden' }}>
        <h3 className="text-center mb-5">Usuários</h3>
        <div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary mb-3"
              data-bs-toggle="modal"
              data-bs-target="#userForm"
              onClick={handleCreateUser}
            >
              Adicionar
            </button>
            <div className="d-flex gap-3 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filtro de usuário"
                id="filter"
                name="filter"
                value={filter}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          {users.length <= 0 ? (
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
                    <th className="text-center">Ramal</th>
                    <th className="text-center">Setor</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="text-center">{user.name}</td>
                      <td className="text-center">{user.email}</td>
                      <td className="text-center">{user.ramal}</td>
                      <td className="text-center">{user.sector}</td>
                      <td className="text-center">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <button
                              className="btn btn-warning pb-2 btn-light"
                              data-bs-toggle="modal"
                              data-bs-target="#userForm"
                              onClick={() => {
                                handleUpdateUser(user);
                              }}
                            >
                              <PiPencilBold />
                            </button>
                            <button
                              className="btn btn-danger pb-2 btn-light"
                              onClick={() => {
                                deleteUser(user.id);
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

      {/* MODAL EDITAR/CRIAR USUÁRIOS */}
      <div className="modal" tabIndex="-1" id="userForm">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit() ? 'Editar Usuário' : 'Adicionar Usuário'}
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
                    placeholder="Informe um nome"
                    id="name"
                    name="name"
                    value={currentUser.name}
                    onChange={setFieldValueInCurrentUser}
                  />
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>
                {/* input email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Informe um email"
                    id="email"
                    name="email"
                    value={currentUser.email}
                    onChange={setFieldValueInCurrentUser}
                  />
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
                {/* input senha */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Informe sua senha"
                    id="password"
                    name="password"
                    value={currentUser.password}
                    onChange={setFieldValueInCurrentUser}
                  />
                  {errors.password && <p className="text-danger">{errors.password}</p>}
                </div>
                <div className='d-flex gap-2'>
                  {/* input ramal */}
                  <div className="mb-3">
                    <label htmlFor="number" className="form-label">
                      Ramal
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Informe o número do ramal"
                      id="ramal"
                      name="ramal"
                      value={currentUser.ramal}
                      onChange={setFieldValueInCurrentUser}
                    />
                    {errors.ramal && <p className="text-danger">{errors.ramal}</p>}
                  </div>
                  {/* select permissão - deixar dinâmico */}
                  <div className="mb-3">
                    <label htmlFor="permissions" className="form-label">
                      Permissão
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="role"
                      name="role"
                      value={currentUser.role}
                      onChange={setFieldValueInCurrentUser}
                    >
                      <option value="Usuário">Usuário</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                  {/* select setores - deixar dinâmico */}
                  <div className="mb-3">
                    <label htmlFor="sectors" className="form-label">
                      Setor
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="sector"
                      name="sector"
                      value={currentUser.sector}
                      onChange={setFieldValueInCurrentUser}
                    >
                      <option value="Indeterminado">Indeterminado</option>
                      <option value="Administrativo">Administrativo</option>
                      <option value="Comercial">Comercial</option>
                      <option value="Contábil">Contábil</option>
                      <option value="Contábil II">Contábil II</option>
                      <option value="Fiscal Contábil">Fiscal Contábil</option>
                      <option value="Controladoria">Controladoria</option>
                      <option value="Diretoria">Diretoria</option>
                      <option value="DP">DP</option>
                      <option value="Financeiro">Financeiro</option>
                      <option value="Fiscal">Fiscal</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Qualidade">Qualidade</option>
                      <option value="RH">RH</option>
                      <option value="Societário">Societário</option>
                      <option value="TI">TI</option>
                    </select>
                  </div>
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
