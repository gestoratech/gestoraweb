import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

export function Header() {
  const { Logout } = useContext(AuthContext)

  function LogoutUser() {
   Logout() 
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid container-xl">
          <a className="navbar-brand" href="/">Gestora</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Usuários
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/usuarios/sistema">Sistema</a></li>
                  <li><a className="dropdown-item" href="/usuarios/colaboradores">Colaboradores</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Inventários
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/inventarios/maquinas">Maquinas</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Opções
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={LogoutUser} style={{ cursor: 'pointer' }}>Sair</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}


{/* CÓDIGOS QUE IREI PRECISAR FUTURAMENTE */}

{/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Inventários
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/inventarios/visualizar">Visualizar</a></li>
                </ul>
              </li> */}