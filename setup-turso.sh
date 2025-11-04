#!/bin/bash
# Setup script untuk Turso Database (SQLite Cloud)

echo "🚀 Setting up Turso Database for Production..."

# Install Turso CLI jika belum ada
if ! command -v turso &> /dev/null; then
    echo "📦 Installing Turso CLI..."
    curl -sSfL https://get.tur.so/install.sh | bash
    export PATH="$HOME/.turso:$PATH"
fi

# Login ke Turso
echo "🔐 Please login to Turso..."
turso auth login

# Buat database
read -p "Enter database name (default: roi-tracker): " DB_NAME
DB_NAME=${DB_NAME:-roi-tracker}

echo "📊 Creating database: $DB_NAME..."
turso db create $DB_NAME

# Dapatkan database URL
DB_URL=$(turso db show $DB_NAME --url)

# Buat auth token
echo "🔑 Creating auth token..."
AUTH_TOKEN=$(turso db tokens create $DB_NAME)

# Output informasi
echo ""
echo "✅ Database created successfully!"
echo ""
echo "📋 Add these to your Vercel Environment Variables:"
echo "DATABASE_URL=$DB_URL?authToken=$AUTH_TOKEN"
echo ""
echo "Or for Prisma, use this format:"
echo "DATABASE_URL=\"libsql://$DB_URL?authToken=$AUTH_TOKEN\""
echo ""
echo "⚠️  Don't forget to update prisma/schema.prisma:"
echo "   Change provider from 'sqlite' to 'libsql'"
echo ""

