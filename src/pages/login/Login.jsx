import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/ContextProvider';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    const { user, setuser, setIsAuthenticated , setTypeUtilisateur} = useContext(UserContext);



    const login = async (e) => {
        e.preventDefault();

        try {
            const formatDate = {
                email: username,
                password: password
            };

            const response = await axios.post('http://127.0.0.1:8000/api/login', formatDate);
            console.log(response.data);

            if (response.status === 200) {
                setIsAuthenticated(true);
                setuser(response.data.user)
                setTypeUtilisateur(response.data.user.role)
                console.log(response.data.user.role);
                localStorage.setItem('tokens', response.data.token); // Sauvegarde du token dans le local storage
            } else {
                console.log('Échec de la connexion');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
        }
    };

    return (
        <main className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-header">
                            <h3 className="text-center">Connexion</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={login}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                                    <input type="email" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Se connecter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
