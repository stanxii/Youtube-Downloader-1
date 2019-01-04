import React from 'react';
import './VideoInfo.css';

export default (props) => (
	<div>
		{(props.id && !props.convertInProgress) && (
			<div className="row justify-content-center">
	                <div className="col-md-2 col-12">
	                  <div style={{paddingBottom: "5px"}}>
	                    <a href={props.link} download={props.title + ".mp4"}>
							<button className="btn btn-outline-success btn-block">Download</button>
						</a>
	                  </div>
	                  <div style={{paddingBottom: "5px"}}>
	                  	<a href={"https://www.youtube.com/watch?v=" + props.id}>
	                    <button className="btn btn-block btn-outline-primary">Visit the video</button>
	                    </a>
	                  </div>
	                </div>
	                <div className="col-md-6 col-12">
	                  <iframe width="100%" height="315" src={"https://www.youtube.com/embed/" + props.id} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title={props.title} allowFullScreen></iframe>
	                </div>
	              </div>
		)}
	</div>
);