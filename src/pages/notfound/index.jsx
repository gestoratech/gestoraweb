import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <h1>Página não encontrada!</h1>
      <Link to="/">
        VOLTAR
      </Link>
    </>
  )
}