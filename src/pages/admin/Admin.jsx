import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('tokens');
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            };
            const response = await fetch('http://127.0.0.1:8000/api/DAdmintransactionHistory', config);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTransactions(data.sender_transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    return (
        <div className='container-md'>
            <h1>Admin Transaction History</h1>
            <table className="container-md table table-striped">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Sender</th>
                        <th>Recipient</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.amount}</td>
                            <td>{transaction.sender[0].users.prenom} {transaction.sender[0].users.nom}</td>
                            <td>{transaction.recipient[0].users.prenom} {transaction.recipient[0].users.nom}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
