import React from 'react';
import './Header.css';

export default () => (
	<div id="header">
		<h1 className="text-center">Youtube Downloader</h1>
		<div id="gitbuttons">
			<a className="github-button" href="https://github.com/FLiotta" aria-label="Follow @FLiotta on GitHub">Follow @FLiotta</a>
            &nbsp;
            <a className="github-button" href="https://github.com/FLiotta/Youtube-Downloader" data-icon="octicon-star" aria-label="Star FLiotta/Youtube-Downloader on GitHub">Star</a>
		</div>
		<p className="lead text-center">Youtube video converter to Mp4 in nodeJS / Express and React</p>	
		</div>
);