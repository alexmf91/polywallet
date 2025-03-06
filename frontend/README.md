# **Polywallet Frontend**

<p align="center">
  <a href="https://nextjs.org/" target="blank"><img src="https://images-cdn.openxcell.com/wp-content/uploads/2024/07/24154156/dango-inner-2.webp" width="100" alt="Next.js Logo"/></a>
  <a href="https://tailwindcss.com/" target="blank"><img src="https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/31/tailwind.png" width="100" alt="Tailwind CSS Logo"/></a>
  <a href="https://wagmi.sh/" target="blank"><img src="https://developers.moralis.com/wp-content/uploads/web3wiki/196-wagmi/637e6c001c60c5e2d8078d8c_wOdHswYe73lnRqkKuJDsSLgwRkQ9Kt831G_9nSGTEFw.png" width="100" alt="Wagmi Logo"/></a>
  <a href="https://viem.sh/" target="blank"><img src="https://viem.sh/icon-dark.png" width="100" alt="Viem Logo"/></a>
</p>

---

## **🛠️ Stack**

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Web3 Wallet Connection**: [Wagmi](https://wagmi.sh/) + [Viem](https://viem.sh/)
- **State Management**: React Context + Wagmi hooks

---

## **📦 Features**

- **Wallet connection via MetaMask & WalletConnect**
- **Sign-in with Ethereum (EIP-4361)**
- **User profile & NFT balance display**
- **Send ERC721/1155 NFTs to usernames**
- **Dark mode support**
- **Server Components & Edge functions for performance**

---

## **📌 Installation & Setup**

### **1. Clone the repository**

```sh
git clone https://github.com/your-repo/polywallet.git
cd polywallet
cd frontend
```

### **2️. Install dependencies**

```sh
pnpm install --frozen-lockfile
```

### **3. Setup environment variables**

Create a `.env` file at the **root of the frontend directory** (`polywallet/frontend/.env`) and add:

```ini
# App
NEXT_PUBLIC_APP_NAME=PolyWallet
NEXT_PUBLIC_APP_DESCRIPTION="Check your wallet balances and manage your assets on Polygon network"
NEXT_PUBLIC_APP_URL=http://localhost:3000

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<YOUR-WALLETCONNECT-PROJECT-ID>

# Alchemy
NEXT_PUBLIC_ALCHEMY_API_KEY=<YOUR-ALCHEMY-API-KEY>

# API
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## **🚀 Running the App**

### **4️. Start the frontend (Next.js 15)**

```sh
pnpm run dev
```

> The app will be available at:
> 🌍 `http://localhost:3000`

---

## **📖 Deployment**

1. **Build for production**
    ```sh
    pnpm run build
    ```
2. **Start the server**
    ```sh
    pnpm run start
    ```

---

## **📜 License**

This project is **MIT Licensed**. Feel free to fork, modify, and contribute! 🎉

---
