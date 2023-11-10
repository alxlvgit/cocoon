import { db } from "@/db";
import { user } from "@/db/schema";

const seedDb = async () => {
  await db.insert(user).values([
    {
      username: "john",
      firstName: "John",
      lastName: "Doe",
    },
    {
      username: "jane",
      firstName: "Jane",
      lastName: "Doe",
    },
  ]);
};

seedDb();
