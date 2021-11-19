import React, { useState, useEffect } from 'react';
import MovieDetails from "./movie-details";
import SerieDetails from "./serie-details";
import AppProvider from './context/context';
import { Icon, InlineIcon } from '@iconify/react';
import movie2Line from '@iconify/icons-ri/movie-2-line';

const SearchMovieOrSerie = () => {
	
	const [dadosImdb, setDadosImdb] = useState({
		input: "",
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
		trailer: ""
	})
	
	/* pega o id do trailer */
	function getTrailer (title, year) {
		let trailerUrl = ''
		const movieTrailer = require('movie-trailer')
		movieTrailer(title, year).then((res) => { trailerUrl = res.split('=')[1] })
		console.log(trailerUrl)
		return trailerUrl
	}
	
	/* pega as informações da obra e atualiza o estado */
	function getOmdb () {
			let url = `https://www.omdbapi.com/?apikey=a7d879d7&t=${dadosImdb.input}&plot=full`
			fetch(url).then(res => {
			return res.json()
		})
		.then(json => {
			if(json["Response"] === "False"){
				setDadosImdb({...dadosImdb, response: "False"})
			}else{
				if(json["Type"] === "movie"){
						
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
						rotten: json["Ratings"][1]["Value"] || " N/A",						
						type: json["Type"] || " N/A",
						boxoffice: json["BoxOffice"] || " N/A",
						production: json["Production"] || " N/A",
						website: json["Website"] || " N/A",
						poster: json["Poster"] || " N/A",
						response: "True",
						trailer: getTrailer(json["Title"], json["Year"])
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
						poster: json["Poster"] || " N/A",
						response: "True",
						trailer: getTrailer(json["Title"], json["Year"])
					})
										
				}
			}
		})
		
	}
	
	/* atualiza a propriedade input do estado com o nome da obra, que é utilizado na requisição da função getOmdb */
	function updateInput (e) {
		setDadosImdb({...dadosImdb, input: e.target.value});
	}
	
	return(
				<>	
					
					<div className="row-fluid">
							
							<div className="carousel slide" data-ride="carousel">								
								<div className="carousel-inner">
									<div className="carousel-item active">
									  <img className="alien-img-desktop w-100" src={require('./images/alien-desktop.png')}/>
									  <img className="alien-img-mobile w-100" src={require('./images/alien-mobile.png')}/>
									  <div id="search-desktop" className="carousel-caption">
										<div className="input-group">
											<input type="text" className="form-control form-control-lg shadow-none" placeholder="Search for a movie or serie title" value={dadosImdb.input} onChange={(e) => updateInput(e)}/>
											<div className="input-group-append">
												<button className="btn btn-info shadow-none" type="button" onClick={() => getOmdb()}>Search</button>
											</div>
										</div>
										{dadosImdb.response === "False" && <div className="alert alert-danger mt-2" role="alert">Sorry, no result found&nbsp;&#128546;</div>}
									   </div>
									   <div id="search-mobile" className="carousel-caption">
										<input type="text" className="form-control shadow-none" placeholder="Search for a movie or serie title" value={dadosImdb.input} onChange={(e) => updateInput(e)}/>
										<button className="btn btn-info mt-2 w-100 shadow-none" type="button" onClick={() => getOmdb()}>Search</button>										
										{dadosImdb.response === "False" && <div className="alert alert-danger mt-2" role="alert">Sorry, no result found&nbsp;&#128546;</div>}
									   </div>
									</div>
							    </div>
							</div>

					</div>				
					
					<div className="container">
						<AppProvider.Provider value={dadosImdb}>
							{dadosImdb.response === "True" && dadosImdb.type === "movie" && <MovieDetails />}
							{dadosImdb.response === "True" && dadosImdb.type === "series" && <SerieDetails />}
						</AppProvider.Provider>
					</div>
					
					<div className="container">
						<br/><div className="text-center"><h3>About</h3></div><br/>
						<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, of a when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
						</p><br/>
					</div>
		
				</>
	)
	
}

export default SearchMovieOrSerie