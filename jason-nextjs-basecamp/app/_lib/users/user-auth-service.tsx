"use server";

import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {FormState} from "@/app/_interface/user-interface";
import {SignupFormSchema} from "@/app/_components/user/sign-up";

// this secret key should be load from environment variable
const secretKey = "secret";
// encode the secret key
const key = new TextEncoder().encode(secretKey);

// backend function to encrypt the payload
// we need jose library to use SignJWT to encrypt the payload
export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("10 sec from now")
        .sign(key);
}

// backend function to decrypt the payload
export async function decrypt(input: string): Promise<any> {
    const {payload} = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Call the provider or db to create a user...


}

export async function login(formData: FormData) {
    // Verify credentials && get the user
    if (!formData.get("email")) {
        console.log("!!!!! No form data found");
        return;
    }

    const user = {email: formData.get("email"), name: formData.get("name")};

    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({user, expires});

    // Save the session in a cookie
    cookies().set("session", session, {expires, httpOnly: true});
}

export async function logout() {
    // Destroy the session
    cookies().set("session", "", {expires: new Date(0)});
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}