import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import './Footer.css';

export class Footer extends Component {

	displayName = Footer.name;

	render() {
		return (
			<section id="footer">
				<Container fluid>
					<Row>
						<Col sm="12" id="footer__top" className="background__orange">
							
						</Col>
					</Row>
					<Row>
						<Col sm="12" id="footer__bottom" className="section__spacer background__dark-blue">
							<table id="footer__contact">
								<tbody>
									<tr>
										<td className="footer__details-left">Name:</td>
										<td className="footer__details-right">Dan Fisher</td>
									</tr>
									<tr>
										<td className="footer__details-left">Email:</td>
										<td className="footer__details-right">danielxfisher@gmail.com</td>
									</tr>
								</tbody>
							</table>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
}
