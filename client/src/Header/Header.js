import React from 'react';
import Search from '../Search/Search'
import Gitbuttons from './Gitbuttons/Gitbuttons';
import './Header.css';

export default (props) => (
	<div>
		<div className="row justify-content-center" style={{paddingBottom: "10px"}}>
            <div className="col-10 col-md-4">
                <img src="/logo.png" id="logo" alt="logo" className="img-fluid d-block mx-auto" />
            </div>
    </div>
    <div className="row justify-content-center">
        <div className="col-10 col-md-6">
            <Search handleConvert={props.handleConvert} convertInProgress={props.convertInProgress}  />
        </div>
    </div>
    <div className="row justify-content-center">
        <div className="col-10 col-md-6"> 
            <Gitbuttons />
        </div>
    </div>
	</div>
);