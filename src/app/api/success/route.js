import prisma from "@/app/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    // Check if the user is authenticated
    if (!user || !user.id) {
      throw new Error(`Something went wrong with authentication: ${JSON.stringify(user)}`);
    }

    // Check if the user exists in the database
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      // Create a new user in the database if not exists
      await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
        },
      });

      return NextResponse.redirect("http://localhost:3000/");
    }

    // If user exists, you can return a response or perform other actions here
    return NextResponse.redirect("http://localhost:3000/");

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
