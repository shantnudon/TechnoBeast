import { uri } from "@/utils/db";
import { Airdrops } from "@/utils/model/airdrops";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export default async function handler(req,res) {
  if (req.method === "GET") {
    try {
      // Check for signed-in user
      const session = await getSession({ req });
      if (!session) {
        
    return NextResponse.redirect("/api/auth/signin");
        // return res.status(401).json({ message: "Unauthorized: Please sign in" });
      }

      // Connect to database and fetch airdrops
      await mongoose.connect(uri);
      const data = await Airdrops.find();

      return NextResponse.json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    } finally {
      // Close database connection (optional for performance optimization)
      await mongoose.disconnect();
    }
  } else {
    // Handle other HTTP methods (if applicable)
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}