var mysql = require('mysql2');

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "NIKEcarbide200r",
        database: "Ropa"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO Ropa (nombre, precio, cantidad) VALUES ('pantalon', 1000, 2)";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });

function display() {
    

    alert("El producto ha sido insertado")
}