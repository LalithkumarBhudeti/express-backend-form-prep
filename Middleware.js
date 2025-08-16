let MYToken = 12345

let checkToken = (req,res,next)=>{

    if(req.query.token == "" || req.query.token == undefined){

        return res.send({
            status : 1,
            msg : "enter thr token babu"
        })
    }
    next();
}

module.exports={checkToken}