import React from 'react';

export default (props) => (
	
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">            
              {props.errors.map((error) => (
                  <p key={error} className="text-center">{error}</p>
              ))}
          </div>
        </div>
);