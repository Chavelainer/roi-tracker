import { PrismaClient } from "@/generated/prisma/client";
import path from "path";

declare global {
	// eslint-disable-next-line no-var
	var prismaGlobal: PrismaClient | undefined;
}

// Fix DATABASE_URL untuk path relatif di Windows/Next.js
function getDatabaseUrl(): string {
	// Prioritaskan PRISMA_DATABASE_URL jika ada (Prisma Accelerate untuk serverless)
	if (process.env.PRISMA_DATABASE_URL) {
		return process.env.PRISMA_DATABASE_URL;
	}
	
	const dbUrl = process.env.DATABASE_URL || "";
	
	// Jika path relatif (file:./prisma/dev.db), convert ke absolut
	if (dbUrl.startsWith("file:./")) {
		const relativePath = dbUrl.replace(/^file:\.\//, "");
		const projectRoot = process.cwd();
		const absolutePath = path.resolve(projectRoot, relativePath).replace(/\\/g, "/");
		return `file:${absolutePath}`;
	}
	
	// Untuk PostgreSQL, pastikan format benar
	if (dbUrl.startsWith("postgres://")) {
		return dbUrl.replace("postgres://", "postgresql://");
	}
	
	// Untuk Turso/libsql atau postgresql, return as-is
	return dbUrl;
}

// Update DATABASE_URL di environment jika perlu
const resolvedDbUrl = getDatabaseUrl();
// Set DATABASE_URL untuk Prisma Client (Prisma membaca dari DATABASE_URL, bukan PRISMA_DATABASE_URL)
if (resolvedDbUrl && !resolvedDbUrl.startsWith("file:")) {
	process.env.DATABASE_URL = resolvedDbUrl;
}

// Prisma Client dengan logging untuk debugging
const prismaClientOptions: {
	log?: Array<"query" | "info" | "warn" | "error">;
} = {
	log: process.env.NODE_ENV === "development" ? (["query", "error", "warn"] as const) : (["error"] as const),
};

export const prisma: PrismaClient = global.prismaGlobal ?? new PrismaClient(prismaClientOptions);

if (process.env.NODE_ENV !== "production") {
	global.prismaGlobal = prisma;
}


