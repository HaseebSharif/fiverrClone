export const test = async(req,res,) =>{
    try{
    res.status(201).json("okay")
    }catch(err){
        res.send(err)
    }
    }