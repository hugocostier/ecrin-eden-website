import multer from 'multer'

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
} as { [key: string]: string }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const name = 'client_profile_picture_'
        const extension = MIME_TYPE[file.mimetype]

        cb(null, name + Date.now() + '.' + extension)
    }
})

export default multer({ storage: storage })