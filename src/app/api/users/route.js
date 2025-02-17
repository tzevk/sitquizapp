import clientPromise from "../../../utils/db";

const client = await clientPromise;
const db = client.db("SITQUIZ");
export const POST = async (req) => {
  try {
    const data = await req.json();
    let user = await db
      .collection("users")
      .find({ contact: data.contact })
      .toArray();
    if (user.length > 0) {
      return Response.json(
        { error: "User exists with that contact" },
        { status: 400 }
      );
    }
    await db
      .collection("users")
      .insertOne({ ...data, score: 0, submitTime: 120 });

    return Response.json({ message: "Successful Registration" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
export const GET = async (req) => {
  try {
    let users = await db.collection("users").find({}).toArray();

    return Response.json({ users });
  } catch (error) {
    return Response.json({ error: "Server Error" });
  }
};
