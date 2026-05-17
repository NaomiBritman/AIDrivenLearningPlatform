
import path from 'path';
import dotenv from 'dotenv'; 

dotenv.config({ path: path.resolve(__dirname, '../.env') });
import app from "./app";
import { connectToDb } from "./config/db";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDb(); 
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Server startup failed:', error);
    process.exit(1);
  }
}

startServer();