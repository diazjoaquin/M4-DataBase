SQL:
-----------------
Lenguaje que hace consultas a la base de datos.
Tiene expresiones y statements, al igual que JS.
Además, está compuesto por clausulas.

comandos en PostgresSQL:
-----------------
\l -- nos mostrará todas las base de datos en nuestro servidor. 

\c "dataBaseName" -- nos conectará a la base de datos. 

\dt -- nos mostrará las tablas que tenemos creadas dentro de nuestra base de datos.

Comandos de SQL:
-----------------
CREATE DATABASE "DataBaseName"; (SQL) para crear una nueva base de datos. Se cierra con ; sino no se ejecuta.

CREATE DATABASE comidas: nos crea la base de datos llamada "comidas". 

DROP DATABASE "DataBaseName" (SQL) para borrar una base de datos ya existente. 

CREATE TABLE "TableName" (SQL) para crear una nueva tabla:

```SQL
CREATE TABLE NewTable

column_name1 data_type(size),
column_name2 data_type(size),
column_name3 data_type(size),
...
```

tipos de datos en postgresSQL: https://www.postgresql.org/docs/current/datatype.html

Además, luego de la "prop" size, al crear una table, también
podemos definir las constraints.

e.g:

```SQL
CREATE TABLE Ciudades

id serial PRIMARY KEY,
nombre varchar(255) UNIQUE,
```
e.g:  
la constraint "UNIQUE" nos especifica que la data no puede repetirse.

SELECT * FROM Ciudades (SQL) nos imprimirá en pantalla la table ciudades. '*' especifica todo.

SELECT nombre FROM personas;

// Para insertar filas en una table:

INSERT INTO table_name (column_name1, column_nam2, column_name3)   
VALUES (value1, value2, value3); --> Los values van entre comillas simples. 

e.g:

INSERT INTO ciudades (nombre)
VALUES ('Buenos Aires'); 

INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Joaco', 'Diaz', 1);

al crear el VALUE Buenos Aires se crea un ID único dentro de la table ciudades. 
Por eso cuando hacemos referencia a ciudad en la table personas, lo hacemos mediante el ID, y no mediante el nombre de la ciudad. 

ORDER BY "column_name" nos ordenará la columna en cierto orden. Por ejemplo: ORDER BY nombre; nos ordenará los nombres en orden alfabético.

SELECT * FROM personas
WHERE nombre = 'joaco';

nos traerá de la table personas, todas las filas cuya columna nombre coincidan con 'Joaco'.

DELETE FROM personas
WHERE nombre = 'joaco';

nos borrará de la table personas, todas las filas cuya columna nombre coincidan con 'Joaco'; 

SUBQUERYS:
-----------------


```SQL
SELECT
    film_id,
    title,
    rental_rate
FROM
    film
WHERE
    rental_rate > (
        SELECT
            AVG (rental_rate)
        FROM 
            film
    );
```

Trae de la table film, las películas cuyo rental_rate sea mayor al rental_rate promedio de la table film. 

EJOIN:
-----------------
nos permite unir datos de diferentes tablass según una condición.

```SQL
SELECT * FROM personas
JOIN ciudades
ON ciudades.id = personas.ciudad;
```

donde el id de la ciudad coincida con la ciudad de la persona (que también es un número), ambas tablas se unirán. 


```SQL
SELECT ciudades.nombre, personas.nombre
FROM personas JOIN ciudades
ON ciudades.id = personas.ciudad;
```
Aquí, haremos un join de la tabla ciudades con la tabla personas, y traeremos de ese JOIN las columnas nombre de la tabla ciudades y de la tabla personas.

si quiero cambiarle el nombre a una columna:
```SQL
SELECT ciudades.nombre AS ciudades;
```









