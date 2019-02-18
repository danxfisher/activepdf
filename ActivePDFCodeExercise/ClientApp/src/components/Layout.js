import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Header } from './Header';
import { Footer } from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
		return (
			<Container fluid>
				<Row>
					<Col xs="12">
						<Header />
					</Col>
				</Row>
				<Row>
					<Col xs="12">
						{this.props.children}
					</Col>
				</Row>
				<Row>
					<Col xs="12">
						<Footer />
					</Col>
				</Row>
			</Container>
    );
  }
}
