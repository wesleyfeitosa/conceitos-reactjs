import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get('/repositories');

      setRepositories(response.data);
    }
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Conceitos Nodejs - ${Date.now()}`,
      url: "https://github.com/wesleyfeitosa/conceitos-nodejs",
      techs: [
        "Nodejs", "Reactjs", "React-Native"
      ]
    }

    const response = await api.post('/repositories', repository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
