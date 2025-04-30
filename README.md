# DP Blog

A full-featured MERN stack blogging platform with user authentication, content management, and media uploads.

![screencapture-localhost-5173-2025-04-30-10_23_51](https://github.com/user-attachments/assets/2036195b-ad1b-4d10-a04c-ab9044cf95e5)


## 📋 Features

### User Management
- User registration and authentication
- JWT-based authentication
- Profile management
- Avatar uploads and management 
- Secure password hashing with bcrypt

### Content Management
- Create, read, update, and delete blog posts
- File uploads for post thumbnails
- Category-based post organization
- User-specific post management
- Rich text editing for post content

### Additional Features
- Responsive design for all devices
- Error handling with custom HTTP error models
- Secure file storage and management

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- bcrypt for password hashing
- File uploads with Express-Fileupload

### Frontend
- React.js
- Vite (Build tool)
- Tailwind CSS
- React Router
- Axios for API calls

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm 

### Project Structure
```
MERN BLOG APP/
├── client/                 # React frontend
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env               
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js     
│
├── server/                 # Node.js backend
│   ├── config/            
│   ├── controllers/      
│   ├── middleware/        
│   ├── models/            
│   ├── Routes/            
│   ├── upload/            
│   ├── .env               
│   ├── .gitignore
│   ├── index.js           
│   ├── package.json
│   └── vercel.json        
```

### Setting Up the Project

1. Clone the repository
```bash
git clone [https://github.com/dulithaPathum/dp-blog.git](https://github.com/Dulithapathum/MERN-Blog-App.git)
cd dp-blog
```

2. Install Backend Dependencies
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL= your client url
```

4. Create the upload directory
```bash
mkdir upload
```

5. Install Frontend Dependencies
```bash
cd ../client
npm install
```

6. Create a `.env` file in the client directory (if needed):
```
VITE_API_URL=http://localhost:3000
```

7. Start the Backend Server
```bash
cd ../server
npm run dev
```

8. Start the Frontend Development Server
```bash
cd ../client
npm run dev
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login a user |
| GET | `/api/users/:id` | Get user profile |
| POST | `/api/users/change-avatar` | Change user avatar |
| PUT | `/api/users/edit-user` | Edit user details |
| GET | `/api/users` | Get all authors |

### Posts Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/post/:id` | Create a new post |
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get a single post |
| GET | `/api/posts/categories/:category` | Get posts by category |
| GET | `/api/posts/users/:id` | Get posts by a specific user |
| PATCH | `/api/post/:id` | Edit a post |
| DELETE | `/api/post/:id` | Delete a post |

## 📦 Project Structure

### Backend Structure
- `config/` - Configuration files and environment setup
- `controllers/` - Request handlers for users and posts
- `middleware/` - Authentication and error handling middleware
- `models/` - Mongoose schemas (User, Post, Error models)
- `Routes/` - API route definitions
- `upload/` - Directory for storing uploaded images

### Frontend Structure
- Built with Vite and React
- Tailwind CSS for styling
- Modular component architecture

### Database Models

#### User Model
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `avatar`: String (file path)
- `posts`: Number (default 0)

#### Post Model
- `title`: String (required)
- `category`: String (required)
- `description`: String (required)
- `thumbnail`: String (file path, required)
- `creator`: ObjectId (reference to User)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication
- File upload size validation
- Secure file storage with UUID-based naming
- Input validation and error handling

## 🚀 Deployment

### Backend Deployment
The server is configured for deployment on Vercel with the included `vercel.json` file.

### Frontend Deployment
The React frontend can be built for production using:
```bash
cd client
npm run build
```

This generates optimized static files in the `dist` directory that can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Dulitha Pathum - Initial work

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
