import mongoose from "mongoose";

const upcomingMovieSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    trailerLink:{
        type:String,
        required:true
    }
},{timestamps:true})

const UpcomingMovies = mongoose.model("upcomingMovies",upcomingMovieSchema)

export default UpcomingMovies;