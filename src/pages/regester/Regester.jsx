
import React, { useState } from 'react';
import axios from 'axios';

const Regester = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();

        try {
            const formatDate = {
                nom: nom,
                prenom: prenom,
                email: email,
                password: password
            };

            const response = await axios.post('http://127.0.0.1:8000/api/regester', formatDate);
            console.log(response.data);

            if (response.status === 201) {
                console.log('Inscription réussie');
            } else {
                console.log('Échec de l\'inscription');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
        }
    };

    return (
        <main className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-header">
                            <h3 className="text-center">Inscription</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={register}>
                                <div className="mb-3">
                                    <label htmlFor="nom" className="form-label">Nom d'utilisateur</label>
                                    <input type="text" className="form-control" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="prenom" className="form-label">Prenom d'utilisateur</label>
                                    <input type="text" className="form-control" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Regester;
