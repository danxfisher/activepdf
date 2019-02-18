import React, { Component } from 'react';
import './ActivePDFReader.css';

export class ActivePDFReader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			imageLink: '',
			pdfLink: '',
		}
	}

	displayName = ActivePDFReader.name;

	// api call to upload file
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
						pdfLinkServer: data.aPDFserverPath,
						loading: false
					});

				this.getPdfFile(data.aPDFwebPath);

			});
	}

	// get blob of newly created PDF
	getPdfFile = (url) => {
		fetch(url)
			.then(res => res.blob())
			.then(blob => {
				this.initReaderPlus(blob);
			});
	}

	// open created PDF with reader plus
	initReaderPlus = (file) => {
		let data = null;
		let filedata = null;

		// Load document into memory
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function (e2) {
			filedata = e2.target.result;
			data = filedata.substring(28);
		}

		// Initialization settings
		reader.onloadend = function (e) {
			window.readerplus.initializeSettings({
				protocol: "http",
				hostname: 'localhost',
				port: 62625,
				language: 'en',
			});

			window.readerplus.Document.addEventListener("load", function () {
				// Add new menu in File->General
				window.readerplus.mainmenu.File.General.addItem("Save and Print", "Save and Print", "Resources/Images/save_and_print.jpg", true, "Save and Print", "", function () {
					window.readerplus.Document.save();
					window.readerplus.Document.print();
				});
			});
			// Document settings
			var isMasterDocument = 1;
			var editMode = 1;

			// Upload document from memory into viewer
			var result = window.readerplus.Document.upload(data, isMasterDocument, editMode, "", "DocumentName.pdf");
			if (result.Status === 0) {
				// Save document ID in order to reopen a document from the Reader Plus data store
				var docID = window.readerplus.Document.getDocumentID();
				// Open document in edit mode
				window.readerplus.Document.edit(docID);
			}
		}
	}

	componentDidUpdate = () => {
		this.getPdfFile(this.props.pdfUrl);
	}

	render() {

		const { pdfUrl } = this.props;

		return (
			<section id="reader-plus">
				{ pdfUrl ? 
					<div id="ReaderPlus" className="reader-plus__window"></div>
				:
					<div id="reader-plus__placeholder" className="section__spacer background__light-blue">
						<div id="reader-plus__placeholder-text">
							Select an image to convert it to PDF and view it in ActivePDF Reader Plus
						</div>
					</div>
				}
				
			</section>
		);
	}
}
