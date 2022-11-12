import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    trailerLink: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    tillDate: {
        type: Date
    }
}, { timestamps: true })

const Movie = mongoose.model("movie", movieSchema)

export default Movie;