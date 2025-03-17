import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import { Link } from 'react-router-dom';
import './css/menu.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/menu');
                console.log('Dados recebidos:', response.data);
                setMenuItems(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const groupByCategory = (items) => {
        if (!Array.isArray(items)) {
            console.error('Esperando um array, recebeu um:', typeof items);
            return {};
        }
        return items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
    };

    const groupedMenuItems = groupByCategory(menuItems);

    if (loading) {
        return <div className="menu-container">Carregando...</div>;
    }

    if (error) {
        return <div className="menu-container">Erro ao carregar o menu: {error}</div>;
    }

    return (
        <div className="container">
            <Header />
            <div className="menu-container">
                <p className="menu">Menu</p>
                <div className="menu-columns">
                    {Object.keys(groupedMenuItems).map(category => (
                        <div key={category} className="menu-category">
                            <h2>{category}</h2>
                            <ul className="menu-list">
                                {groupedMenuItems[category].map(item => (
                                    <li key={item.id} className="menu-item">
                                        {item.name} - R${item.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <hr />
            <div className="pedido">
            <p>Faça seu pedido já:
                <Link to="/pedidos" className="pedidos-link">Pedir</Link>
            </p>
            </div>
        </div>
    );
};

export default Menu;