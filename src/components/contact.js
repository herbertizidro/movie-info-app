import React, { useState } from 'react';

const Contact = () => {
	
	const [nome, setNome] = useState('')
	const [email, setEmail] = useState('')
	const [mensagem, setMensagem] = useState('')
	const [confirmacaoEnvio, setConfirmacaoEnvio] = useState(false)
	
	function postContactForm(e){
		e.preventDefault(); //para não atualizar a página e não passar os dados pela url
		let url = ""
		try{
			fetch(url, method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(
				[{
					"nome": nome,
					"email": email,
					"mensagem": mensagem
				}]
			)).then((response) => {
				if(response.status == 200){ setConfirmacaoEnvio(true) }else{ alert(response.message) }
			})
		}catch(error){
			alert(error.message);
		}
	}

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
							
							<form onSubmit={postContactForm}>
							  <label htmlFor="nome">Nome</label>
							  <input id="nome" type="text" required name="nome" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)}/><br/>
							  <label htmlFor="email">E-mail</label>
							  <input id="email" type="email" required name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
							  <label htmlFor="mensagem">Message</label>
							  <textarea id="mensagem" type="text" required name="mensagem" rows="5" className="form-control" value={mensagem} onChange={(e) => setMensagem(e.target.value)}/>
							  <br/>
							  <button className="btn btn-info">Enviar</button>
							</form><br/>
							{confirmacaoEnvio && <div className="alert alert-success" role="alert">Mensagem enviada com sucesso!</div>}
							<br/><br/>
					</div>
						<div className="col-sm"></div>
					</div>
				</section>
			</>
		)
}
	

export default Contact;
