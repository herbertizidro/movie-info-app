import React from 'react';
import AppConsumer from './context/context'; //com Consumer
import YouTube from 'react-youtube';

const SerieDetails = () => {
	
		const optsTrailer = {
		  height: '377px',
		  width: '100%',
		  playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		  },
		};
		
		return(
			<AppConsumer.Consumer>
				{value => (
				<div className="row">
						<div className="container-fluid">
							<div className="row">
								<div className="col-lg-10 title">					
									<h3>{value.title} ({value.year})</h3>
									<b>{value.runtime} | {value.released} | {value.rated} | {value.genre}</b>
								</div>
								
								<div className="col-lg-2 imdb">
									<b>IMDb</b><h1>{value.imdb}/10</h1>
								</div>
							</div>
						</div>
						
						<figure className="col-lg-3 poster">
							<img style={{maxHeight: '377px', minHeight: '377px', width: '270px'}} src={value.poster} alt="" />
						</figure>
							
						<div className="col-lg trailer">
							<YouTube videoId={''} className={'rounded'} opts={optsTrailer} />
						</div>
						
						<div className="container-fluid">
							<div className="row plot">
								<div className="col-lg">
									<b>{value.plot}</b>
								</div>
							</div>
						</div>
						
						<div className="container-fluid">
							<div className="row">
								<div className="col-lg details"> 
									<b> Director:</b> {value.director} | 
									<b> Writer:</b> {value.writer} | 
									<b> Actors:</b> {value.actors} | 
									<b> Language:</b> {value.language} | 
									<b> Country:</b> {value.country} | 
									<b style={{fontSize: '17px'}}> Awards:</b> <span style={{fontSize: '17px'}}>{value.awards}</span> | 						
									<b style={{fontSize: '17px'}}> IMDb:</b> <span style={{fontSize: '17px'}}>{value.imdb}</span> | 
									<b> IMDb ID:</b> {value.imdbid} | 
									<b style={{fontSize: '17px'}}> Seasons:</b> <span style={{fontSize: '17px'}}>{value.totalSeasons}</span> | 
									<b> Poster:</b> <a className='text-info' href={value.poster}>Show in full size</a>
								</div>
							</div>
							<br/>
							<hr class="hr-estilizado"/>
						</div>
				</div>				
				)}
			</AppConsumer.Consumer>
		)
}

export default SerieDetails;
