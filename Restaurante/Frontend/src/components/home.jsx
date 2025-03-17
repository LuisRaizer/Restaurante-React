import React from 'react';
import { Link } from 'react-router-dom';
import './css/home.css';

const Home = () => {
    return (
        <div>
        <header>
                <h1>Bem-vindo ao Restaurante dos Sabores</h1>
                <p>O melhor lugar para saborear comidas deliciosas</p>
            </header>
            
        <div className="main-content">
            <section>
                <h2>Sobre Nos</h2>
                <p>Olá, me chamo Luis e no dia 04/10 de 2009 abri este restaurante com o sonho de me tornar um chefe renomado. Eu e minha equipe estaremos gratos e ansiosos para atendê-lo e proporcionar uma das melhores experiências gastronômicas que você nunca teve. Nosso restaurante oferece uma variedade de pratos feitos com ingredientes frescos e de alta qualidade. Esperamos você aqui.</p>
            </section>
            <section>
                <h2>Confira nosso interior</h2>
                <p>Nosso restaurante conta com os mais sofisticados aparatos para confortar você</p>
            </section>
        </div>
        <hr />
        <section className='menu-link'>
                <h2>Menu</h2>
                <p>Confira nosso menu e faça seu pedido.</p>
                <Link to="/menu" className="menu-button">Ver Menu</Link>
            </section>
        </div>
    );
};

export default Home;