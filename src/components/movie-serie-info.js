import React, { useContext } from 'react';
import AppContext from './context/context';
import YouTube from 'react-youtube';

/* exibe a informação relacionada ao filme ou série */

const MovieData = (context) => {
	return(
		<div className="col-lg details"> 
			<b> Director:</b> {context.director} | 
			<b> Writer:</b> {context.writer} | 
			<b> Actors:</b> {context.actors} | 
			<b> Language:</b> {context.language} | 
			<b> Country:</b> {context.country} | 
			<b style={{fontSize: '17px'}}> Awards:</b> <span style={{fontSize: '17px'}}>{context.awards}</span> | 						
			<b style={{fontSize: '17px'}}> IMDb:</b> <span style={{fontSize: '17px'}}>{context.imdb}/10</span> | 
			<b> IMDb ID:</b> {context.imdbid} | 
			<b style={{fontSize: '17px'}}> Rotten Tomatoes:</b> <span style={{fontSize: '17px'}}>{context.rotten}</span> | 
			<b> Box office:</b> {context.boxoffice} | 
			<b> Production:</b> {context.production} | 
			<b> Website:</b> {context.website} | 
			<b> Poster:</b> <a className='text-info' href={context.poster} target="_blank">Show in full size</a>
		</div>
	)
}

const SerieData = (context) => {
	return(
		<div className="col-lg details"> 
			<b> Director:</b> {context.director} | 
			<b> Writer:</b> {context.writer} | 
			<b> Actors:</b> {context.actors} | 
			<b> Language:</b> {context.language} | 
			<b> Country:</b> {context.country} | 
			<b style={{fontSize: '17px'}}> Awards:</b> <span style={{fontSize: '17px'}}>{context.awards}</span> | 						
			<b style={{fontSize: '17px'}}> IMDb:</b> <span style={{fontSize: '17px'}}>{context.imdb}</span> | 
			<b> IMDb ID:</b> {context.imdbid} | 
			<b style={{fontSize: '17px'}}> Seasons:</b> <span style={{fontSize: '17px'}}>{context.totalSeasons}</span> | 
			<b> Poster:</b> <a className='text-info' href={context.poster}>Show in full size</a>
		</div>
	)
}

const MovieOrSerieInfo = () => {
	
		/* acessando o contexto */
		const context = useContext(AppContext)
		
		/* opções adicionais para o frame do Youtube */
		const optsTrailer = {
		  height: '377px',
		  width: '100%',
		  playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		  },
		};
	
		return(
			<>	
				<div className="row mb-3">
						<div className="container-fluid">
							<br/>
							<div className="row">
								<div className="col-lg-10 title">									
									<h3>{context.title} ({context.year})</h3>
									<b>{context.runtime} | {context.released} | {context.rated} | {context.genre}</b>
								</div>
								
								<div className="col-lg-2 imdb">
									<b>IMDb</b><h1>{context.imdb}/10</h1>
								</div>
							</div>
						</div>
						
						<figure className="col-lg-3 poster">
							<img style={{maxHeight: '377px', minHeight: '377px', width: '270px'}} src={context.poster} alt="poster" />
						</figure>
						
						<div className="col-lg trailer">
							<YouTube videoId={context.trailer} opts={optsTrailer} />
						</div>
						
						<div className="container-fluid">
							<div className="row plot">
								<div className="col-lg">
									<b>{context.plot}</b>
								</div>
							</div>
						</div>
						
						<div className="container-fluid">
							<div className="row">
								{context.type === "movie" && (MovieData(context))}
								{context.type === "series" && (SerieData(context))}
							</div>
							<br/><br/>
							<hr class="hr-estilizado"/>
						</div>
	
				</div>				
			</>
		)
}
	

export default MovieOrSerieInfo;
