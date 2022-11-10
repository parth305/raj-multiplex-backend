import UpcomingMovies from "../../models/UpcomingMovies";

const addUpcomingMovie = async(req,res)=>{
    try{
    let reqObj = req.body;
    const upcomingMovie = await UpcomingMovies.create(reqObj);
        res.json({response:true,upcomingMovie:upcomingMovie,message:"Movie added to list successfully",status:res.statusCode})
    }
    catch(err){
        console.log("Error while adding upcoming movie",err);
        res.json({response:false,message:`Error Occured ${err}`,status:res.statusCode})
    }

}
const fetchAllUpcomingMovies = async(req,res)=>{
    try{
        const upcomingMovies =await UpcomingMovies.find();
        res.json(({response:true,message:"List Of Upcoming Movies :",status:res.statusCode,upcomingMovies:upcomingMovies}))
    }
    catch(err)
    {
        console.log("Error fetching all th movies: ",err)
        res.json({response:false,message:`Can not fetch movies due to : ${err}`,status:res.statusCode})
    }
}

const fetchUpcomingMovieById = async(req,res)=>{
    try{
        console.log(req.params.id)
        const upcomingMovie = await UpcomingMovies.findById(req.params.id)
        if(upcomingMovie)
        {
            res.json({response:true,message:"Requested Movie",upcomingMovie:upcomingMovie,status:res.statusCode});

        }
        else{
            res.json({response:false,message:"Could not find requested Movie",status:res.statusCode})
        }
    }
    catch(err)
    {
        console.log("Following error occured while fetching movi by id",err)
        res.json({response:false,status:res.statusCode,message:`Could not find movie due to : ${err}`})
    }
}

const updateUpcomingMovie = async(req,res)=>{
    try{
        const reqObj = req.body;
        const updatedUpcomingMovie = await UpcomingMovies.findByIdAndUpdate(req.params.id,reqObj,{runValidators:true})
        res.json({response:true,message:"Updated Upcoming Movies Successfully",updatedUpcomingMovie:updatedUpcomingMovie})

    }
    catch(err)
    {   console.log("Error in updation of movie",err)
        res.json({response:false,message:`Failed to update movie: ${err}`,status:res.statusCode})

    }

}

const deleteUpcomingMovie = async(req,res)=>{
    try{

        // const reqObj= req.body;
        const deletedUpcomingMovie = await UpcomingMovies.findByIdAndRemove(req.params.id)
        res.json({response:true,message:"Deleted Movie Successfully",status:res.statusCode,deletedUpcomingMovie:deletedUpcomingMovie})
    }
    catch(err)
    {
        console.log("Faild to delete due to: ",err)
        res.json({respomse:false,message:`Error Deleting movie : ${err}`})

    }
}

export default{
    addUpcomingMovie:addUpcomingMovie,
    fetchAllUpcomingMovies:fetchAllUpcomingMovies,
    fetchUpcomingMovieById:fetchUpcomingMovieById,
    updateUpcomingMovie:updateUpcomingMovie,
    deleteUpcomingMovie:deleteUpcomingMovie
}