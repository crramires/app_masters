const routes = require('express').Router();
const axios = require("axios");


//Array criado para alocar os dados da api sem precisar fazer consultas na api
const dadosTodos = [];

const url = "https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json";


//Função criada para acessar a api e trazer os dados para dentro do array criado
async function request() {
  await axios.get(url).then((res) => dadosTodos.push(res.data.applist.apps));
}
request();


//Requisição que lista todos os dados com appid e name
routes.get("/", (req, res) => {
  try {
    res.status(200).send(dadosTodos[0]);
  } catch (e) {
    res.status(400).json({ ok: 0, msg: `Erro na consulta: ${e.message}` });
  }
});

//Requisição que lista appid e name apenas do id passado como parametro
routes.get("/:id", (req, res) => {
  const id = req.params.id;

  var count = 0;

  for( var i = 0; i < dadosTodos[0].length; i++) {
    if( id == dadosTodos[0][i].appid) {
      res.status(200).send(dadosTodos[0][i])
      return count++;
    } if (count != 0) {
      console.log(i)
      res.status(200).send({msg: `Não existe jogo com esse id.`})
    }
  }
})


/*routes.get('/', (req, res) => {
    return res.json({Hello: "World"});
}); */


module.exports = routes