import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do React Router
import './css/footer.css';

const Footer = () => {
    return (
        <footer>
            <p>@2025 Restaurante dos Sabores. Todos os direitos reservados.</p>
            <p>Endereço: Rua da Pitanga, 123 - Cidade 2000</p>
            <p>Telefone: (85) 91234-5678</p>
            <p className='contato'>
                <Link to="/contato">Entre em Contato</Link>
            </p>
        </footer>
    );
};

export default Footer;