const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const database = require('./sqlConnection');
const port = require("./config");

const getData = () => {
    // This query will be used to select columns
    let query = 'SELECT * FROM Ropa';

    database.query(query, (err, rows) => {
        if (err) throw err;

        console.log(rows);
        return rows;
    });


}

var loadedPage = 0;

var data = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('view engine', 'ejs')

app.get("/", (req, res,) => {

    // This query will be used to select columns
    let query = 'SELECT * FROM Ropa';

    database.query(query, (err, rows) => {
        if (err) throw err;
        data = []
        Object.keys(rows).forEach(function (key) {
            var row = rows[key];
            console.log(row.nombre)
            data.push({
                id: row.id,
                nombre: row.nombre,
                descripcion: row.Descripcion,
                precio: row.Precio
            })
        });
    });

    

    res.render("index.ejs", {
        data: data
    })
})

var rep = 0;

app.listen(port.PORT, () => {
    console.log("servidor iniciado");
    data = [];
    // This query will be used to select columns
    let query = 'SELECT * FROM Ropa';

    database.query(query, (err, rows) => {
        if (err) throw err;

        Object.keys(rows).forEach(function (key) {
            var row = rows[key];
            console.log(row.nombre)
            data.push({
                id: row.id,
                nombre: row.nombre,
                descripcion: row.Descripcion,
                precio: row.Precio
            })
        });
    });

});

app.post("/formdata", (req, res) => {
    //res.send(`Ropa insertada:${req.body.Nombre} ${req.body.Descripcion} ${req.body.Precio}.`);

    let query = `INSERT INTO Ropa 
        (nombre, Descripcion, Precio) VALUES (?, ?, ?);`;

    // Value to be inserted
    let nombre = req.body.Nombre;
    let descripcion = req.body.Descripcion;
    let precio = req.body.Precio;

    database.query(query, [nombre,
        descripcion, precio], (err, rows) => {
            if (err) throw err;
            console.log("Row inserted with id = "
                + rows.insertId);
        });

    //data = [];

    // This query will be used to select columns
    let query2 = 'SELECT * FROM Ropa';

    database.query(query2, (err, rows) => {
        if (err) throw err;
        data = []
        Object.keys(rows).forEach(function (key) {
            var row = rows[key];
            console.log(row.nombre)
            data.push({
                id: row.id,
                nombre: row.nombre,
                descripcion: row.Descripcion,
                precio: row.Precio
            })
        });
        console.log(data);
        res.render("index.ejs", {
            data: data
        });
    });
});



app.get("/delete/:id", (req, res) => {
    var id = req.params.id;

    console.log("el id de la camisa es" + id);

    let query = `DELETE FROM Ropa WHERE id = ?;`;

    if (!(isNaN(id))) {
        database.query(query, [id], function (err, data) {
            if (err) throw err;
            console.log(data.affectedRows + " record(s) updated");
            
        });
    }
    // This query will be used to select columns
    let query2 = 'SELECT * FROM Ropa';
    
    database.query(query2, (err, rows) => {
        if (err) throw err;
        data = []
        Object.keys(rows).forEach(function (key) {
            var row = rows[key];
            console.log(row.nombre)
            data.push({
                id: row.id,
                nombre: row.nombre,
                descripcion: row.Descripcion,
                precio: row.Precio
            })
        });
        console.log(data);

        res.render("index.ejs", {
            data: data
        });
    });
    
    
});



app.post("/edit", (req, res) => {
    let query = `UPDATE Ropa SET nombre = ?, Descripcion = ?, Precio = ?
        WHERE id = ?`;

    // Value to be inserted
    let id = req.body.ID;
    let nombre = req.body.Nombre;
    let descripcion = req.body.Descripcion;
    let precio = req.body.Precio;

    database.query(query, [nombre,
        descripcion, precio, id], (err, rows) => {
            if (err) throw err;
            console.log("Modificado con exito");
        });
    
    // This query will be used to select columns
    let query2 = 'SELECT * FROM Ropa';

    database.query(query2, (err, rows) => {
        if (err) throw err;
        data = []
        Object.keys(rows).forEach(function (key) {
            var row = rows[key];
            console.log(row.nombre)
            data.push({
                id: row.id,
                nombre: row.nombre,
                descripcion: row.Descripcion,
                precio: row.Precio
            })
        });
        console.log(data);
        res.render("index.ejs", {
            data: data
        });
    });
    
    
});