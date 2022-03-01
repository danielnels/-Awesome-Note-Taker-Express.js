const express = require ("express");
const path = require("path");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const app = express();

let PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(webRoutes);
app.use('/api', apiRoutes);


app.get('*', (req, res) => {
    const htmlPath = path.join(__dirname,  "public", 'index.html');
    res.sendFile(htmlPath);
})

app.listen(PORT, () => {
    console.log(`Your APP is running on http://localhost:${PORT}`);
})




