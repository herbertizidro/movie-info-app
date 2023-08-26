import React, { useContext } from 'react';
import AppContext from './context/context';
import YouTube from 'react-youtube';

import { DEFAULT_TYPE_MOVIE, DEFAULT_TYPE_SERIES } from './constants/index';

/* exibe a informação relacionada ao filme ou série */

const mountMovieOrSerieInfo = context => {

	if(context.type !== DEFAULT_TYPE_MOVIE && context.type !== DEFAULT_TYPE_SERIES) return
	
	return (
		<div className="col-lg details"> 
			<b> Director:</b> {context.director} | 
			<b> Writer:</b> {context.writer} | 
			<b> Actors:</b> {context.actors} | 
			<b> Language:</b> {context.language} | 
			<b> Country:</b> {context.country} | 
			<b style={{fontSize: '17px'}}> Awards:</b> <span style={{fontSize: '17px'}}>{context.awards}</span> | 						
			<b style={{fontSize: '17px'}}> IMDb:</b> <span style={{fontSize: '17px'}}>{context.imdb}/10</span> | 
			<b> IMDb ID:</b> {context.imdbid} | 

			{context.type === DEFAULT_TYPE_MOVIE && (
				<>
				<b style={{fontSize: '17px'}}> Rotten Tomatoes:</b> <span style={{fontSize: '17px'}}>{context.rotten}</span> | 
				<b> Box office:</b> {context.boxoffice} | 
				<b> Production:</b> {context.production} | 
				<b> Website:</b> {context.website} |
				</>
			)}
			{context.type === DEFAULT_TYPE_SERIES && (
				<>
				<b style={{fontSize: '17px'}}> Seasons:</b> <span style={{fontSize: '17px'}}>{context.totalSeasons}</span> | 
				</>
			)}

			<b> Poster:</b> <a className='text-info' href={context.poster} target="_blank">Show in full size</a>
	        </div>
	);
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
								{mountMovieOrSerieInfo(context)}
							</div>
							<br/><br/>
							<hr class="hr-estilizado"/>
						</div>
	
				</div>				
			</>
		)
}
	

export default MovieOrSerieInfo;
