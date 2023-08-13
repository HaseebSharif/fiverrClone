import Gig from "../models/gig.model.js"

export const createGig = async(req,res,) =>{
try{
    const userId = req.userId;
    const newGig = new Gig({
        ...req.body,
        userId: userId
    });
   const gig =  await newGig.save();
    
res.status(201).json(gig);
}catch(err){
    res.send(err)
}
}

//get all gigs
export const getGig = async(req,res,) =>{
    try{
       const gigs = await Gig.find();
        
    res.status(201).json(gigs);
    }catch(err){
        res.send(err)
    }
    }

    //get a single gig
    export const getSingle = async(req,res,) =>{
        try{
            const id = req.params.id
           const gig = await Gig.find({_id: id});
            
        res.status(201).json(gig);
        }catch(err){
            res.send(err)
        }
        }


        //update gig

        export const updateGig = async(req,res,) =>{
            try{
                const id = req.userId;
               const gig = await Gig.findOne({_id: id});
               const updatedGig = req.body;
               if(gig){
                    gig.set(updateGig);
                    const Ugig = await gig.save();
               }
                
            res.status(201).json(gig);
            }catch(err){
                res.send(err)
            }
            }
    
 // get gigs based on filter 


 export const getGigs = async (req, res, next) => {
    const q = req.query;
    const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.cat && { cat: q.cat }),
      ...((q.min || q.max) && {
        price: {
          ...(q.min && { $gt: q.min }),
          ...(q.max && { $lt: q.max }),
        },
      }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    console.log(q)
    try {
      const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
      res.status(200).send(gigs);
    } catch (err) {
      next(err);
    }
  };