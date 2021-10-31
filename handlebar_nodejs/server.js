const express=require("express");
const PORT=3030;
const app=express();
const handlebars=require("express-handlebars");

app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'hbs');

app.engine("hbs",handlebars({
    layoutsDir:`${__dirname}/views/layouts`,
    extname:"hbs",
    defaultLayout:"index",
    partialsDir:`${__dirname}/views/partials`
}))

app.get("/",(req,res)=>{
    res.render("signin");
    
});
app.post("/",(req,res)=>{
    res.end(`
    <div>
    <h1>${req.body.email}</h1>
    <h1>${req.body.password}</h1>
    </div>`)
   
});
app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.post("/signup",(req,res)=>{
    res.end(`
    <div>
    <h1>${req.body.email}</h1>
    <h1>${req.body.name}</h1>
    <h1>${req.body.password}</h1>
    <h1>${req.body.confirmpassword}</h1>
    </div>`)
});


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})