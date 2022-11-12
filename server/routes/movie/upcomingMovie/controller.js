import Movie from "../../../models/Movies";
import { RESPONSE_CODES } from "../../../services/constants";
import getCurrentDate from "../../../services/date";

const addUpcomingMovie = async (req, res) => {
    try {
        let reqObj = req.body;
        if (!reqObj["tillDate"]) {
            reqObj["tillDate"] = reqObj["releaseDate"];
        }
        const upcomingMovie = await Movie.create(reqObj);
        res.status(RESPONSE_CODES.CREATED).json({ response: true, upcomingMovie: upcomingMovie, message: "Movie added to list successfully", status: RESPONSE_CODES.CREATED })
    }
    catch (err) {
        console.log("Error while adding upcoming movie", err);
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, message: `Error Occured ${err}`, status: RESPONSE_CODES.BAD_REQUEST })
    }

}

const fetchAllUpcomingMovies = async (req, res) => {
    try {
        const upcomingMovies = await Movie.find({ releaseDate: { $gt: getCurrentDate(new Date()) } });
        res.status(RESPONSE_CODES.OK).json(({ response: true, message: "List Of Upcoming Movies :", status: RESPONSE_CODES.OK, upcomingMovies: upcomingMovies }))
    }
    catch (err) {
        console.log("Error fetching all th movies: ", err)
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ response: false, message: `Can not fetch movies due to : ${err}`, status: RESPONSE_CODES.INTERNAL_SERVER_ERROR })
    }
}


const fetchUpcomingMovieById = async (req, res) => {
    try {
        const upcomingMovie = await Movie.findOne({ _id: req.params.id, releaseDate: { $gt: getCurrentDate(new Date()) } })
        if (upcomingMovie) {
            res.status(RESPONSE_CODES.OK).json({ response: true, message: "Requested Movie", upcomingMovie: upcomingMovie, status: RESPONSE_CODES.OK });

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

const updateUpcomingMovie = async (req, res) => {
    try {
        const reqObj = req.body;
        const updatedUpcomingMovie = await Movie.findOneAndUpdate({ _id: req.params.id, releaseDate: { $gt: getCurrentDate(new Date()) } }, reqObj, { runValidators: true, new: true })
        if (updatedUpcomingMovie)
            res.status(RESPONSE_CODES.UPDATED).json({ response: true, message: "Updated Upcoming Movies Successfully", updatedUpcomingMovie: updatedUpcomingMovie, status: RESPONSE_CODES.UPDATED })
        else
            res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, message: `Movie not found`, status: RESPONSE_CODES.BAD_REQUEST })
    }
    catch (err) {
        console.log("Error in updation of movie", err)
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, message: `Failed to update movie: ${err}`, status: RESPONSE_CODES.BAD_REQUEST })

    }

}

const deleteUpcomingMovie = async (req, res) => {
    try {
        const deletedUpcomingMovie = await Movie.findOneAndRemove({ _id: req.params.id, releaseDate: { $gt: getCurrentDate(new Date()) } })
        if (deletedUpcomingMovie)
            res.status(RESPONSE_CODES.OK).json({ response: true, message: "Deleted Movie Successfully", status: RESPONSE_CODES.OK, deletedUpcomingMovie: deletedUpcomingMovie })
        else
            res.status(RESPONSE_CODES.BAD_REQUEST).json({ respomse: false, message: `Movie not found` })
    }
    catch (err) {
        console.log("Faild to delete due to: ", err)
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ respomse: false, message: `Error Deleting movie : ${err}` })

    }
}

export default {
    addUpcomingMovie: addUpcomingMovie,
    fetchAllUpcomingMovies: fetchAllUpcomingMovies,
    fetchUpcomingMovieById: fetchUpcomingMovieById,
    updateUpcomingMovie: updateUpcomingMovie,
    deleteUpcomingMovie: deleteUpcomingMovie

}