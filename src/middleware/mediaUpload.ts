import multer from 'multer';
import { Request} from 'express'
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const media_upload = multer.diskStorage({
    destination: 'Uploads',
    filename: (req: Request, file, cb) => {
        let genrate = `${Date.now()}-${uuidv4()}`
        const ext = path.extname(file.originalname);
        let new_path = `${genrate}${ext}`
        cb(null, new_path)
    }
})

const filetycheck = (req: Request, file: any, cb: any) => {
    try {
        let file_type = path.extname(file.originalname)

        if (file_type !== '.png'.toLowerCase() && file_type !== '.jpg'.toLowerCase() && file_type !== '.jpeg'.toLowerCase() && file_type !== '.mp4') {
            return cb(new Error('Only Allow .png And .jpg And .jpeg Are Allow').message)
        }
        else {
            cb(null, true)
        }
    } catch (error) {
        console.log('Error ===--->', error);
    }
}

export const box_media_upload = multer({
    storage: media_upload,
    fileFilter: filetycheck
})