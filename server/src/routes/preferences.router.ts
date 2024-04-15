import express from 'express'
import auth from '../controllers/auth.controller.js'
import preferences from '../controllers/preferences.controller.js'

const router = express.Router() 

router.route('/:id')
    .get(auth.isLoggedIn, preferences.getPreferencesForClient)
    .post(auth.isLoggedIn, preferences.addPreferences)
    .patch(auth.isLoggedIn, preferences.updatePreferences)

export default router 