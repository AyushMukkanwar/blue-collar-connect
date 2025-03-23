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
export const runtime = 'edge'

const app = new Hono().basePath('/api')

// CORS configuration
app.use('*', cors({
  origin: [
    'http://localhost:3000',
    'https://3000-idx-blue-collar-connect-1741848905747.cluster-mwrgkbggpvbq6tvtviraw2knqg.cloudworkstations.dev',
    'http://localhost:3001',
  ],
  credentials: true,
}))

// Routes
app.route('/auth', authRoutes)
app.route('/community', communityRoutes)
app.route('/job', jobRoutes)
app.route('/user', userRoutes)
app.route('/admin', adminRoutes)

// Default route
app.get('/', (c) => {
  return c.json({ message: 'Welcome to the API!' })
})

// Vercel-specific configuration
export const GET = handle(app)
export const POST = handle(app)
