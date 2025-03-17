const prisma = require('../prismaClient');

const getMenu = async (req, res) => {
    try {
        const menuItems = await prisma.menu.findMany();
        if (menuItems.length === 0) {
            return res.json({ message: 'Nenhum item encontrado no menu' });
        }
        res.json(menuItems);
    } catch (error) {
        console.error('Erro ao buscar os itens do menu:', error);
        res.status(500).json({ error: 'Erro ao buscar os itens do menu' });
    }
};

const adicionarItem = async (req, res) => {
  const { menuItems } = req.body;

  console.log('Dados recebidos:', menuItems);
  

  if (!menuItems || typeof menuItems !== 'object') {
      return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
      for (const category in menuItems) {
          const items = menuItems[category];

          console.log('Processando categoria:', category);

          for (const itemName in items) {
              const price = items[itemName];

              console.log('Adicionando item:', itemName, 'com preço:', price);

              await prisma.menu.create({
                  data: {
                      name: itemName,
                      price: price,
                      category: category,
                  },
              });
          }
      }

      res.json({ message: 'Itens adicionados com sucesso!' });
  } catch (error) {
      console.error('Erro ao adicionar itens do menu:', error);
      res.status(500).json({ error: 'Erro ao adicionar itens do menu' });
  }
};

const atualizarItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, category } = req.body;

    try {
        const itemExistente = await prisma.menu.findUnique({
            where: { id: parseInt(id) },
        });

        if (!itemExistente) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        const updatedItem = await prisma.menu.update({
            where: { id: parseInt(id) },
            data: { name, price, category },
        });
        res.json(updatedItem);
    } catch (error) {
        console.error('Erro ao atualizar o item do menu:', error);
        res.status(500).json({ error: 'Erro ao atualizar o item do menu' });
    }
};

const deletarItem = async (req, res) => {
    const { id } = req.params;

    try {
        const itemExistente = await prisma.menu.findUnique({
            where: { id: parseInt(id) },
        });

        if (!itemExistente) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        await prisma.menu.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Item removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover o item do menu:', error);
        res.status(500).json({ error: 'Erro ao remover o item do menu' });
    }
};

module.exports = { getMenu, adicionarItem, atualizarItem, deletarItem };