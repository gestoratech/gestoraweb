import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/home'
import { NotFound } from '../pages/notfound'
import { UserView } from '../pages/users/view'
import { InventoryView } from '../pages/inventories/view'
import { CollaboratorView } from '../pages/collaborators/view'
import { Login } from '../pages/login'
import { PrivateRoutes } from './private.routes'
import { AuthenticatedRoutes } from './authenticated.routes'

export function Router() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Rotas Usuários */}
        <Route path='*' element={<NotFound/>}/>
        <Route path='/' element={
          <PrivateRoutes>
            <Home/>
          </PrivateRoutes>
        }/>
        <Route path='/login' element={
          <AuthenticatedRoutes>
            <Login/>
          </AuthenticatedRoutes>
        }/>
        <Route path='/usuarios/sistema' element={
          <PrivateRoutes>
            <UserView/>
          </PrivateRoutes>
        }/>
        <Route path='/usuarios/colaboradores' element={
          <PrivateRoutes>
            <CollaboratorView/>
          </PrivateRoutes>
        }/>
        <Route path='/inventarios/maquinas' element={
          <PrivateRoutes>
            <InventoryView/>
          </PrivateRoutes>
        }/>

      </Routes>
    </BrowserRouter>
  )
}