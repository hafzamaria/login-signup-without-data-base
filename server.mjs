import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid'

const app = express()
app.use(express.json());///express ka code h//
app.use((cors));

// console.log( nanoid () );////terminal pe id dega port start ktne pe///

const port = process.env.PORT || 3000;

let userBase= [];  //data base ka wo hissa jha sare users save hote h unko userBase khte h//
 
app.post("/signup",(req ,res)=>{

   let body= req.body;

    if(!body.firstName || !body.lastName || !body.name || !body.email ||!body.passward)
    {
/// this(400) status shows client error///
        res.status(400).send(
            `required fields missing,request example:
        {
            "firstName":"Jhon",
            "lastName":"Doe",
            "email":"abc@abc.com",
            "passward":"12345"
        }`
        );
        return;
    }
///////////////////////validation end nw making new user///
//////for making id we use(NanoID)////
    let newUser = {
         userId:   nanoid(),
        firstName: body.firstName,
        lastName:  body.lastName,
         email:     body.email,
        passward:  body.passward,

    }

    userBase.push(newUser);

    res.status(201).send("user is created");

 });
 ////////login server///
   let  isfound = false;  //https://stackoverflow.com/a/17402180(what is flag variable)

     for (let i = 0; i < userBase.length; i++){

        if(userBase[i].email === body.email){///corect paasward//

           isfound =true;

           if(userBase[i].passward === body.passward){

                res.statu(200).send({
                firstName:userBase[i].firstName,
                lastName:userBase[i].lastName,
                email:userBase[i].email,
                massage:"login successful",
                token:"some unique token"

            })
            return;

        }else{//passward inorrect//
            res.status(401).send({
              massage:"incorrect passward"  
            })
            return;
        }

     }
    }
    if (!isfound){
        res.status(404).send({
            massage:"user not found",
        })
        return;
    }






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})