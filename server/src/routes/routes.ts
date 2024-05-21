import express from 'express'
import appointmentRouter from './appointment.router.js'
import authRouter from './auth.router.js'
import clientRouter from './client.router.js'
import contentRouter from './content.router.js'
import mailRouter from './mail.router.js'
import preferencesRouter from './preferences.router.js'
import serviceRouter from './service.router.js'
import userRouter from './user.router.js'

const router = express.Router() 

router.use('/appointments', appointmentRouter)
router.use('/auth', authRouter)
router.use('/clients', clientRouter)
router.use('/content', contentRouter)
router.use('/mail', mailRouter)
router.use('/preferences', preferencesRouter)
router.use('/services', serviceRouter)
router.use('/users', userRouter)

export default router 