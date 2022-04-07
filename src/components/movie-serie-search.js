import React, { useState, useEffect, useRef } from 'react';
import MovieOrSerieInfo from "./movie-serie-info";
import AppProvider from './context/context';
import { Icon, InlineIcon } from '@iconify/react';
import movie2Line from '@iconify/icons-ri/movie-2-line';

/* esse componente é reponsável por receber os dados da obra através da API Next Js que consulta o OMDb e propagar esses dados para o componente 
"filho"(MovieOrSerieInfo). poderia ter passado tudo por props, mas o intuito era praticar context api */

const SearchMovieOrSerie = () => {
	
	const [dadosImdb, setDadosImdb] = useState({
		title: "",
		year: "",
		rated: "",
		released: "",
		runtime: "",
		genre: "",
		director: "",
		writer: "",
		actors: "",
		plot: "",
		language: "",
		country: "",
		awards: "",
		imdb: "",
		imdbid: "",
		rotten: "",
		type: "",
		totalseasons: "",
		boxoffice: "",
		production: "",
		website: "",
		poster: "",
		response: "",
		trailer: "",
		searchHistory: "",
		error: false
	})
	
	const [loading, setLoading] = useState(false);
	
	/* melhoria de performance, pra evitar renderizar desnecessariamente a cada atualização do input */
	const inputRef = useRef("")
	
	/* executa uma vez ao iniciar */
	useEffect(() => {
		/* atualiza o estado de acordo com o conteúdo do local storage */
		let searchHistory = localStorage.getItem("searchHistory");
		if (searchHistory !== null) {
			setDadosImdb({...dadosImdb, searchHistory })			
		}
	}, [])
	
	/* observa atualizações no dadosImdb.title */
	useEffect(() => {
		
		/* scrolla a tela pra div que exibe o resultado da busca */
		function scrollToDiv () { 
			let scroll_div = document.getElementById("movie-or-serie-component");
			scroll_div.scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'start'})
		}

		scrollToDiv();
	  
	}, [dadosImdb.title]);
	
	/* atualiza o estado e o localStorage após obter os dados da API */
	function stateUpdate (json) {
		
		// coloca o titulo do filme no localStorage pra que fique registrada a última obra pesquisada
		// decidi pôr o titulo e não o "dadosImdb.input" porque o titulo é mais completo em alguns
		// casos, como o filme popularmente conhecido como "Zohan" e seu nome real
		localStorage.setItem('searchHistory', json["Title"].toUpperCase());
		
		// caso a api não retorne uma imagem
		let poster = json["Poster"] == 'N/A' ? require("./images/image-not-found.png") : json["Poster"];
		
		if(json["Type"] === "movie"){
			
			/* alguns não tem nota do rotten */			
			let rotten;
			try{
				rotten = json["Ratings"][1]["Value"];
			}catch(e){
				rotten = "N/A";
			}
			
			/* tratamento adicional pro trailer */
			let trailer = json["Trailer"] != null ? json["Trailer"] : ""

			setDadosImdb({
				...dadosImdb,
				title: json["Title"] || " N/A",
				year: json["Year"] || " N/A",
				rated: json["Rated"] || " N/A",
				released: json["Released"] || " N/A",
				runtime: json["Runtime"] || " N/A",
				genre: json["Genre"] || " N/A",
				director: json["Director"] || " N/A",
				writer: json["Writer"] || " N/A",
				actors: json["Actors"] || " N/A",
				plot: json["Plot"] || " N/A",	
				language: json["Language"] || " N/A",
				country: json["Country"] || " N/A",
				awards: json["Awards"] || " N/A",			
				imdb: json["imdbRating"] || " N/A",
				imdbid: json["imdbID"] || " N/A",
				rotten: rotten,
				type: json["Type"] || " N/A",
				boxoffice: json["BoxOffice"] || " N/A",
				production: json["Production"] || " N/A",
				website: json["Website"] || " N/A",
				poster: poster,
				response: "True",
				trailer: trailer.length ? trailer.split('=')[1] : "aDm5WZ3QiIE" // id de um vídeo "not found" genérico
			})
						
		}else if(json["Type"] === "series"){

			setDadosImdb({
				...dadosImdb,
				title: json["Title"] || " N/A",
				year: json["Year"] || " N/A",
				rated: json["Rated"] || " N/A",
				released: json["Released"] || " N/A",
				runtime: json["Runtime"] || " N/A",
				genre: json["Genre"] || " N/A",
				director: json["Director"] || " N/A",
				writer: json["Writer"] || " N/A",
				actors: json["Actors"] || " N/A",
				plot: json["Plot"] || " N/A",					
				language: json["Language"] || " N/A",
				country: json["Country"] || " N/A",
				awards: json["Awards"] || " N/A",			
				imdb: json["imdbRating"] || " N/A",
				imdbid: json["imdbID"] || " N/A",
				type: json["Type"] || " N/A",
				totalSeasons: json["totalSeasons"] || " N/A",
				poster: poster,
				response: "True",
				trailer: "aDm5WZ3QiIE" // id de um vídeo "not found" genérico, a biblioteca utilizada só pega trailer de filme
			})
										
		}
	}
	
	/* atualiza o inputRef com o nome da obra, que é utilizado na requisição da função getMovieInfoApi */
	function inputUpdate (e) {
		inputRef.current = e.target.value;
	}
	
	/* pega as informações da obra através da MovieInfoApi next js */
	async function getMovieInfoApi () {
		setLoading(true)
		let url = `https://movieinfoapi.netlify.app/api/movieinfo?search=${inputRef.current}`
		
		try{
			const response = await fetch(url);
			const responseStatus = response.status;
			const json = await response.json();
			
			if(responseStatus == 200){
				if(json["Response"] === "False"){
					setDadosImdb({...dadosImdb, response: "False"})
				}else{
					stateUpdate(json);
				}
			}else{
				setDadosImdb({...dadosImdb, error: true})
			}
			setLoading(false);
			
		}catch(e){
			console.log(e.message)
			setDadosImdb({...dadosImdb, error: true})
			setLoading(false);
		}
		
	}
	
	return(
				<>	
					
					<div className="row-fluid">
							
							<div className="carousel slide" data-ride="carousel">								
								<div className="carousel-inner">
									<div className="carousel-item active">
														
									  <div id="img-carousel">
										<img className="alien-img-desktop" src={require('./images/alien-desktop.png')}/>
										<img className="alien-img-mobile w-100" src={require('./images/alien-mobile.png')}/>
										<div id="title-carousel">
											<div class="morphing-text">Lorem Ipsum.</div>
											<div class="morphing-text">Lorem Ipsum is <br/> simply.</div>
											<div class="morphing-text">Welcome!</div>
										</div>
									  </div>
									  
									  <div id="search-desktop" className="carousel-caption">
										<div className="input-group">
											<input type="text" className="form-control form-control-lg shadow-none" placeholder="Search for a movie or serie title" value={dadosImdb.input} onChange={(e) => inputUpdate(e)}/>
											<div className="input-group-append">
												<button className="btn btn-info shadow-none" type="button" onClick={() => getMovieInfoApi()}>Search</button>
											</div>
										</div>
										{dadosImdb.response === "False" && <div className="alert alert-danger mt-2" role="alert">Sorry, no result found&nbsp;&#128546;</div>}
										{dadosImdb.searchHistory.length > 0 && <div id="last-search" className="mt-2"><span className="text-white">Your last search:  </span><span className="badge badge-pill badge-info" style={{fontSize: 13}}>{dadosImdb.searchHistory}</span></div>}
										{dadosImdb.error === true && <div className="alert alert-danger mt-2" role="alert">Sorry, an internal error occurred &nbsp;&#128546;</div>}
										{loading && <div className="mt-3 d-flex justify-content-center"><div className="spinner-grow text-info" role="status"><span className="sr-only">Loading...</span></div></div>}
									   </div>
									   
									   <div id="search-mobile" className="carousel-caption">
										<input type="text" className="form-control shadow-none" placeholder="Search for a movie or serie title" value={dadosImdb.input} onChange={(e) => inputUpdate(e)}/>
										<button className="btn btn-info mt-2 w-100 shadow-none" type="button" onClick={() => getMovieInfoApi()}>Search</button>										
										{dadosImdb.response === "False" && <div className="alert alert-danger mt-2" role="alert">Sorry, no result found&nbsp;&#128546;</div>}
										{dadosImdb.searchHistory.length > 0 && <div id="last-search" className="mt-2"><span className="text-white">Your last search: </span><span className="badge badge-pill badge-info" style={{fontSize: 13}}>{dadosImdb.searchHistory}</span></div>}
										{dadosImdb.error === true && <div className="alert alert-danger mt-2" role="alert">Sorry, an internal error occurred &nbsp;&#128546;</div>}
										{loading && <div className="mt-3 d-flex justify-content-center"><div className="spinner-grow text-info" role="status"><span className="sr-only">Loading...</span></div></div>}
									   </div>
									   
									</div>
							    </div>
							</div>

					</div>
						
					
					<div id="movie-or-serie-component" className="container">
						<AppProvider.Provider value={dadosImdb}>
							{dadosImdb.response === "True" && <MovieOrSerieInfo />}
						</AppProvider.Provider>
					</div>
					
					<div className="container">
						<br/><div className="text-center"><h3>About Us</h3></div><br/>
						<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, of a when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
						</p><br/>
					</div>
		
				</>
	)
	
}

export default SearchMovieOrSerie
