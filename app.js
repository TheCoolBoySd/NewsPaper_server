const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public")); //it specify the static folder

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {

      const firstName = req.body.fname;
      const lastName = req.body.lname;
      const email = req.body.email;
      console.log(firstName, lastName, email);


      const data = {
        members: [
          {
            email_address :email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName
            }
          }
          ]
        };
        const jsonData = JSON.stringify(data);
        const url = "https://us21.api.mailchimp.com/3.0/lists/c60336fd22";

        const options = {
          method: "POST",
          auth: "Shubhro:40385928966a596b915d9f4d7bf63e56-us21"
        }
        const request =https.request(url, options, function(response){


          //checking trhe status urlencoded

          if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
          }
          else{

            res.sendFile(__dirname+"/faliure.html");
          }
          response.on("data",function(data){
            console.log(JSON.parse(data));
          })
        })

       request.write(jsonData);
        request.end();
      });

// failure rout  rdirecting to the original route
    app.post("/faliure",function(req,res){
        res.redirect("/");
    });




    app.listen(process.env.PORT || 3000, function() {
      console.log("We are on port 3000");
    })
    // 40385928966a596b915d9f4d7bf63e56-us21 Api id
    // c60336fd22 List id
