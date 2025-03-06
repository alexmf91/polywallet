## **🌟 Overview**
**PolyWallet** is a modern **Web3 wallet platform** that allows users to:
- 🔑 **Authenticate** with their wallet (EIP-4361 Sign-in with Ethereum)  
- 💰 **View token & NFT balances**  
- 🎭 **Send ERC721 & ERC1155 NFTs** to other users using their usernames  
- ⚡ **Interact seamlessly** with the **Polygon blockchain**  

This project is built using **Next.js 15 (App Router), NestJS, Tailwind CSS, shadcn/ui, Viem, and Wagmi**, with **PostgreSQL + Prisma** as the database and **Alchemy** as the blockchain provider.

---

## **📁 Project Structure**
```sh
polywallet/
│── backend/       # NestJS backend service (API)
│── frontend/      # Next.js frontend (Web3 UI)
│── README.md      # Project Overview (this file)
```

---

## **🚀 Quick Start**

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/your-repo/polywallet.git
cd polywallet
```

### **2️⃣ Setup the backend**
```sh
cd backend
pnpm install --frozen-lockfile
pnpm run start:dev
```
> 🛠 **API Documentation:** `http://localhost:8000/api-docs`

---

### **3️⃣ Setup the frontend**
```sh
cd ../frontend
pnpm install --frozen-lockfile
pnpm run dev
```
> 🌍 **Frontend Live:** `http://localhost:3000`

---

## **📌 Tech Stack**
| Layer       | Technology |
|------------|-----------|
| **Frontend** | Next.js 15, Tailwind CSS, shadcn/ui, Wagmi, Viem
| **Backend**  | NestJS, Prisma, Alchemy SDK, Redis, PostgreSQL |
| **Blockchain** | Polygon (via Alchemy) |
| **Auth** | EIP-4361 (Sign-In with Ethereum) + JWT |

---

## **📜 License**
This project is **MIT Licensed**. Feel free to fork, modify, and contribute! 🎉
