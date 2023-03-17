const express = require("express");
const bodyParser = require("body-parser");
const day = require(__dirname + "/date.js");
const app = express();
let items =["Buy Food","Cook Food","Eat Food"];
let workitems = [];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    res.render("list",{
        listTitle :day(),
        newlistitems : items
    });
});
app.post("/",(req,res)=>{
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workitems.push(item);
        res.redirect("/work")
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});
app.get("/work",(req,res)=>{
    res.render("list",{
        listTitle:"Work List",
        newlistitems : workitems
    })
});

app.listen(3000,()=>{
    console.log("started on port 3000");
});