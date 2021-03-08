require("dotenv").config();
const app = require("./expressApp");

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express server started on http://localhost:${port}`);
});
