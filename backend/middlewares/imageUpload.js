import multer from 'multer'
import publicImagesPath from "../constants/publicImages";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, publicImagesPath)
    },
    filename: function (req, file, cb) {
        if (!file) {
            return ''
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const nameParts = file.originalname.split('.')
        const extension = nameParts[nameParts.length - 1]
        const name = nameParts[0]
        cb(null, `${name}-${uniqueSuffix}.${extension}`)
    }
})

const upload = multer({ storage: storage })

const imageUpload = [
    upload.single('image'),
    (req,res,next) => {
        if (!req.file) {
            return res.json({message: 'no file'})
        }
        console.log('req.file', `${publicImagesPath}/${req.file.filename}`)
        return res.json({filePath: `public/images/${req.file.filename}`})
    }
]

export default imageUpload
