"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";
import { Databases, Users } from "node-appwrite";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.CREDIFY_APPWRITE_PROJECT_BACKEND_KEY!);

  const session = cookies().get("appwrite-session");

  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.CREDIFY_APPWRITE_PROJECT_BACKEND_KEY!)
    .setKey(process.env.CREDIFY_APPWRITE_API_SECRET!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
        return new Databases(client);
    },
    get user() {
        return new Users(client);
    }
  };
}
