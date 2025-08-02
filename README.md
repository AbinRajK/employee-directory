# 👩‍💼 Employee Directory (Fullstack App)

A full-stack employee directory built with:

- **Backend**: Node.js + Apollo Server + MongoDB + GraphQL  
- **Frontend**: Next.js + Apollo Client + Tailwind CSS + React 19

---

## 🚀 Project Structure

employee-directory/
├── backend/ # Backend - GraphQL API with MongoDB
│ ├── server.js
│ ├── package.json
│ ├── .env
│ ├── schema/
│ └── database/
├── frontend/ # Frontend - Next.js + Apollo Client
│ ├── app/
│ ├── components/
│ ├── graphql/
│ ├── lib/
│ ├── package.json
│ ├── .env.local
│ ├── tailwind.config.js
│ └── next.config.js
├── .gitignore
└── README.md


---

## 🛠️ Prerequisites

Make sure the following are installed:

- ✅ [Node.js](https://nodejs.org/) (v18+ recommended)
- ✅ [MongoDB](https://www.mongodb.com/) (local or cloud like MongoDB Atlas)
- ✅ [Git](https://git-scm.com/)

---

## 📦 Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/employee-directory.git
cd employee-directory

2. Backend Setup (GraphQL API)

cd backend
npm install

Create a .env file in backend/ directory:

MONGODB_URI=your_mongodb_connection_string
PORT=4000

Seed the MongoDB database:

npm run seed

Start the backend server:

npm run dev

    By default, your GraphQL server will be available at:
    http://localhost:4000/graphql

3. Frontend Setup (Next.js)

Open a new terminal:

cd frontend
npm install

Create a .env.local file in the frontend/ directory:

NEXT_PUBLIC_GRAPHQL_API=http://localhost:4000/graphql

Start the Next.js frontend server:

npm run dev

    The frontend will be available at:
    http://localhost:3000