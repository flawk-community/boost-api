import Mongoose from "mongoose";
import Deploy from "models/Deploy";

let db;

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  if (!db) {
    db = await Mongoose.connect(`${process.env.MONGO_URL}/boost`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  try {
    const deploy = await Deploy.findOne();

    res.json({ count: deploy?.count?.length || 0 });
  } catch (error) {
    return res.status(400).end(error.message || "Error fetching deploys");
  }
};
