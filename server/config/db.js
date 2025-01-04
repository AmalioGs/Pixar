import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, //Espera que alguien se conecte
  connectionLimit: 10, //Número máximo de conexiones activas
  queueLimit: 0, //Para que no haya cola
  dateStrings: true, //Evita problemas de zonas horarias
});

export const executeQuery = async (sql, values = []) => { //Si no le pasamos nada nos devuelve algo vacío
  let connection;
  try {
    //Obtiene conexión del pool
    connection = await dbPool.getConnection();

    //Ejecuta la consulta
    const [result] = await connection.query(sql, values);
    return result;

  } catch (error) {
    console.log(error);
    throw error;

  } finally {
    //Siempre entra en finally pase lo que pase o después del try o del catch.
    //Libera la conexión
    if (connection) {
      connection.release(); //Con release libera la conexión.
    }
  }
};

const testDbConnection = async () => {
  try {
    const result = await executeQuery("SELECT * FROM user") //No pedimos values porque nos devuelve algo vacío de manera predefinida, pues así lo hemos puesto antes.
    console.log("ESTO SON LOS RESULTADOS DEL TEST: ", result);

  } catch (error) {
    console.log(error);

  }
};

// testDbConnection();
