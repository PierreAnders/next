import clientPromise from "../../../lib/mongodb";
import {ObjectId, ReturnDocument} from "mongodb";

export default async function handler(req, res) {
    const idMovie = req.query.id
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    
    const fakeMovie = {
        "plot": "Three men hammer on an anvil and pass a bottle of beer around.",
        "genres": [
            "Short"
        ],
        "runtime": 1,
        "cast": [
            "Charles Kayser",
            "John Ott"
        ],
        "num_mflix_comments": 0,
        "title": "blabla3",
        "fullplot": "A stationary camera looks at a large anvil with a blacksmith behind it and one on either side. The smith in the middle draws a heated metal rod from the fire, places it on the anvil, and all three begin a rhythmic hammering. After several blows, the metal goes back in the fire. One smith pulls out a bottle of beer, and they each take a swig. Then, out comes the glowing metal and the hammering resumes.",
        "countries": [
            "USA"
        ],
        "released": "1893-05-09T00:00:00.000Z",
        "directors": [
            "William K.L. Dickson"
        ],
        "rated": "UNRATED",
        "awards": {
            "wins": 1,
            "nominations": 0,
            "text": "1 win."
        },
        "lastupdated": "2015-08-26 00:03:50.133000000",
        "year": 1893,
        "imdb": {
            "rating": 6.2,
            "votes": 1189,
            "id": 5
        },
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 3,
                "numReviews": 184,
                "meter": 32
            },
            "lastUpdated": "2015-06-28T18:34:09.000Z"
        }
    };

    switch (req.method) {

        case "GET":
            const getMovie = await db.collection("movies").findOne({_id: new ObjectId(idMovie)});
            res.json({status: 200, data: getMovie});
            break;

        case "POST":
            const newMovie = fakeMovie;
            const result = await db.collection("movies").insertOne(newMovie);

            const newMovieRessource = await db.collection("movies").findOne({_id: new ObjectId(result.insertedId)});

            res.json({status: 200, data: newMovieRessource});
            break;

        case "PUT":
            const putMovie = await db.collection("movies").findOneAndUpdate({_id: new ObjectId(idMovie)}, 
            {$set: {imdb: {title: "testPutMovie"}}},
            {ReturnDocument: true}
        );            
            res.json({status: 200, data: putMovie});
            break;

        case "DELETE":
            const deleteMovie = await db.collection("movies").deleteOne({_id: new ObjectId(idMovie)});
            res.json({status: 200, data: {movie: deleteMovie}});
            break;
            
        default:
               res.status(405).end();
    }
}
