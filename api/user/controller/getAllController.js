
const getAll=async (req,res)=>{
    try{
        console.log("get all controller started");


    }catch(err){
        res.json({ status: 500, message: "Something went wrong" });
        console.log(err);
    }
}

module.exports={getAll};
