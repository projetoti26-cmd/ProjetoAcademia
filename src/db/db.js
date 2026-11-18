import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'academia',
    port: 3306
});

export default db;