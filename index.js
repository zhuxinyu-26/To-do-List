import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let list = [];
let workList = [];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let today = new Date();
const dayToday = weekday[today.getDay()];
const dateToday = today.getDate();
const monthToday = month[today.getMonth()];
const currentYear = today.getFullYear();
// custom function

// Today to do
app.get("/", (req, res) => {
    res.render("index.ejs", { toDoList: list, dateToday: dateToday, dayToday: dayToday, monthToday: monthToday,currentYear:currentYear })

});
app.post("/submit", (req, res) => {
    const taskToday = req.body["taskToday"];
    list.push({ description: taskToday, completed: false });
    res.render("index.ejs", { newTaskToday: taskToday, toDoList: list, dateToday, dayToday, monthToday, currentYear });
});


// Work to do
app.get("/work", (req, res) => {

    res.render("work.ejs", { toWorkList: workList , dateToday: dateToday, dayToday: dayToday, monthToday: monthToday,currentYear:currentYear });
});

app.post("/submitwork", (req, res) => {
    const taskWork = req.body["taskWork"];
    workList.push(taskWork);
    res.render("work.ejs", { newWorkToday: taskWork, toWorkList: workList ,currentYear:currentYear });
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

