import Movie from "../../../models/Movies";
import { RESPONSE_CODES } from "../../../services/constants";
import getCurrentDate from "../../../services/date";

const addCurrentMovie = async (req, res) => {
    try {
        let reqObj = req.body;
        if (!reqObj["tillDate"]) {
            reqObj["tillDate"] = reqObj["releaseDate"];
        }
        const currentMovie = await Movie.create(reqObj);
        res.status(RESPONSE_CODES.CREATED).json({ response: true, currentMovie: currentMovie, message: "Movie added to list successfully", status: RESPONSE_CODES.CREATED })
    }
    catch (err) {
        console.log("Error while adding current movie", err);
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, message: `Error Occured ${err}`, status: RESPONSE_CODES.BAD_REQUEST })
    }

}

const fetchAllCurrentMovies = async (req, res) => {
    try {
        const currentDate = getCurrentDate(new Date())
        const currentMovies = await Movie.find({ releaseDate: { $lte: currentDate }, tillDate: { $gte: currentDate } });
        res.status(RESPONSE_CODES.OK).json(({ response: true, message: "List Of current Movies :", status: RESPONSE_CODES.OK, currentMovies: currentMovies }))
    }
    catch (err) {
        console.log("Error fetching all the movies: ", err)
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ response: false, message: `Can not fetch movies due to : ${err}`, status: RESPONSE_CODES.INTERNAL_SERVER_ERROR })
    }
}


const fetchCurrentMovieById = async (req, res) => {
    try {
        const currentDate = getCurrentDate(new Date())
        const currentMovie = await Movie.findOne({ _id: req.params.id, releaseDate: { $lte: currentDate }, tillDate: { $gte: currentDate } })
        if (currentMovie) {
            res.status(RESPONSE_CODES.OK).json({ response: true, message: "Requested Movie", currentMovie: currentMovie, status: RESPONSE_CODES.OK });

        }
        else {
            res.status(RESPONSE_CODES.RESOURCE_NOT_FOUND).json({ response: false, message: "Could not find requested Movie", status: RESPONSE_CODES.RESOURCE_NOT_FOUND })
        }
    }
    catch (err) {
        console.log("Following error occured while fetching movi by id", err)
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, message: `Could not find movie due to : ${err}` })
    }
}

const updateCurrentMovie = async (req, res) => {
    try {
        const currentDate = getCurrentDate(new Date())
        const reqObj = req.body;
        const updatedCurrentMovie = await Movie.findOneAndUpdate({ _id: req.params.id, releaseDate: { $lte: currentDate }, tillDate: { $gte: currentDate } }, reqObj, { runValidators: true, new: true })
        if (updatedCurrentMovie)
            res.status(RESPONSE_CODES.UPDATED).json({ response: true, message: "Updated Current Movies Successfully", updatedCurrentMovie: updatedCurrentMovie, status: RESPONSE_CODES.UPDATED })
        else
            res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, message: `Movie not found`, status: RESPONSE_CODES.BAD_REQUEST })
    }
    catch (err) {
        console.log("Error in updation of movie", err)
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, message: `Failed to update movie: ${err}`, status: RESPONSE_CODES.BAD_REQUEST })

    }

}

const deleteCurrentMovie = async (req, res) => {
    try {
        const currentDate = getCurrentDate(new Date())
        const deletedCurrentMovie = await Movie.findOneAndRemove({ _id: req.params.id, releaseDate: { $lte: currentDate }, tillDate: { $gte: currentDate } })
        if (deletedCurrentMovie)
            res.status(RESPONSE_CODES.OK).json({ response: true, message: "Deleted Movie Successfully", status: RESPONSE_CODES.OK, deletedCurrentMovie: deletedCurrentMovie })
        else
            res.status(RESPONSE_CODES.BAD_REQUEST).json({ respomse: false, message: `Movie not found` })
    }
    catch (err) {
        console.log("Faild to delete due to: ", err)
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ respomse: false, message: `Error Deleting movie : ${err}` })

    }
}

export default {
    fetchAllCurrentMovies: fetchAllCurrentMovies,
    addCurrentMovie: addCurrentMovie,
    fetchCurrentMovieById: fetchCurrentMovieById,
    updateCurrentMovie: updateCurrentMovie,
    deleteCurrentMovie: deleteCurrentMovie
}