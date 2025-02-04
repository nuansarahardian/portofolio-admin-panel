# Gunakan versi Node.js yang sama dengan lokal
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file backend ke dalam container
COPY . .

# Expose port backend
EXPOSE 5000

# Jalankan backend dengan nodemon (hot-reloading)
CMD ["npm", "run", "dev"]
