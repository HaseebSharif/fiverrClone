import User from "../models/user.model.js"



export const deleteUser =  async(req,res,) =>{
    try{
        const user =await User.findById(req.params.id);
        if(req.userId !== user._id.toString()){
            return res.status(403).send("You can delete only your acount")
        }

        await User.findByIdAndDelete(req.params.id)
        return res.status(200).send("User Deleted Successfully")



    }catch(err){
        res.send(err)
    }
    }

    export const getUser =  async(req,res,) =>{
        try{
            const user =await User.findById(req.params.id);
            if(!user)return res.send(404).send("User not found")
    else{

            return res.status(200).json(user)
    }
    
    
    
        }catch(err){
            res.send(err)
        }
        }