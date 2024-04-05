import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/ContextProvider';
import { Container, Card, Button, Form } from 'react-bootstrap';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [soldeActuel, setSoldeActuel] = useState('');
    const [message, setMessage] = useState('');
    const [existingAccount, setExistingAccount] = useState(user?.acount);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const apiURL = 'http://127.0.0.1:8000/api';

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            try {
                const token = localStorage.getItem('tokens');
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                };

                const response = await axios.get(`${apiURL}/transaction-history`, config);
                setTransactionHistory(response.data);
            } catch (error) {
                console.error('Error fetching transaction history:', error);
                setMessage('Erreur lors du chargement de l\'historique des transactions.');
            }
        };

        fetchTransactionHistory();
    }, []);

    const handleCreateAccount = async () => {
        try {
            const token = localStorage.getItem('tokens');
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            };

            const response = await axios.post(`${apiURL}/createAccount`, { Solde_actuel: soldeActuel }, config);
            setMessage(response.data.message);
            setExistingAccount(response.data.account); // Mettre à jour le compte existant après la création
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const handleDeposit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokens');
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.post(`${apiURL}/deposit`, { Solde_actuel: soldeActuel }, config);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erreur lors du dépôt.');
        }
    };

    return (
        <div className="container-md mt-5">
            {user ? (
                <div className="container-md row justify-content-center">
                    <div className="container-md">
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Profil de {user.nom} {user.prenom}</h5>
                                        <p className="card-text"><strong>Email:</strong> {user.email}</p>
                                        <p className="card-text"><strong>Role:</strong> {user.role}</p>

                                        {user?.acount ? (
                                            <div>
                                                <hr />
                                                <h5 className="card-title">Détails du compte</h5>
                                                <p className="card-text"><strong>Solde actuel:</strong> {user?.acount.Solde_actuel}</p>
                                                <p className="card-text"><strong>Numéro de compte:</strong> {user?.acount.numero_compte}</p>

                                                <Form onSubmit={handleDeposit}>
                                                    <Form.Group className="mb-3" controlId="formDeposit">
                                                        <Form.Label>Déposer un montant</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Entrez le montant à déposer"
                                                            value={soldeActuel}
                                                            onChange={(e) => setSoldeActuel(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                    <Button variant="primary" type="submit">
                                                        Déposer
                                                    </Button>
                                                </Form>
                                            </div>
                                        ) : (
                                            <div>
                                                <hr />
                                                <h5 className="card-title">Créer un compte</h5>
                                                <div className="mb-3">
                                                    <label htmlFor="soldeActuel" className="form-label">Solde actuel :</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="soldeActuel"
                                                        value={soldeActuel}
                                                        onChange={(e) => setSoldeActuel(e.target.value)}
                                                    />
                                                </div>
                                                <button className="btn btn-primary" onClick={handleCreateAccount}>Créer le compte</button>
                                            </div>
                                        )}
                                        {message && <div className="mt-3">{message}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card" aria-hidden="true">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                            <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                        </p>
                        <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                    </div>
                </div>
            )}

            <div className="container-md row justify-content-center">
                <div className="col">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h2 className="card-title">Historique des transactions</h2>
                            <h4 className="card-title">Transactions envoyées</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Numéro de compte</th>
                                        <th scope="col">Montant</th>
                                        <th scope="col">Nom</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionHistory.sender_transactions ? transactionHistory.sender_transactions.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.recipient[0]?.numero_compte}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.recipient[0]?.users?.nom}</td>
                                        </tr>
                                    )) : null}
                                </tbody>
                            </table>

                            <h4 className="card-title">Transactions reçues</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Numéro de compte</th>
                                        <th scope="col">Montant</th>
                                        <th scope="col">Nom</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionHistory.recipient_transactions ? transactionHistory.recipient_transactions.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.sender[0]?.numero_compte}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.sender[0]?.users?.nom}</td>
                                        </tr>
                                    )) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
