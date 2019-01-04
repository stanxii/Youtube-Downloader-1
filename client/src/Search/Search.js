import React from 'react';

export default (props) => {
	function handleSubmit(e) {
		e.preventDefault();
		const id = e.target.video.value;

		props.handleConvert(id);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<fieldset disabled={!!props.convertInProgress}>
				<div className="row">
		       		<div className="col-md-9 col-8">
		       			<div className="form-group">
		          		<input className="form-control" type="text" name="video" placeholder="https://www.youtube.com/watch?v=yca6UsllwYs" />
		         		</div>
		         	</div>
		            <div className="col-md-3 col-4">
		            	<div className="form-group">
		                <input className="btn btn-danger btn-block" type="submit" value="Convert" />
		            	</div>
		            </div>
	        	</div>
	        	</fieldset>
        	</form>
		</div>
	);
}