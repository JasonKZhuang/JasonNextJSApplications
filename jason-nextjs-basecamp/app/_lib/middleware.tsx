import { NextRequest } from "next/server";
import {updateSession} from "@/app/_lib/users/user-auth-service";

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}