// let enquiryModel = require("./App/Model/Enquiry");

const enquiryModel = require("../../Model/Enquiry");


let EnquiryInsert = (req, res) => {
  let { sName, sEmail, sPhone, sMessage } = req.body;
  console.log(sName, sEmail, sPhone, sMessage);
  let enquiry = new enquiryModel({
    name: sName,
    email: sEmail,
    phone: sPhone,
    message: sMessage,
  });
  enquiry
    .save()
    .then(() => {
      res.send({
        status: 1,
        message: "data saved"
      });
    })
    .catch((err) => {
      res.send({
        status: 0,
        message: "data failed to save",
        error : err
      });
    });
}


let enquirylist = async(req, res) => {

    let enquiryList = await enquiryModel.find();


    res.status(200).json({
        status:1,
        message:"enquiry List",
        data:enquiryList 
    })

}

let enquirydelete = async(req,res)=>{
    let enquiryId = req.params.id;

    let deletedEnquiy = await enquiryModel.deleteOne({_id : enquiryId});
    res.status(200).json({
        status:1,
        message:"enquiry List deleted sucessfully ",
        id:enquiryId,
        deletedresponse : deletedEnquiy
    })

}

let enquiryupdate = async(req,res)=>{
    let enquiryId = req.params.id;

    let { sName, sEmail, sPhone, sMessage } = req.body;
    let updateobj = {
      name: sName,
      email: sEmail,
      phone: sPhone,
      message: sMessage,
    };

    let updateEnquiy = await enquiryModel.updateOne({_id : enquiryId},updateobj);
    res.status(200).json({
        status:1,
        message:"enquiry List updated sucessfully ",
        id:enquiryId,
        updatedresponse : updateEnquiy
    })
}


module.exports = {EnquiryInsert,enquirylist,enquirydelete,enquiryupdate}