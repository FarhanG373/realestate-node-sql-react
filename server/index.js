import express from 'express';
import cors from 'cors';
import authRoutes  from './Routes/authRoute.js';
import propertyRoute  from './Routes/propertyRoute.js';
import multer from "multer";
const PORT = 9090;



const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("./uploads"));

let imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}-${file.originalname}`)
    }
})

//Img filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(null, Error('Only image is allow!!!'))

    }
}

let upload = multer({
    storage: imgConfig,
    fileFilter: isImage,
})

app.post('/upload', upload.single('propertyImage'), (req, res) => {
    if (!req.file) {
        const errorResponse = {
            status: 400,
            message: 'No file uploaded.',
        };
        return res.status(400).json(errorResponse);
    }
    const successResponse = {
        status: 200,
        message: `File uploaded successfully: ${req.file.filename}`,
        data : req.file.filename
    };
    return res.status(200).json(successResponse);
});


app.use('/auth',authRoutes );
app.use('/property',propertyRoute );
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

