import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const comments = await db.collection("comments").find({}).limit(10).toArray();
    res.json({ status: 200, data: comments });
}
