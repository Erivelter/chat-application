const { Sequelize } = require('sequelize');
require('dotenv').config();  // Carrega as variáveis de ambiente do arquivo .env

const dbUrl = process.env.DATABASE_URL;

// Conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    logging: false,  
});

// Testando a conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o PostgreSQL bem-sucedida!');
        
        
        const Usuario = require('./models/Usuario');
        const Sala = require('./models/Salas');
        const Chat = require('./models/Chat');

        // Relacionamentos
        Usuario.hasMany(Chat, { foreignKey: 'usuario_id' });
        Chat.belongsTo(Usuario, { foreignKey: 'usuario_id' });

        Sala.hasMany(Chat, { foreignKey: 'sala_id' });
        Chat.belongsTo(Sala, { foreignKey: 'sala_id' });

        // Sincronizar as tabelas
        sequelize.sync({ force: false })  
            .then(() => {
                console.log('Tabelas sincronizadas com sucesso!');
            })
            .catch(err => {
                console.error('Erro ao sincronizar o banco de dados:', err);
            });
    })
    .catch(err => {
        console.error('Erro ao conectar no PostgreSQL:', err);
    });


module.exports = sequelize;
