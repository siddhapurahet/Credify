'use server';

import { ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";

export const SignIn = async() => {
    try {

    }
    catch(error) {
        console.error('Error', error);
    }
}

export const SignUp = async(userData: SignUpParams) => {

    const {email, password, firstName, lastName} = userData;

    try {
        // Creating a user account
        const { account } = await createAdminClient();
        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);

  cookies().set("my-custom-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
    }
    catch(error) {
        console.error('Error', error);
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
