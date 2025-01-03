# Odara Planner
Repositório destinado ao desenvolvimento de uma aplicação simples de gerenciamento de tarefas.

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
```

### 2. Navigate into the project directory
```bash
cd odara-planner
```

### 3. Install dependencies
Ensure you have `pnpm` installed. If not, you can install it by running:
```bash
npm install -g pnpm
```
Then, install the project dependencies:
```bash
pnpm install
```

### 4. Configure the environment variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="postgresql://odara_planner_db_user:XsGbuxZzw1XEVXzb90M5bHa83iLxPv9Y@dpg-ctq5uh1opnds73f40e20-a.oregon-postgres.render.com/odara_planner_db"
```

### 5. Seed the database (optional)
If you want to seed the database with initial data, run:
```bash
npx prisma db seed
```

### 6. Build the project
```bash
pnpm build
```

### 7. Run the development server
Start the server by running:
```bash
pnpm dev
```
The application will be available at:
- **Local:** http://localhost:3000
- **Network:** Check the terminal output for the network address

### 8. Deployment
The project is deployed at: [Odara Planner](https://odara-planner.vercel.app/)

