/** packages
 * instalar npm i express config --save
*/

const express = require("express");
const config = require("config")
const bodyParser = require("body-parser")

/**App configuration */

const app = express();
const port = config.get("server-port")
const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded(
    {
        extended: true
    }
);

app.use(jsonParser);
app.use(urlEncodedParser);

const ipFn = require("./middleware/getlpAddress");
app.use("*", ipFn)

/**Methods */
app.get("/",(req, res, next) =>{
    res.send("welcom to academic rest api from app");
})

//user  routes loading
const userRoutes = require("./routes/user.routes");
userRoutes(app);

//Token middleware
tkFn = require("./middleware/verifyToquen")
app.use(tkFn);

//Student routes loading
const studentRoutes = require("./routes/student.routes");
studentRoutes(app);

//teacher routes loading
const teacherRoutes = require("./routes/teacher.routes");
teacherRoutes(app);

//period routes loading
const periodRoutes = require("./routes/period.routes");
periodRoutes(app);

//course routes loading
const courseRoutes = require("./routes/course.routes");
courseRoutes(app);


app.listen(port, () =>{
    console.log("Server is running...")
});