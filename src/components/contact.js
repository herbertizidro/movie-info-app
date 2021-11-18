import React from 'react';

const Contact = () => {

	return(
			<>	
				<section className="container">
					<div className="row">
						<div className="col-sm"></div>
						<div className="col-md-8 mt-5">
							
							<div className="text-center"><h3>
								Contact us
							</h3></div><br/>
							
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
							</p><br/>
							
							<form action="https://formspree.io/<your-email>" method="POST">
							  Name
							  <input type="text" required name="name" className="form-control"/><br/>
							  E-mail
							  <input type="email" required name="email" className="form-control"/><br/>
							  Message
							  <textarea type="text" required name="message" rows="5" className="form-control"></textarea>
							  <br/>
							  <input type="submit" value="Send message" className="btn btn-info"/>
							</form><br/><br/><br/>
					</div>
						<div className="col-sm"></div>
					</div>
				</section>
			</>
		)
}
	

export default Contact;
