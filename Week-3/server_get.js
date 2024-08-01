const cors= require("cors");
const express= require("express");
const app= express();
const users = []

const isEmailUnique = (users, email) =>{
    const emailExists = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    return !emailExists;
};

app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:3040' }));

app.post("/signup", (req,res)=>{
    console.log("Received sign-up request:", req.body);
    const { first_name, last_name, email, password } = req.body;
    if (!isEmailUnique(users, email)) {
        return res.status(400).send({message:"Email already exists."});
    }
    users.push({first_name, last_name, email, password});
    return res.status(201).send({message:"Sign Up Successful"});
});

const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port "+port);
}) 