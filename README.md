# Capstone: Full-Stack Portfolio & Blog

Student ID: 24998089 · Name: Wang Shiqi (王诗淇)
Course: Web Data Management and Application

A production-ready full-stack personal portfolio + blog:
- **Backend** (`backend/`): Node.js + Express + Mongoose, JWT auth, REST API.
- **Frontend** (`client/`): React (Vite) SPA with React Router and the Context API.

## Live URLs

- Frontend: https://capstone-portfolio-gray.vercel.app
- Backend API: https://positive-reprieve-production.up.railway.app

## Project structure

```
capstone/
├── backend/                 # Express REST API
│   ├── server.js            # entry point (helmet, cors, route mounting)
│   ├── db.js                # mongoose connection
│   ├── models/
│   │   ├── UserModel.js     # username / email / password(select:false) + bcrypt + matchPassword
│   │   ├── Project.js       # portfolio project, ref -> User
│   │   ├── BlogPost.js      # blog post, ref -> User, timestamps
│   │   ├── Comment.js       # ref -> User + BlogPost, timestamps
│   │   └── Message.js       # contact form message, timestamps
│   ├── controllers/         # user / project / blog / comment / contact
│   ├── routes/              # userRoutes / projectRoutes / blogRoutes / contactRoutes
│   ├── middleware/
│   │   ├── auth.js          # protect: verifies Bearer JWT, loads req.user
│   │   └── error.js         # central JSON error handler
│   └── utils/               # ErrorHandler + generateToken
└── client/                  # React SPA (Vite)
    └── src/
        ├── api.js           # fetch wrapper (base URL from VITE_API_URL)
        ├── context/AuthContext.jsx   # global auth state, localStorage persistence
        ├── components/       # Header, Footer, ProjectCard, BlogPostCard
        └── pages/           # Home, Projects, BlogList, BlogDetail, Contact,
                             # Login, Register, AdminDashboard (protected)
```

## API endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/users/register` | public | register (bcrypt-hashed password) |
| POST | `/api/users/login` | public | login, returns JWT |
| GET | `/api/projects` | public | list all projects |
| GET | `/api/projects/:id` | public | single project |
| POST | `/api/projects` | Bearer | create project |
| PUT | `/api/projects/:id` | Bearer | update project |
| DELETE | `/api/projects/:id` | Bearer | delete project |
| GET | `/api/blog` | public | list posts, populated author |
| GET | `/api/blog/:id` | public | single post + comments |
| POST | `/api/blog` | Bearer | create post (author = req.user) |
| PUT | `/api/blog/:id` | Bearer + author | update own post |
| DELETE | `/api/blog/:id` | Bearer + author | delete own post (+ its comments) |
| GET | `/api/blog/:postId/comments` | public | list comments on a post |
| POST | `/api/blog/:postId/comments` | Bearer | comment on a post |
| POST | `/api/contact` | public | submit contact form |

Auth header format: `Authorization: Bearer <token>`.

## Run locally

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env        # then edit: MONGO_URI (your MongoDB Atlas string), JWT_SECRET
npm start                    # http://localhost:3000
```

### 2. Frontend (separate terminal)

```bash
cd client
npm install
cp .env.example .env        # default points at http://localhost:3000/api
npm run dev                 # http://localhost:5173
```

### 3. Create your admin user

With the API running, register the first user (this becomes your admin):

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"yourname","email":"you@example.com","password":"yourpass"}'
```

Then log in at `/login` on the frontend and you'll be redirected to `/admin`.

## Deployment

- **Backend** → Render / Heroku: set env vars `MONGO_URI` and `JWT_SECRET` in the host dashboard. No need to commit `.env`.
- **Frontend** → Vercel / Netlify: build command `npm run build`, output dir `dist`. Set env var `VITE_API_URL=https://your-backend-url/api`.
