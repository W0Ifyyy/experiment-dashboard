import { NextRequest } from "next/server";
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = await getCookieByName("token");
    if (!token || typeof token !== 'string') {  // Ensure token is a string
      return null;
    }
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

async function getCookieByName(name: string): Promise<string> {
  const cookieData = cookies().get(name)?.value || "";
  return new Promise((resolve) => setTimeout(() => {
    resolve(cookieData);
  }, 1000));
}
