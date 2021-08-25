const express =  require("express")
const app = express();

app.use(express.json());


app.use(require('./routes'));


app.listen(process.env.Port || 3000);
