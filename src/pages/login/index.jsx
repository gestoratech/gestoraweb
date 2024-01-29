import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Login.scss';

export function Login() {
  const { Login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleLogin(event) {
    event.preventDefault()

    let data = {
      email,
      password
    }

    await Login(data)
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleLogin}>
            <h2>AUTENTIQUE-SE</h2>
            <input
            type="text"
            placeholder="exemplo@gestoracontabilidade.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button>Entrar</button>
        </form>
      </div>
    </div>
  );
}

