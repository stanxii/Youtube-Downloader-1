const express = require('express');
const api = require('./routes/Api');

let app = express();
const port = process.env.PORT || 5000;

app.use('/api', api);


if(process.env.NODE_ENV === "production"){
	app.use(express.static("client/build"));

	app.get('*', (req,res) => {
		res.sendFile(path.resolve(__dirname , 'client','build','index.html'));
	})
}

app.listen(port, () => {
	console.log("Server is going on.");
});