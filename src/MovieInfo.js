import React from 'react';
import './MovieInfo.css';
import SearchMovieOrSerie from "./components/search-movie-serie";
import Contact from "./components/contact";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

// npm install --save-dev @iconify/react @iconify/icons-ri  https://iconify.design/icon-sets/
import { Icon, InlineIcon } from '@iconify/react';
import movie2Line from '@iconify/icons-ri/movie-2-line';


function MovieInfo(){
  return (
	<BrowserRouter>
		<div className="wrapper">
		
			<section className="top">
				<nav className="navbar navbar-dark bg-dark justify-content-between">
					<Link to="/"><span className="navbar-brand"><Icon icon={movie2Line} width="34px"/>&nbsp;Movie Info</span></Link>
					<Link to="/contact"><span className="nav-link active">Contact</span></Link>
				</nav>
			</section>

			<section className="content">
				<Switch>
					<Route exact path="/" component={SearchMovieOrSerie}/>
					<Route path="/contact" component={Contact}/>
				</Switch>
			</section>

			<footer className="bg-dark text-white">
				<small>Developed by <a href="https://github.com/herbertizidro/movie_info_react_app" style={{fontSize: "12px"}}>Herbert Souza</a></small>
			</footer>
		</div>
	</BrowserRouter>
  );
}

export default MovieInfo;
