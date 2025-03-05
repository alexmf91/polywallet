# **Polywallet Backend**

<p align="center">
  <a href="https://www.typescriptlang.org/" target="blank"><img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" width="100" alt="TypeScript Logo" /></a>
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://www.postgresql.org/media/img/about/press/elephant.png" width="100" alt="PostgreSQL Logo" /></a>
  <a href="https://www.prisma.io/" target="blank"><img src="https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Forganization%2Fprofile_image%2F1608%2F0f93b179-76bf-4ee7-a838-e8222fbef062.png" width="100" alt="Prisma Logo"/></a>
  <a href="https://redis.io/" target="blank"><img src="https://static-00.iconduck.com/assets.00/redis-original-wordmark-icon-2045x2048-nz2tg5u6.png" width="100" alt="Redis Logo"/></a>
  <a href="https://www.alchemy.com/" target="blank"><img src="https://developers.moralis.com/wp-content/uploads/web3wiki/36-alchemy-university/637aec5afa17b7b24f690e18_7t56pPIT2un48PxSe5fg0gQKdKsLAmibOuuop1Ealss.jpeg" width="100" alt="Alchemy Logo"/></a>

---

## **🛠️ Stack**

- **Framework**: [NestJS](https://nestjs.com/) (TypeScript-based backend framework)
- **Database**: PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
- **Blockchain Provider**: [Alchemy SDK](https://www.alchemy.com/) (Polygon Mainnet)
- **Caching**: Redis
- **API Documentation**: Swagger

---

## **📦 Features**

- **Wallet-based authentication** (EIP-4361)
- **Token & NFT balance retrieval**
- **Recipient username resolution**
- **Secure JWT authentication**
- **Swagger API documentation**
- **PostgreSQL database (Prisma ORM)**
- **Redis-based nonce storage for login security**

---

## **📌 Installation & Setup**

### **1️. Clone the repository**

```sh
git clone https://github.com/your-repo/polywallet.git
cd polywallet
cd backend
```

### **2️. Install dependencies**

```sh
pnpm install --frozen-lockfile
```

### **3️. Setup environment variables**

Create a `.env` file at the **root of the backend directory** (`polywallet/backend/.env`) and add:

```ini
# App Config
APP=Polywallet
PORT=8000
VERSION=1

# JWT
JWT_SECRET=supersecuresecret
JWT_EXPIRATION=1h

# Redis
REDIS_URL=redis://user:password@redis-host:6379

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/polywallet
DIRECT_URL=postgresql://user:password@localhost:5432/polywallet

# Ethereum
ALCHEMY_API_KEY=your-alchemy-api-key
```

### **4️. Run Database Migrations**

```sh
pnpm prisma migrate dev --name init
```

### **5️. Start the Backend**

```sh
pnpm run start:dev
```

---

## **📖 API Documentation**

Once the backend is running, you can access the **API documentation** and test endpoints via Swagger:

```
http://localhost:8000/api-docs
```

---

## **📜 Running Tests**

To run unit tests:

```sh
pnpm run test
```

---

## **🚀 Deployment**

1. **Build for production**
    ```sh
    pnpm run build
    ```
2. **Run the server**
    ```sh
    pnpm run start:prod
    ```

---

## **📜 License**

This project is **MIT Licensed**. Feel free to fork, modify, and contribute! 🎉
