"use server";

import { db, users } from "@repo/db";
import { eq, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function getUsers() {
    return await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt
    }).from(users).orderBy(desc(users.createdAt));
}

export async function createUser(prevState, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role") || "STAFF";

    if (!name || !email || !password) {
        return { error: "All fields are required" };
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
            role,
        });

        revalidatePath("/users");
        return { success: true };
    } catch (err) {
        console.error("User Creation Error:", err);
        if (err.message.includes("unique constraint")) {
            return { error: "Email already exists" };
        }
        return { error: "Failed to create user" };
    }
}

export async function deleteUser(id) {
    console.log("Attempting to delete user:", id);
    try {
        const result = await db.delete(users).where(eq(users.id, id));
        console.log("Delete result:", result);
        revalidatePath("/users");
        return { success: true };
    } catch (err) {
        console.error("User Deletion Error:", err);
        return { error: "Failed to delete user", details: err.message };
    }
}
