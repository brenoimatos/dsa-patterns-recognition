import clientPromise from "../mongodb";


export async function getUserCount(): Promise<number> {
    const client = await clientPromise;
    const collection = client.db('test').collection('users');
    return await collection.countDocuments();
  }