import React from 'react';
import './VideoInfo.css';

export default (props) => (
	<div className="card" id="videoInfo">
		<div className="card-body">
			<div className="row">
				<div className="col-md-4 col-12">
					<img src={props.thumbnail} className="img-fluid card-img" alt="thumbnail"/>					
					<div className="d-block d-md-none">
						<hr />
					</div>
				</div>
				<div className="col-md-8 col-12">
					<p id="card-title">{props.title}</p>
					<hr/>
					<div className="card-button">
						<a href={props.link} download={props.title + ".mp4"}>
							<button className="btn btn-outline-success btn-sm">Download</button>
						</a>
					</div>
					<div className="card-button">
						<a href={"https://www.youtube.com/watch?v=" + props.id}>
							<button className="btn btn-outline-danger btn-sm">Open</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
);