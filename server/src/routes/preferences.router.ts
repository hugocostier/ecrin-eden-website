import express from 'express'
import auth from '../controllers/auth.controller.js'
import preferences from '../controllers/preferences.controller.js'

const router = express.Router() 

router.route('/:id')
    .get(auth.isLoggedIn, auth.isAuthorized, preferences.getPreferencesForClient)
    .post(auth.isLoggedIn, auth.isAuthorized, preferences.addPreferences)
    .patch(auth.isLoggedIn, auth.isAuthorized, preferences.updatePreferences)

export default router 