import { NextResponse } from "next/server";
import clientPromise from "../../../utils/db";

const client = await clientPromise;
const db = client.db("SITQUIZ");

export const GET = async (req) => {
  try {
    const users = await db
      .collection("users")
      .find({}, { sort: { score: -1, submitTime: 1 }, limit: 5 })
      .toArray();

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
export const POST = async (req) => {
  try {
    const users = await db
      .collection("users")
      .find({}, { sort: { score: -1, submitTime: 1 }, limit: 5 })
      .toArray();

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
