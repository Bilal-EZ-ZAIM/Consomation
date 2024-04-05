import React, { useState } from 'react';
import axios from 'axios';

const Transaction = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            amount: amount,
            recipient_account_id: recipient,

        };
        console.log(formData);
        try {
            const token = localStorage.getItem('tokens');
            console.log(token);
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            };


            const response = await axios.post('http://127.0.0.1:8000/api/transfer', formData, config);
            console.log(response);
            setSuccessMessage(response.data.message);
        } catch (error) {
            setError(error.response.data.error);
            console.log(error.res);
        }
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-4">Effectuer un transfert</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="recipientAccountId" className="form-label">Identifiant du compte du destinataire :</label>
                    <input
                        type="number"
                        className="form-control"
                        id="recipientAccountId"
                        name="recipientAccountId"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Montant à transférer :</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <button type="submit" className="btn btn-primary">Effectuer le transfert</button>
            </form>
        </div>
    );
};

export default Transaction;
