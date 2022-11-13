ORM:
---

Object Relational Mapping:
Nos permitirá trabajar con los típicos objetos de JS (que ya conocemos), y se comunicará con la base de datos.

El ORM que utilizaremos es Sequelize.

La mayoría de los métodos de Sequelize son asíncronos, por lo que nos devolverán una promesa.

Server ---- Sequelize ----> DataBase. 

INSTALLING:

npm install sequelize
npm install pg pg-hstore #Postgres

Debemos conectar nuestro servidor a nuestra base de datos.

CONECTING:
en un archivo "db.js":

```javascript
const { Sequelize, DataTypes } = require("sequelize");
const user = "postgres";
const pass = "admin";
const dbname = "lecture";

const database = new Sequelize(
    `postgres://${user}:${pass}@example.com:5432/${dbname}`, 
    {logging: false}
);

    module.exports = database;
```
----
Documentación: 

https://sequelize.org/docs/v6/getting-started/

en index.js:
```javascript
const server = require("./src/app");
const {database} = require("./src/db");

server.listen("3000", async () => {
    await database.sync();
});
```
----
database.define() ---> Método que nos permite crear un modelo para la instancia de sequelize, quien se va encargar de interactuar con la base de datos.

en "db.js":

```javascript
database.define("User", {
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: dataTypes.STRING,
        allowNull: false,
    },
    lastname:{
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});
```
----

Existen 3 formas de llamar a database.sync():

```javascript
const server = require("./src/app");
const {database} = require("./src/db");

server.listen("3000", async () => {
    await database.sync();
    await database.sync({force:true}); // Elimina todas las tablas y las vuelve a crear definidas en el modelo.
    await database.sync({alter:true}); // Modifica las tablas ya existentes en base a como esten definidas en el modelo.
});
```
----

Al definir varios modelos, y para obtener un mejor flujo de trabajo debemos modularizar. 

Dentro de mi carpeta src creo otra carpeta llamada "models", en donde crearé todos los modelos (e.g: "User.js");

Ahora, en User.js:

```javascript
const { DataTypes } = require("sequelize");
    const User = (database) =>{
    database.define("User", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        last_name:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    });
}

module.exports = User;
```
----

En "db.js":
```javascript
const User = require("./models/User");

User(database);

module.exports = { database, ...database.models }; 
```
----

Ahora queremos que nuestro servidor, nos cree un nuevo usuario en la base de datos. En app.js:

```javascript
const express = require("express");
const { User } = require("./db");
const server = express();
server.use(express.json());
server.use(morgan("dev"));

server.post("/users", async (req, res) => {
    try {
    const {name, last_name} = req.body;
    const newUser = await User.create({name, last_name});
    res.status(200).send(newUser);
    } catch (error){
        res.status(400).send(error.message);
    }
});

server.delete("/users", async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findByPk(id);
        await user.destroy();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

server.get("/users", async (req, res) => {
    try {
        const { name } = req.query;
        if (!query){
            const users = await User.findAll();
            return res.status(200).send(users);
        } else {
            const users = await User.findAll({
                where: {
                    name,
                }
            })
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = server;
```
---

FindOrCreate: Busca un registro según las condiciones de busqueda, si no encuentra procede a crear. Returna un boolean que nos dice si
la instancia fue creada o fue hallada. Returna la instancia encontrada/creada.

```javascript
const [instance, created] = await Model.findOrCreate({
    where: {name: 'joaco'},
    defaults: {
        gender: 'Masc',
        race: 'mestizo',
    }
});
```
---

Al momento de relacionar dos modelos, para poder crear tablas intermedias:

```javascript
User.hasMany(Post);
Post.belongTo(User);
```
---
relación 1:N;

En una relación N:M:
```javascript
User.belongsToMany(Page, {through: {"UserPage"}});
page.belongsToMany(User, {through: {"UserPage"}});
```
---

