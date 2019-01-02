const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');	
const express = require('express');
let router = express.Router();


router.use((req,res,next) => {
	req.setTimeout(5 * 60 * 1000);
	next();
});

router.get('/info/:id', (req,res) => {
	const id = req.params.id;
	const url = `https://www.youtube.com/watch?v=${id}`;

	ytdl.getBasicInfo(url)
		.then((info) => {
			const video_info = {
				thumbnail: info.thumbnail_url,
				title: info.title
			}
			res.status(200).send(video_info);
		}).catch(e => res.status(400).send(e));
})

router.get('/download/:id', (req,res) => {

	const id = req.params.id;
	const url = `https://www.youtube.com/watch?v=${id}`;
	const pathToMedia = path.join(__dirname, '../', 'medias');
	
	if(ytdl.validateID(id)){
			if(ytdl.validateURL(url)){
				const video = ytdl(url, {filter: (format) => format.container === 'mp4'})
						.pipe(fs.createWriteStream(`${pathToMedia}/${id}.mp4`));

			video.on('finish', () => {
				res.download(`${pathToMedia}/${id}.mp4`,'video.mp4', (err) => {
					if(err){
						console.log(err)
					}else{
						fs.unlink(`${pathToMedia}/${id}.mp4`, (err) => {
							if(err)
								console.log(err)
						})
					}
				})
			});
			}else{
				res.status(400).send("Invalid URL");
			}
	}else{
		res.status(400).send("Invalid video id");
	}
})

module.exports = router;