const express = require("express");
const path = require("path");
const app = express();

const HTTP_PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use((req,res,next)=>{
    console.log("I'm hit every time!");
    req.myMessage = "Hello";
    next();
    //res.send("I'm hit every time");
});

app.get("/", (req,res)=>{
    res.cookie("msg", "Hello from WEB700");
    res.send("Hello World!");
    console.log(req.myMessage);
});

app.get("/project/:id", (req,res)=>{
    res.send("Viewing Project: " + req.params.id);
});

app.get("/headers", (req,res)=>{
    console.log(req.headers);
    res.send(req.get("user-agent"));
});

app.get("/documentation", (req,res)=>{
    res.download(path.join(__dirname, "/docs/dummy.pdf"));
});

app.get("/projects", (req,res)=>{
    if(req.query.someProperty){
        res.send("Viewing all Projects with SomeProperty = " + req.query.someProperty);
    }else if(req.query.someProperty2){
        res.send("Viewing all Projects with SomeProperty2 = " + req.query.someProperty2);
    }else{
        res.send("Viewing all Projects");    
    }
});

app.post("/processForm", (req,res)=>{
    res.send("I'm a post request");
});

//app.put() // or app.delete()

app.all("/all", (req,res)=>{
    res.send("Responds to All HTTP Verbs")
});

app.get("/jsonData", (req,res)=>{
    let someData = [{message: "Hello from our server"}, {message: "Another Message"}];
    let someDataJSON = JSON.stringify(someData);
    res.json(someDataJSON);
});

app.get("/toGoogle", (req,res)=>{
    res.redirect("http://www.google.ca")
});

app.get("/throwError", (req,res)=>{
    //throw new Error("Uh oh - there was an error");
    const PI = 3.14;
    PI = 5;
    res.send("Changed PI");
});

//app.get("/cat", (req,res)=>{
//    res.sendFile(path.join(__dirname, "/public/images/cat.jpeg"));
//});

app.use((err,req,res,next)=>{
    res.status(500).send(err.message);
});


app.use((req,res,next)=>{
    res.status(404).send("These aren't the droids you're looking for");
});


app.listen(HTTP_PORT, ()=>{
    //console.log("server listening on: " + HTTP_PORT);
    console.log(`server listening on: ${HTTP_PORT}`);
});