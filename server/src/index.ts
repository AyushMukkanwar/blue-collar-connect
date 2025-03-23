import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { cors } from 'hono/cors'
import { configDotenv } from 'dotenv'
import authRoutes from './routes/authentication-routes.js'
import communityRoutes from './routes/community-routes.js'
import jobRoutes from './routes/job-routes.js'
import adminRoutes from './routes/admin-routes.js'
import userRoutes from './routes/user-routes.js'

configDotenv()

// Create an instance of Hono and set a base path for the API
const app = new Hono().basePath('/api')

// Apply CORS to all sub-routes under the API base path
app.use('*', cors({
  origin: [
    'http://localhost:3000',
    'https://3000-idx-blue-collar-connect-1741848905747.cluster-mwrgkbggpvbq6tvtviraw2knqg.cloudworkstations.dev',
    'http://localhost:3001',
  ],
  credentials: true,
}))

// Register your routes (note: the routes paths are now relative to the basePath '/api')
app.route('/auth', authRoutes)
app.route('/community', communityRoutes)
app.route('/job', jobRoutes)
app.route('/user', userRoutes)
app.route('/admin', adminRoutes)

// Optional: a default route for '/'
app.get('/', (c) => {
  return c.json({ message: 'Welcome to the API!' })
})

// For Vercel's App Router, set the runtime to Node.js and export GET and POST handlers
export const runtime = 'nodejs'
export const GET = handle(app)
export const POST = handle(app)
