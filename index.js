let express = require("express");
const { checkToken } = require("./Middleware");
const { DBConnection } = require("./DBConnection");
const { ObjectId } = require("mongodb");
require("dotenv").config();

let app = express();
console.log(process.env.MYToken)
app.use(express.json());

app.get("/student-read",async(req,res)=>{
    let myDB = await DBConnection();
    let studentCollection = myDB.collection("students");
    let data =await studentCollection.find().toArray();
    let resObj = {
        status : 1,
        msg : "Student list",
        data
    }


    res.send(resObj)

})

app.post("/student-insert", async (req, res) => {
    try {
        let { sName, sEmail } = req.body;

        let myDB = await DBConnection();
        let studentCollection = myDB.collection("students");

        // Check if email already exists
        let checkEmail = await studentCollection.findOne({ sEmail });
        if (checkEmail) {
            return res.send({ status: 0, msg: "Email Id Already Exists....." });
        }

        let obj = { sName, sEmail };
        let insertResponse = await studentCollection.insertOne(obj);

        let resObj = {
            status: 1,
            msg: "Data inserted successfully",
            insertResponse
        };

        res.send(resObj);

    } catch (error) {
        console.error("Error inserting student:", error);
        res.status(500).send({ status: 0, msg: "Internal Server Error" });
    }
});


app.delete("/student-delete/:id",async (req,res) => {
    let {id} = req.params;
    console.log(id);

    let myDB = await DBConnection();
    let studentCollection = myDB.collection("students");
    let delResponse = await studentCollection.deleteOne({_id: new ObjectId(id)})

    let resObj = {
        status : 1,
        msg : "Data delete",
        delResponse
    }


    res.send(resObj)
})



app.put("/student-update/:id", async (req, res) => {
  let { id } = req.params;
  let { sName, sEmail } = req.body;

  console.log("Updating student ID:", id, "with data:", sName, sEmail);

  let obj = {};

  if (sName != "" && sName != undefined && sName != null) {
    obj["sName"] = sName;
  }

  if (sEmail != "" && sEmail != undefined && sEmail != null) {
    obj["sEmail"] = sEmail;
  }

  console.log(obj);
  let myDB = await DBConnection();
  let studentCollection = myDB.collection("students");

  let updateResponse = await studentCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: obj }
  );


  let resObj = {
    status: 1,
    msg: "Data updated",
    updateResponse,
  };
  res.send(resObj);
});

// app.get("/", (req, res) => {
//     res.send({
//         status: 1,
//         msg: "Home Page API"
//     });
// });

// app.get("/news",checkToken, (req,res) => {
//     res.send({
//         staus : 1,
//         msg : "this is news page"
//     })
// });

// app.post("/login", (req,res) => {
//     console.log(req.body)

//     res.send({
//         staus : 1,
//         msg : "this is login page",
//         data: req.body
//     })
// });



app.listen(process.env.PORT || 5000 );
 