import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import Card from 'react-bootstrap/Card';
import api from "../../services/api";

export function Home() {
  const [users, setUsers] = useState([])
  const [inventories, setInventories] = useState([])
  const [collaborators, setCollaborators] = useState([])

  useEffect(() => {
    async function getUsers() {
      const response = await api.get('/usuarios');

      setUsers(response.data)
    }

    async function getInventories() {
      const response = await api.get('/inventarios');

      setInventories(response.data)
    }

    async function getCollaborators() {
      const response = await api.get('/colaboradores');

      setCollaborators(response.data)
    }

    getUsers();
    getInventories();
    getCollaborators();
  }, []);
  return (
    <>
      <Header/>
      <section className="d-flex justify-content-center pt-5 gap-3">

        <Card style={{ width: '18rem', alignItems: 'center', textAlign: 'center' }}>
          <Card.Body>
            <Card.Title>Usuários</Card.Title>
            <Card.Text>
              {users.length}
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', alignItems: 'center', textAlign: 'center' }}>
          <Card.Body>
            <Card.Title>Máquinas</Card.Title>
            <Card.Text>
              {inventories.length}
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', alignItems: 'center', textAlign: 'center' }}>
          <Card.Body>
            <Card.Title>Colaboradores</Card.Title>
            <Card.Text>
              {collaborators.length}
            </Card.Text>
          </Card.Body>
        </Card>
      </section>
    </>
  )
}