import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/pedido.css';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidoFeito, setPedidoFeito] = useState(false);
    const [novoPedido, setNovoPedido] = useState({
        name: '',
        tableNumber: '',
        items: [{ category: '', itemName: '', quantity: 1 }]
    });

    const [categorias, setCategorias] = useState([]);
    const [itensPorCategoria, setItensPorCategoria] = useState({});

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/menu');
                const menuItems = response.data;

                const categoriasUnicas = [...new Set(menuItems.map(item => item.category))];
                setCategorias(categoriasUnicas);

                const itensAgrupados = menuItems.reduce((acc, item) => {
                    if (!acc[item.category]) {
                        acc[item.category] = [];
                    }
                    acc[item.category].push(item);
                    return acc;
                }, {});

                setItensPorCategoria(itensAgrupados);
            } catch (error) {
                console.error('Erro ao buscar o menu:', error);
            }
        };

        fetchMenu();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoPedido({ ...novoPedido, [name]: value });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...novoPedido.items];
        items[index][name] = value;
        setNovoPedido({ ...novoPedido, items });
    };

    const handleAddItem = () => {
        setNovoPedido({ ...novoPedido, items: [...novoPedido.items, { category: '', itemName: '', quantity: 1 }] });
    };

    const handleRemoveItem = (index) => {
        const items = [...novoPedido.items];
        items.splice(index, 1);
        setNovoPedido({ ...novoPedido, items });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pedidoParaEnviar = {
            ...novoPedido,
            items: novoPedido.items.map(item => ({
                category: item.category,
                name: item.itemName, // Renomeia "itemName" para "name" para facilitar o backend
                quantity: item.quantity,
            })),
        };
    
        try {
            const response = await axios.post('http://localhost:3001/api/pedidos', pedidoParaEnviar);
            setPedidos([...pedidos, response.data]);
            setNovoPedido({ name: '', tableNumber: '', items: [{ category: '', itemName: '', quantity: 1 }] });
            setPedidoFeito(true);
            setTimeout(() => setPedidoFeito(false), 3000);
        } catch (error) {
            console.error('Erro ao registrar pedido:', error);
        }
    };

    return (
        <div className="novo-pedido">
            <h2>Novo Pedido</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="name" value={novoPedido.name} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Mesa:</label>
                    <input type="text" name="tableNumber" value={novoPedido.tableNumber} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Itens:</label>
                    {novoPedido.items.map((item, index) => (
                        <div key={index} className="item">
                            <select name="category" value={item.category} onChange={(e) => handleItemChange(index, e)} required>
                                <option value="">Selecione a Categoria</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria} value={categoria}>{categoria}</option>
                                ))}
                            </select>
                            <select name="itemName" value={item.itemName} onChange={(e) => handleItemChange(index, e)} required>
                                <option value="">Selecione o Item</option>
                                {itensPorCategoria[item.category]?.map((itemMenu) => (
                                    <option key={itemMenu.id} value={itemMenu.name}>{itemMenu.name}</option>
                                ))}
                            </select>
                            <input type="number" name="quantity" placeholder="Quantidade" value={item.quantity} onChange={(e) => handleItemChange(index, e)} required min="1" />
                            <button type="button" onClick={() => handleRemoveItem(index)}>Remover</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddItem}>Adicionar Item</button>
                </div>
                <button type="submit">Registrar Pedido</button>
                {pedidoFeito && <p>Pedido registrado com sucesso!</p>}
            </form>
        </div>
    );
};

export default Pedidos;