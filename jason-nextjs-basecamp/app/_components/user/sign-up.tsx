"use client";

import React from 'react';
import {z, ZodIssue} from 'zod';
import {useFormState} from "react-dom";

type Props = {
    action: (
        _prevState: any,
        params: FormData
    ) => Promise<{ errors: ZodIssue[] }>;
};

export const SignupFormSchema = z.object({
    name: z.string()
        .min(2, {message: 'Name must be at least 2 characters long.'})
        .trim(),
    email: z.string()
        .email({message: 'Please enter a valid email.'}).trim(),
    password: z.string()
        .min(8, {message: 'Be at least 8 characters long'})
        .regex(/[a-zA-Z]/, {message: 'Contain at least one letter.'})
        .regex(/[0-9]/, {message: 'Contain at least one number.'})
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

export function SignUp({action}: Props) {
    const [state, formAction] = useFormState(action, {errors: []});
    const nameErrors = findErrors("name", state.errors);
    const emailErrors = findErrors("email", state.errors);
    const passwordErrors = findErrors("password", state.errors);

    return (
        <form action={formAction}>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" placeholder="Name"/>
                <ErrorMessages errors={nameErrors} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="Email"/>
                <ErrorMessages errors={emailErrors} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password"/>
                <ErrorMessages errors={passwordErrors} />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    )
}

const ErrorMessages = ({errors}: { errors: string[] }) => {
    if (errors.length === 0) return null;

    const text = errors.join(", ");

    return <div className="text-red-600 peer">{text}</div>;
};

const findErrors = (fieldName: string, errors: ZodIssue[]) => {
    return errors
        .filter((item) => {
            return item.path.includes(fieldName);
        })
        .map((item) => item.message);
};