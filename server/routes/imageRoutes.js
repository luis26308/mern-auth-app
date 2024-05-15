import express from 'express';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, { bucketName: 'profileImage' });
    console.log('GridFSBucket initialized'); // this runs
});
const imageRouter = express.Router();

imageRouter.route('/image/:filename').get(async (req, res)=> {
    const filename = req.params.filename;
    const cursor = await gfs.find({filename})
    const files = await cursor.toArray()

    if (!files || files.length === 0) {
        return res.status(404).json({
            err: 'no files exist'
        })
    }

    const file = files[0];
    const readStream = gfs.openDownloadStream(file._id);
    readStream.on('error', error => {
        res.status(500).json({ error: 'Error streaming file' });
    });
    readStream.pipe(res);
})

export default imageRouter