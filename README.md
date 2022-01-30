# Sequelize-Token

-Creamos una carpeta desde el finder llamada Backend_Repaso
-Abrimos el Visual code, abrir la carpeta que hemos creado.

-Abrimos la terminal e inicializamos:
	npm init -y  // crea el paquete json
	npm install express sequelize mysql2
	sequelize init // me crea las carpetas config, migration, model y seeder
-Hacemos el archivo .gitignore
-Iniciamos npm i -D nodemon
-Creamos el index.js:
	const express = require(‘express’);
const app = express();
const PORT = 3000

	app.use(express.json())
	//ojo; mientras no hay rutas no funciona
app.use(‘/users’, require(‘./routes/users’));  
// importamos nuestras rutas, para cada tabla tendremos una ruta

app.listen(PORT, () => console.log(‘servidor levantado en el puerto’ + PORT))

-En el package.json creamos el script dev “dev” : nodemon index.js
-Levantamos el servidor npm run dev


-Creamos el modelo:
	sequelize model:generate –name –attributes name:string,email:string
-Creamos una base de datos:
	sequelize db:créate
-Levantamos la tabla:
	sequelize db: migrate 

-Creamos el controlador: aquí creamos las variables con los módulos de Node.js y ponemos los métodos que utilizaremos (post, get, delete…)
-Creamos la ruta: Nos indica la ruta de nuestros módulos (créate, getAll, logout)
La carpeta models la crea con las migraciones, esta contiene los campos de cada tabla donde los podemos modificar y validar. Ojo el user se valida en el constructor. También se establecen las relaciones de tablas.	

En la relación en la class User
ponemos el modelo actual, de muchos a muchos (modelo que le afecta, { thoungh: modelo relación, (onDelete:’cascade’})
después declaramos los atributos con sus validaciones.
