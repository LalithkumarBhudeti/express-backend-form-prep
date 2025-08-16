let express = require("express");
const { EnquiryInsert,enquirylist,enquirydelete,enquiryupdate} = require("../../Controllers/Web/UserEnquiryController");


let enquiryRoutes = express.Router();

enquiryRoutes.post("/enquiry-insert",EnquiryInsert );

enquiryRoutes.get("/enquiry-list", enquirylist);

enquiryRoutes.delete("/enquiry-delete/:id",enquirydelete);

enquiryRoutes.put("/enquiry-update/:id",enquiryupdate);


module.exports = enquiryRoutes;