import { db, LoginUser } from "./platform";
import {
  User,
  ContactMethod,
  ContactMethodInput,
  Location,
  LocationInput,
} from "./generated/graphql";

export class UserService {
  constructor() {}

  async me(loginUser: LoginUser | null): Promise<User | null> {
    if (!loginUser) throw new Error("Not authenticated");
    const userDoc = await db.collection("users").doc(loginUser.uid).get();
    if (!userDoc.exists) return null;
    const data = userDoc.data() as User;
    return { ...data };
  }

  async userById(
    loginUser: LoginUser | null,
    userId: string
  ): Promise<User | null> {
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) return null;
    console.log(userDoc.data());
    const data = userDoc.data() as User;
    console.log(data);
    return { ...data };
  }

  async createUser(
    loginUser: LoginUser | null,
    nickname: string,
    address: string
  ): Promise<User> {
    if (!loginUser) throw new Error("Not authenticated");
    // location should use google map api to resolve from address

    let location: Location = {
      latitude: 0,
      longitude: 0,
    };
    const userData: User = {
      id: loginUser.uid,
      email: loginUser.email,
      nickname: nickname || undefined,
      location: location, // require to resolve from google map base on address
      address: address || undefined,
      createdAt: new Date().toISOString(),
    };
    await db.collection("users").doc(loginUser.uid).set(userData);
    return userData;
  }

  async updateUser(
    loginUser: LoginUser | null,
    nickname: string,
    address: string,
    contactMethods: ContactMethod[]
  ): Promise<User> {
    if (!loginUser) throw new Error("Not authenticated");
    let location: Location | undefined = undefined;
    if (address) {
      location = {
        latitude: 0,
        longitude: 0,
      };
      // require to resolve from google map base on address
    }
    const updates: Partial<User> = {
      nickname: nickname || undefined,
      contactMethods: contactMethods || undefined,
      location: location, // require to resolve from google map base on address
      address: address || undefined,
    };
    await db.collection("users").doc(loginUser.uid).update(updates);
    const updatedDoc = await db.collection("users").doc(loginUser.uid).get();
    return { ...(updatedDoc.data() as User) };
  }
}
