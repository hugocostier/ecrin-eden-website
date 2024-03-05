import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../entities/User.js'
import { AuthRepository } from '../repositories/auth.repository.js'
dotenv.config()

function generateRandomPassword(length: number): string | undefined {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+'
    
    let password = ''
    for (let i = 0; i < length; i++) {
        // Add a random character from the characters list to the password 
        password += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return password
}

passport.use(
    new LocalStrategy(async (username, password, done) => {
        const user = await AuthRepository.authenticateUser(username, password)

        if (!user) {
            return done(null, false, { message: 'Incorrect username or password' })
        }

        return done(null, user)
    })
)

// passport.use(new GoogleStrategy(
//     {
//         clientID: process.env.GOOGLE_CLIENT_ID, 
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET', 
//         callbackURL: process.env.GOOGLE_CALLBACK_URL'
//     }, 
//     async (accessToken, refreshToken, profile, done) => {
//         const account = profile._json 
//         console.log('Account: ', account)

//     try {
//          const currentUser = await UserRepository.query('SELECT * FROM users WHERE google_id = ?', [account.sub])
//             if (currentUser.length) {
//                 return done(null, currentUser[0])
//             }

//             const newUser = {
//                 google_id: account.sub,
//                 email: account.email,
//                 password: generateRandomPassword(12),
//                 first_name: account.given_name,
//                 last_name: account.family_name,
//                 profile_picture: account.picture
//             }


//             const [id] = await UserRepository.add(newUser)
//             newUser.id = id

//             return done(null, newUser)
//         } catch (error) {
//             return done(error, false, { message: 'Error authenticating with Google' })
//         }
//     }
// ))

//             const userService = new UserService
//             const user = await UserRepository.findById(parseInt(profile.id))

//             if (user) {
//                 return done(null, user)
//             }

//             if (!profile.emails) {
//                 return done(null, false, { message: 'No email provided by Google' })
                
//             }
            
//             const newUser = await userService.addUser({
//                 id: parseInt(profile.id), 
//                 email: profile.emails[0].value, 
//                 password: generateRandomPassword(12) 
//             })

//             return done(null, newUser)
//         } catch (error) {
//             return done(error, false, { message: 'Error authenticating with Google' })
//         }
//     }
// ))


passport.serializeUser((user: Express.User, done) => {
    done(null, user)
})

passport.deserializeUser((user: User | null, done) => {
    return done(null, user)
})

export default passport 