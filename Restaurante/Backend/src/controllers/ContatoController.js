const prisma = require('../prismaClient');

const GetMensagens = async (req, res) => {
    try {
        const messages = await prisma.contactMessage.findMany();
        res.json(messages);
    } catch (error) {
        res.json({ error: 'Erro ao buscar as Mensagens' });
    }
};


const EnviarMensagem = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                message,
            },
        });

        res.json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        res.json({ error: 'Erro ao enviar mensagem de contato.' });
    }
};

module.exports = { EnviarMensagem, GetMensagens };
