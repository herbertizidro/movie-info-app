import React from 'react';
import './MovieInfo.css';
import MovieOrSerieSearch from "./components/movie-serie-search";
import Contact from "./components/contact";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

// npm install --save-dev @iconify/react @iconify/icons-ri  https://iconify.design/icon-sets/
import { Icon } from '@iconify/react';
import movie2Line from '@iconify/icons-ri/movie-2-line';

/* esse componente(pai) renderiza o wrapper que contém a estrutura do app (front-end) e controla as rotas */

function MovieInfoBrowser(){
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
					<Route exact path="/" component={MovieOrSerieSearch}/>
					<Route path="/contact" component={Contact}/>
				</Switch>
			</section>

			<footer className="bg-dark text-white">
				<small>Developed by <a href="https://github.com/herbertizidro/movie-info-app" style={{fontSize: "12px"}}>Herbert Souza</a></small>
			</footer>
		</div>
	</BrowserRouter>
  );
}

export default MovieInfoBrowser;
