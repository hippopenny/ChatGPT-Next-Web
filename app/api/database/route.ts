import { NextRequest, NextResponse } from "next/server";
import {
  addUser,
  getAllUser,
  deleteUser,
  getByIdUser,
} from "./model/usermodel";

export async function GET(request: NextRequest): Promise<any> {
  const idUser = request.nextUrl.searchParams.get("idUser");

  const result = await getByIdUser(idUser);
  return NextResponse.json(result, { status: 200 });
}

export async function POST(request: NextRequest): Promise<any> {
  const reqBody = await request.json();

  console.log("reqBody::", reqBody);

  const user = {
    idUser: reqBody.idUser,
    nameUser: reqBody.nameUser || "-1",
    emailUser: reqBody.emailUser || "-1",
    balanceUser: reqBody.balanceUser || -1,
    socialUser: reqBody.socialUser || {},
  };
  console.log("user::", user);

  const result = await addUser(user);

  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(request: NextRequest): Promise<any> {
  const reqBody = await request.json();
  const result = await deleteUser(reqBody.idUser);

  return NextResponse.json(result, { status: 200 });
}
