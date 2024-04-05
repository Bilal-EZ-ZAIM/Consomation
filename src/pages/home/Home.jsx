import React, { useContext } from 'react';
import { UserContext } from '../../context/ContextProvider';
import { Container, Card, Button } from 'react-bootstrap';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Bienvenue sur la page d'accueil</Card.Title>
          {user ? (
            <>
              <Card.Text>Bonjour, {user.nom} {user.prenom}!</Card.Text>
              <Card.Text>Vous êtes connecté avec l'email : {user.email}.</Card.Text>
            </>
          ) : (
            <>
              <Card.Text>Connectez-vous pour accéder à plus de fonctionnalités</Card.Text>
              <Button variant="primary">Se connecter</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
