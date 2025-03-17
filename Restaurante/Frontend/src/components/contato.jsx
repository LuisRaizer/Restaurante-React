import axios from 'axios';
import './css/contato.css';
import React, { useState } from 'react';

const Contact = () => {
    const [Dados, setDados] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setstatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/api/contato', Dados);
            setstatus('Mensagem enviada com sucesso!');
            setDados({
                name: '',
                email: '',
                message: '',
            });
        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error);
            setstatus('Erro ao enviar mensagem.');
        }
    };

    const handleChange = (e) => {
        setDados({
            ...Dados,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="contact-container">
            <h1>Entre em Contato</h1>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={Dados.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={Dados.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Mensagem:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={Dados.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Enviar</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default Contact;