#!/bin/bash

# Employee Directory - Docker Quick Start Script

echo "🚀 Employee Directory - Docker Deployment"
echo "=========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ docker-compose.yml not found. Please run this script from the project root."
    exit 1
fi

echo "📋 Please configure your database settings in docker-compose.yml before proceeding."
echo ""
echo "Required environment variables:"
echo "  - DB_HOST (your database host)"
echo "  - DB_USER (your database user)"
echo "  - DB_PASSWORD (your database password)"
echo ""

read -p "Have you configured the database settings? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please configure database settings in docker-compose.yml and run this script again."
    exit 1
fi

echo ""
echo "🔨 Building Docker images..."
docker-compose build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi

echo ""
echo "✅ Build completed successfully"
echo ""
echo "🚀 Starting services..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "❌ Failed to start services. Please check the error messages above."
    exit 1
fi

echo ""
echo "✅ Services started successfully!"
echo ""
echo "📊 Container Status:"
docker-compose ps
echo ""
echo "🌐 Access Points:"
echo "  - Frontend: http://localhost"
echo "  - Backend API: http://localhost:5000/api"
echo "  - Health Check: http://localhost:5000/api/health"
echo ""
echo "📝 Useful Commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Restart services: docker-compose restart"
echo ""
echo "✨ Deployment complete! Your application is now running."
