require("dotenv").config();
const express = require('express')
const connectToDb = require("./database/db")
const path = require("path");
const Musica = require("./model/Musicas")

const app = express();
const port = process.env.PORT || 3000;

//O EJS permite utilizar JS dentro do HTML
app.set("view engine", "ejs")

//Arquivos estáticos ficam na pasta indicada
app.use(express.static(path.join(__dirname, "public")));

//Intersecção de dados de formulário html 
app.use(express.urlencoded());


connectToDb();

//Busca um array de informações no banco de dados e traz para a variavel
app.get('/', async (req, res) => {
    const playlist = await Musica.find();
    console.log(playlist);
    res.render("index", { playlist });
});

app.get("/admin", (req, res) => {
    res.render("admin");
});

app.post("/create", async (req, res) => {
    const music = req.body;
    await Musica.create(music);
    res.redirect("/")
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`)
);