const prisma = require('../prismaClient');



const GetPedidos = async (req, res) => {
    try {
        const orders = await prisma.order.findMany();
        res.json(orders);
    } catch (error) {
        res.json({ error: 'Erro ao buscar os pedidos' });
    }
};


const criarPedido = async (req, res) => {
    const { name, tableNumber, items } = req.body;

    try {
        const menuItems = await prisma.menu.findMany();

        const totalPrice = items.reduce((total, item) => {
            const menuItem = menuItems.find(menu => menu.category === item.category && menu.name === item.name);
            const price = menuItem ? menuItem.price : 0;
            return total + (price * item.quantity);
        }, 0);

        const newOrder = await prisma.order.create({
            data: {
                name,
                tableNumber,
                items,
                totalPrice,
            },
        });

        res.json(newOrder);
    } catch (error) {
        res.json({ error: "Erro ao criar pedido" });
    }
};
module.exports = {GetPedidos, criarPedido};
