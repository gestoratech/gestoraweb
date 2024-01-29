import { useEffect, useState } from 'react';
import { Header } from '../../../components/header';
import { PiPencilBold, PiTrashBold } from 'react-icons/pi';
import api from '../../../services/api';

export function InventoryView() {
  const [inventories, setInventories] = useState([]);
  const [currentInventory, setCurrentInventory] = useState({});
  const [filter, setFilter] = useState('');
  const [errors, setErrors] = useState({});

  function onSubmit(event) {
    event.preventDefault();
    if(validateForm()) {
      if (isEdit()) {
        updateInventory();
      } else {
        createInventory();
      }

      setErrors({});
    }
  }

  function validateForm() {
    const newErrors = {};

    if(!currentInventory.username) {
      newErrors.username = 'Nome é obrigatório!'
    }

    if(!currentInventory.model) {
      newErrors.model = 'Modelo é obrigatório!'
    }

    if(!currentInventory.brand) {
      newErrors.brand = 'Marca é obrigatório!'
    }

    if(!currentInventory.asset) {
      newErrors.asset = 'Patrimônio é obrigatório!'
    }

    if(!currentInventory.equipment) {
      newErrors.equipment = 'Equipamento é obrigatório!'
    }

    if(!currentInventory.keyboard) {
      newErrors.keyboard = 'Teclado é obrigatório!'
    }

    if(!currentInventory.mouse) {
      newErrors.mouse = 'Mouse é obrigatório!'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function isEdit() {
    return currentInventory.id !== null;
  }

  function setFieldValueInCurrentInventory(event) {
    setCurrentInventory({ ...currentInventory, [event.target.name]: event.target.value });
  }

  function handleCreateInventory() {
    var inventory = {
      id: null,
      asset: '',
      model: 'All In One',
      brand: '',
      username: '',
      sector: 'Indeterminado',
      equipment: '',
      keyboard: '',
      mouse: '',
    };
    setCurrentInventory(inventory);
  }

  function handleUpdateInventory(inventory) {
    setCurrentInventory(inventory);
  }

  function createInventory() {
    const inventory = currentInventory;
    api
      .post('/inventarios', inventory)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        alert('Ocorreu um erro');
      });
  }

  function updateInventory() {
    const inventory = currentInventory;
    api
      .put(`/inventarios/${inventory.id}`, inventory)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        alert('Ocorreu um erro');
      });
  }

  function deleteInventory(id) {
    api
      .delete(`/inventarios/${id}`)
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
    async function getInventories() {
      const response = await api.get('/inventarios');
      const filteredInventories = response.data.filter(inventory => {
          return (
            inventory.asset.toString().toLowerCase().includes(filter.toLowerCase()) ||
            inventory.model.toString().toLowerCase().includes(filter.toLowerCase()) || 
            inventory.brand.toString().toLowerCase().includes(filter.toLowerCase()) ||
            inventory.username.toLowerCase().includes(filter.toLowerCase()) ||
            inventory.sector.toString().toLowerCase().includes(filter.toLowerCase()) ||
            inventory.equipment.toString().toLowerCase().includes(filter.toLowerCase()) || 
            inventory.keyboard.toString().toLowerCase().includes(filter.toLowerCase()) || 
            inventory.mouse.toString().toLowerCase().includes(filter.toLowerCase())  
          )
        }
      );
      setInventories(filteredInventories);
    }

    getInventories();
  }, [filter]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h3 className="text-center  mb-5">Máquinas</h3>
        <div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary mb-3"
              data-bs-toggle="modal"
              data-bs-target="#userForm"
              onClick={handleCreateInventory}
            >
              Adicionar
            </button>
            <div className="d-flex gap-3 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filtro de máquinas"
                id="filter"
                name="filter"
                value={filter}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          {inventories.length <= 0 ? (
            <div className="d-flex justify-content-center mt-3">
              <p>Nenhuma informação foi encontrada!</p>
            </div>
          ) : (
            <div className="table-responsive overflow-auto p-2">
              <table className="table">
                <thead>
                  <tr className='h6'>
                    <th className="text-center">Patrimônio</th>
                    <th className="text-center">Modelo</th>
                    <th className="text-center">Marca</th>
                    <th className="text-center">Nome</th>
                    <th className="text-center">Setor</th>
                    <th className="text-center">Equipamento</th>
                    <th className="text-center">Teclado</th>
                    <th className="text-center">Mouse</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {inventories.map(inventory => (
                    <tr key={inventory.id}>
                      <td className="text-center">{inventory.asset}</td>
                      <td className="text-center">{inventory.model}</td>
                      <td className="text-center">{inventory.brand}</td>
                      <td className="text-center">{inventory.username}</td>
                      <td className="text-center">{inventory.sector}</td>
                      <td className="text-center">{inventory.equipment}</td>
                      <td className="text-center">{inventory.keyboard}</td>
                      <td className="text-center">{inventory.mouse}</td>
                      <td className="text-center">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                        <button
                            className="btn btn-warning pb-2 btn-light"
                            data-bs-toggle="modal"
                            data-bs-target="#userForm"
                            onClick={() => {
                              handleUpdateInventory(inventory);
                            }}
                          >
                            <PiPencilBold />
                          </button>
                          <button
                            className="btn btn-danger pb-2 btn-light"
                            onClick={() => {
                              deleteInventory(inventory.id);
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
                {isEdit() ? 'Editar PC' : 'Adicionar PC'}
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
                {/* input asset */}
                <div className="mb-3">
                  <label htmlFor="asset" className="form-label">
                    Patrimônio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Informe o patrimônio"
                    id="asset"
                    name="asset"
                    value={currentInventory.asset}
                    onChange={setFieldValueInCurrentInventory}
                  />
                  {errors.asset && <p className="text-danger">{errors.asset}</p>}
                </div>

                {/* select model */}
                <div className="mb-3">
                    <label htmlFor="model" className="form-label">
                      Modelo
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="model"
                      name="model"
                      value={currentInventory.model}
                      onChange={setFieldValueInCurrentInventory}
                    >
                      <option value="AllInOne">All In One</option>
                      <option value="Desktop">Desktop</option>
                      <option value="Notebook">Notebook</option>
                    </select>
                  </div>

                {/* input brand */}
                <div className="mb-3">
                  <label htmlFor="brand" className="form-label">
                    Marca
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Informe a marca"
                    id="brand"
                    name="brand"
                    value={currentInventory.brand}
                    onChange={setFieldValueInCurrentInventory}
                  />
                  {errors.brand && <p className="text-danger">{errors.brand}</p>}
                </div>
                  
                {/* input username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Informe um nome"
                    id="username"
                    name="username"
                    value={currentInventory.username}
                    onChange={setFieldValueInCurrentInventory}
                  />
                  {errors.username && <p className="text-danger">{errors.username}</p>}
                </div>

                {/* select setores - deixar dinâmico */}
                <div className="mb-3">
                    <label htmlFor="sector" className="form-label">
                      Setor
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="sector"
                      name="sector"
                      value={currentInventory.sector}
                      onChange={setFieldValueInCurrentInventory}
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

                <div className='d-flex justify-content-between gap-3'>
                  {/* input equipment */}
                <div className="mb-3">
                  <label htmlFor="equipment" className="form-label">
                    Equipamento
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Equipamento"
                    id="equipment"
                    name="equipment"
                    value={currentInventory.equipment}
                    onChange={setFieldValueInCurrentInventory}
                  />
                  {errors.equipment && <p className="text-danger">{errors.equipment}</p>}
                </div>

                {/* input keyboard */}
                <div className="mb-3">
                  <label htmlFor="keyboard" className="form-label">
                    Teclado
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Teclado"
                    id="keyboard"
                    name="keyboard"
                    value={currentInventory.keyboard}
                    onChange={setFieldValueInCurrentInventory}
                  />
                  {errors.keyboard && <p className="text-danger">{errors.keyboard}</p>}
                </div>

                {/* input mouse */}
                <div className="mb-3">
                  <label htmlFor="mouse" className="form-label">
                    Mouse
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mouse"
                    id="mouse"
                    name="mouse"
                    value={currentInventory.mouse}
                    onChange={setFieldValueInCurrentInventory}
                  />
                  {errors.mouse && <p className="text-danger">{errors.mouse}</p>}
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
