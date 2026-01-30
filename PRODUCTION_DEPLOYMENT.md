# Production Deployment Guide
## Employee Directory - employeedirectory.chandanjainnhp.in

This guide covers deploying the Employee Directory application to your production domain.

---

## 🌐 Domain Configuration

**Production Domain:** `https://employeedirectory.chandanjainnhp.in/`

---

## 📋 Pre-Deployment Checklist

### 1. DNS Configuration
Ensure your domain points to your server:
```bash
# Check DNS resolution
nslookup employeedirectory.chandanjainnhp.in

# Or
dig employeedirectory.chandanjainnhp.in
```

### 2. Server Requirements
- Docker and Docker Compose installed
- Ports 80 and 443 available
- PostgreSQL database accessible
- SSL certificate (Let's Encrypt recommended)

### 3. Environment Variables
Create `.env` file from template:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
DB_HOST=your-actual-database-host
DB_PORT=5432
DB_NAME=employee_directory
DB_USER=your-db-user
DB_PASSWORD=your-secure-password
DB_SSL=true  # Enable for production
```

---

## 🚀 Deployment Steps

### Step 1: Clone Repository (if not already done)
```bash
git clone <your-repo-url>
cd EmployeeDirectoryApplication
```

### Step 2: Configure Environment
```bash
# Copy and edit environment file
cp .env.example .env
nano .env  # or use your preferred editor
```

### Step 3: Build Docker Images
```bash
docker-compose build
```

### Step 4: Start Services (HTTP only - for initial setup)
```bash
docker-compose up -d
```

### Step 5: Verify Deployment
```bash
# Check container status
docker-compose ps

# Check logs
docker-compose logs -f

# Test backend health
curl http://localhost:5000/api/health

# Test frontend
curl http://localhost
```

---

## 🔒 SSL/HTTPS Setup

### Option 1: Let's Encrypt with Certbot (Recommended)

#### Install Certbot
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install certbot

# CentOS/RHEL
sudo yum install certbot
```

#### Obtain SSL Certificate
```bash
# Stop nginx temporarily
docker-compose stop frontend

# Get certificate
sudo certbot certonly --standalone -d employeedirectory.chandanjainnhp.in

# Certificates will be in:
# /etc/letsencrypt/live/employeedirectory.chandanjainnhp.in/
```

#### Configure Docker for SSL
1. Create SSL directory:
```bash
mkdir -p ./ssl
sudo cp /etc/letsencrypt/live/employeedirectory.chandanjainnhp.in/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/employeedirectory.chandanjainnhp.in/privkey.pem ./ssl/key.pem
sudo chmod 644 ./ssl/cert.pem
sudo chmod 600 ./ssl/key.pem
```

2. Update `docker-compose.yml`:
```yaml
frontend:
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - ./ssl:/etc/nginx/ssl:ro
```

3. Update `frontend/nginx.conf`:
   - Uncomment the HTTPS server block
   - Uncomment the HTTP to HTTPS redirect

4. Restart services:
```bash
docker-compose up -d
```

#### Auto-Renewal Setup
```bash
# Add to crontab
sudo crontab -e

# Add this line (runs twice daily):
0 0,12 * * * certbot renew --quiet && docker-compose restart frontend
```

### Option 2: Using Reverse Proxy (Nginx Proxy Manager, Traefik)

If using an external reverse proxy:
1. Keep frontend on port 80 only
2. Configure reverse proxy to handle SSL
3. Point reverse proxy to `http://your-server:80`

---

## 🗄️ Database Setup

### Connect to Existing PostgreSQL

Update `.env`:
```env
DB_HOST=your-postgres-host
DB_PORT=5432
DB_NAME=employee_directory
DB_USER=postgres
DB_PASSWORD=your-password
DB_SSL=true
```

### Using Docker PostgreSQL Container

If you want to add PostgreSQL to docker-compose:

```yaml
services:
  database:
    image: postgres:16-alpine
    container_name: employee-directory-db
    environment:
      - POSTGRES_DB=employee_directory
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network
    restart: unless-stopped

  backend:
    depends_on:
      - database
    environment:
      - DB_HOST=database

volumes:
  postgres-data:
```

---

## 📊 Monitoring & Maintenance

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Check Status
```bash
docker-compose ps
```

### Restart Services
```bash
# All services
docker-compose restart

# Specific service
docker-compose restart backend
```

### Update Application
```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build
```

### Backup Database
```bash
# If using Docker PostgreSQL
docker-compose exec database pg_dump -U postgres employee_directory > backup_$(date +%Y%m%d).sql

# If using external PostgreSQL
pg_dump -h your-db-host -U your-user employee_directory > backup_$(date +%Y%m%d).sql
```

---

## 🔧 Troubleshooting

### Container Won't Start
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Check if ports are in use
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443
sudo netstat -tulpn | grep :5000
```

### Database Connection Issues
```bash
# Test from backend container
docker-compose exec backend sh
wget -O- http://localhost:5000/api/health

# Check environment variables
docker-compose exec backend env | grep DB_
```

### SSL Certificate Issues
```bash
# Check certificate validity
openssl x509 -in ./ssl/cert.pem -text -noout

# Test HTTPS
curl -I https://employeedirectory.chandanjainnhp.in
```

### Frontend Can't Reach Backend
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Check Nginx configuration
docker-compose exec frontend nginx -t

# View Nginx logs
docker-compose logs frontend
```

---

## 🔐 Security Best Practices

1. **Use Strong Passwords**
   - Database password should be complex
   - Store in `.env` file (not in git)

2. **Enable SSL/HTTPS**
   - Use Let's Encrypt certificates
   - Force HTTPS redirect

3. **Keep Updated**
   - Regularly update Docker images
   - Update application dependencies

4. **Firewall Configuration**
   ```bash
   # Allow only necessary ports
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

5. **Database Security**
   - Enable SSL for database connections
   - Use strong authentication
   - Limit database access to application only

6. **Environment Variables**
   - Never commit `.env` to git
   - Use different credentials for production

---

## 📈 Performance Optimization

### Enable Caching
Already configured in Nginx:
- Static assets cached for 1 year
- Gzip compression enabled

### Database Optimization
```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_employees_email ON employees(email);
```

### Monitor Resources
```bash
# Check container resource usage
docker stats

# Check disk usage
docker system df
```

---

## 🚦 Health Checks

### Backend Health
```bash
curl https://employeedirectory.chandanjainnhp.in/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Employee Directory API is running"
}
```

### Frontend Health
```bash
curl -I https://employeedirectory.chandanjainnhp.in
```

Should return `200 OK`

---

## 📝 Deployment Checklist

- [ ] DNS configured and pointing to server
- [ ] Docker and Docker Compose installed
- [ ] `.env` file created with production values
- [ ] Database accessible and configured
- [ ] Docker images built successfully
- [ ] Containers running without errors
- [ ] Backend health check passing
- [ ] Frontend accessible via HTTP
- [ ] SSL certificate obtained
- [ ] HTTPS configured and working
- [ ] HTTP to HTTPS redirect enabled
- [ ] Firewall configured
- [ ] Backup strategy in place
- [ ] Monitoring set up
- [ ] Auto-renewal configured for SSL

---

## 🎯 Quick Commands Reference

```bash
# Deploy
docker-compose up -d

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Stop
docker-compose down

# Update
git pull && docker-compose up -d --build

# Backup database
docker-compose exec database pg_dump -U postgres employee_directory > backup.sql

# Check status
docker-compose ps

# View resource usage
docker stats
```

---

## 📞 Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Verify `.env` configuration
3. Test database connectivity
4. Check SSL certificate validity
5. Review Nginx configuration

---

**Your application is ready for production deployment at:**
## https://employeedirectory.chandanjainnhp.in/

Good luck with your deployment! 🚀
