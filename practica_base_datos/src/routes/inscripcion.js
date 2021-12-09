const { Console } = require("console");
const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();
const db = require("../db/db");

function registrar(nombre, apellido, edad, fechaNacimiento, fechaInscripcion, costo, callback) {

   let query = `INSERT INTO examen (nombre, apellido, edad, nacimiento, inscripcion, costo) values ("${nombre}", "${apellido}", "${edad}", "${fechaNacimiento}", "${fechaInscripcion}", "${costo}")`;
    db.query(query, function (error, results, fields) {
        callback(error, results, fields);
    });
}

router.post("/", function (req, res) {

    const { nombre, apellido, edad, nacimiento, inscripcion, costo } = req.body;

    const dateNacimiento = new Date(nacimiento);
    const dateInscripcion = new Date(inscripcion);
    const now = new Date();
    const costoProporcional = (now.getFullYear() - dateInscripcion.getFullYear()) * 100;

    if (edad < 18) {
        console.log("errorEdad");
        res.render("error.html");
        return;
    }
    if (nombre.lenght < 4 || apellido.lenght < 4) {
        console.log("errorNombre");
        res.render("error.html");
        return;
    }
    if (dateInscripcion < dateNacimiento) {
        console.log("errorNacimiento");
        res.render("error.html");
        return;
    }
    if (now.getFullYear() - edad != dateNacimiento.getFullYear()) {
        console.log("errorEdad");
        res.render("error.html");
        return;
    }
    if (costoProporcional != costo) {
        console.log("errorCosto");
        console.log(costoProporcional);
        console.log(costo);
        res.render("error.html");
        return;
    }

    registrar(nombre, apellido, edad, nacimiento, inscripcion, costo, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.render("error.html");
            return;
        }

        res.redirect("/");

    });
});




module.exports = router;
