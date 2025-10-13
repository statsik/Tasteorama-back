🌍 About the Project

Tasteorama is a backend for a modern cooking and recipe-sharing platform.
It handles user authentication, recipe management, image uploads, and secure access via JWT tokens.

The backend is built with Node.js, Express, and MongoDB, providing a reliable REST API for the frontend application.

⚙️ Tech Stack

Node.js + Express.js – server and routing

MongoDB + Mongoose – database and data models

JWT – secure authentication

bcrypt – password hashing

Multer – file upload handling

Google OAuth 2.0 – login with Google

dotenv – environment variables

Nodemailer – email sending (password reset, etc.)

✨ Main Features

👤 User registration and login (email or Google)

🔐 JWT-based authentication (access + refresh tokens)

🧁 CRUD operations for recipes

📸 Image upload for recipes

📧 Password reset via email

1️⃣ Clone the project
git clone https://github.com/statsik/Tasteorama-back.git
cd Tasteorama-back

2️⃣ Install dependencies
npm install

3️⃣ Create .env file

Add your environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
ENABLE_CLOUDINARY=false

4️⃣ Run the server

Development mode:

npm run dev


Production mode:

npm start

🔗 Related Links

Frontend repository: Tasteorama Frontend

Live project: Vercel Deployment

Telegram Bot: Join Tasteorama Bot

⚡ Pagination and sorting for recipes

💾 Connection with the Tasteorama frontend
