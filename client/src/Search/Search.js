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
						<div className="col-md-8 col-12">
							<div className="form-group">
								<input type="text" name="video" className="form-control form-control-sm" placeholder="https://www.youtube.com/watch?v=EqPtz5qN7HM"/>
							</div>
						</div>
						<div className="col-md-4 col-12">
							<div className="form-group">
								<button type="submit" className="btn btn-outline-light btn-block btn-sm" >Convert</button>
							</div>
						</div>
					</div>
				</fieldset>
			</form>
		</div>
	);
}