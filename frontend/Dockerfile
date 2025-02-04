# Gunakan versi Node.js yang sama dengan lokal
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file frontend ke dalam container
COPY . .

# Expose port frontend (sesuai dengan Vite)
EXPOSE 5173

# Jalankan React dalam mode development menggunakan Vite
CMD ["npm", "run", "dev"]
