import React, { Component } from 'react';
import { UploadImage } from './UploadImage';
import { ActivePDFReader } from './ActivePDFReader';

export class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pdfUrl: '',
			loading: true
		}
	}

	displayName = Home.name;

	handlePdfUrl = (urlValue) => {
		this.setState({
			pdfUrl: urlValue
		});
	}


	componentDidMount = () => {

	}

	render() {
		const { pdfUrl } = this.state;
		return (
			<section id="home">

				<UploadImage pdfUrl={this.handlePdfUrl} />
				<ActivePDFReader pdfUrl={pdfUrl} />

			</section>
		);
	}
}
