import React, { Component } from 'react';
import './Header.css';

export class Header extends Component {
	displayName = Header.name

	render() {
		return (
			<section id="exercise-header">
				<div id="exercise-header__top" className="section__spacer background__dark-blue">
					<img src="Resources/Images/activepdf_logo.png" id="activePdf-logo" className="img-responsive" alt="ActivePDF Logo" />
				</div>
				<div id="exercise-header__bottom" className="section__mini-spacer background__orange">
					Code Exercise
				</div>
			</section>
		);
	}
}
