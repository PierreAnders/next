import clientPromise from "../../../../lib/mongodb";
import { ObjectId, ReturnDocument } from "mongodb";


export default async function handler(req, res) {

    const idMovie = req.query.id
    const idComment = req.query.idComment
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const fakeComment = {
        "name": "Peter Anderson",
        "email": "peter.anderson@fakegmail.com",
        "movie_id": new ObjectId (idMovie),
        "text": "This is a test.",
        "date": { "$date": { "$numberLong": "1029646567000" } }
    };

    switch (req.method) {

        case "GET":
            const getComment = await db.collection("comments").findOne({ _id: new ObjectId(idComment) });
            res.json({ status: 200, data: getComment });
            break;

        case "POST":
            const newComment = fakeComment;
            
            const result = await db.collection("comments").insertOne({newComment});
            const newCommentRessource = await db.collection("comments").findOne({ _id: new ObjectId(result.insertedId) });

            res.json({ status: 200, data: newCommentRessource });
            break;

        case "PUT":
            const putComment = await db.collection("comments").findOneAndUpdate({ _id: new ObjectId(idComment) },
                { $set: { email: "secondtest@fakeComment.com" } },
                { ReturnDocument: true }
            );
            res.json({ status: 200, data: putComment });
            break;

        case "DELETE":
            const deleteComment = await db.collection("comments").deleteOne({ _id: new ObjectId(idComment) });
            res.json({ status: 200, data: { comment: deleteComment } });
            break;

        default:
            res.status(405).end();
    }
}