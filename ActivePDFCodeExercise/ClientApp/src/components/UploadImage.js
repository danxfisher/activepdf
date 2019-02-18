import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import './UploadImage.css';

export class UploadImage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			imageLink: '',
			pdfLink: '',
			loading: true
		}
	}

	displayName = UploadImage.name;

	uploadImage = (files) => {
		let formData = new FormData();
		formData.append('file', files[0], files[0].name);

		fetch('api/upload/', {
			method: 'POST',
			body: formData
		})
			.then(response => response.json())
			.then(data => {
				this.setState(
					{
						imageLink: data.webPath,
						pdfLink: data.aPDFwebPath,
						loading: false
					});

				// update pdfUrl prop with new URL
				this.props.pdfUrl(data.aPDFwebPath);

			});
	}

	componentDidMount = () => {

	}

	render() {
		return (
			<section id="upload-image" className="section__large-spacer">
				<Container>
					<Row>
						<Col sm="4">
							<Container fluid id="upload-image__instructions">
								<Row>
									<Col sm="2">
										<div className="upload-image__number">01</div>
									</Col>
									<Col sm="10">
										<div className="upload-image__number-subtext">
											Upload and convert image to PDF
										</div>
									</Col>
								</Row>
							</Container>
						</Col>
						<Col sm="8">
							<div id="upload-image__border">
								<input type="file" id="file-upload" accept="image/*" className="upload-image__input" onChange={(e) => this.uploadImage(e.target.files)} />
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
}
