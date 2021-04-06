import React, {Component} from "react";
import "./Admin.css";
import Menu from "./Menu";
import axios from "axios";
import UploadPhoto from "./UploadPhoto";

export default class UpdatePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        // this.onFormSubmit = this.onFormSubmit.bind(this)
        this.previewFile = this.previewFile.bind(this)
        this.showPhotoDetails = this.showPhotoDetails.bind(this)
    }

    initialState = {
        allArtpieces: [],
        showMenu: false,
        checkCount: 0,
        preview: null,
        showUploadPhotoForm: false

    }


    componentDidMount() {
        //FIXME: create a method in the controller to fetch all artpieces
        axios.get("http://localhost:8080/api/showPhoto")
            .then(response => {
                const artpieces = response.data;
                this.setState({
                    allArtpieces: artpieces
                })
            })
    }

    previewFile(event) {
        this.setState({
            preview: URL.createObjectURL(event.target.files[0])
        })
        const preview = document.querySelector('img[id=preview]');
        const self = this;
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (upload) {
            preview.src = reader.result;
            self.setState({
                selectedFile: upload.target.result
            });
        };
        reader.readAsDataURL(file);
    };

    render() {
        if (this.state.showMenu) {
            return <Menu/>
        }
        else if (this.state.showUploadPhotoForm){
           return <UploadPhoto />
        } else
            return (
                <main>
                    <div className="koptekst">
                        <h1>Het wijzigen van een foto in de database.</h1>
                    </div>
                    <form id="updatePhotoForm" className="formulier" onSubmit={this.onFormSubmit}>
                        <h3>Selecteer de foto die je wilt wijzigen.</h3>
                        <div key='bestand'
                             className="custom-file bestand"
                        >
                        </div>
                        <table id="artpiecesTable" className="table table-hover">
                            <thead>{this.renderTableHeader()}</thead>
                            <tbody>{this.renderTableData()}</tbody>
                        </table>
                        <hr/>
                        <button className='knop' type='submit'>Selecteer</button>
                    </form>
                    <button className='terugknop' type='button' onClick={this.showMenu}>Terug naar Menu</button>
                </main>
            )
    }

    renderTableData() {
        return this.state.allArtpieces.map((artpiece, index) => {
            const {
                idArtpiece,
                selectedFile,
                adaptation,
                description,
                themes,
                colors
            } = artpiece
            return (
                <tr key={index}>
                    <td width={30}>{idArtpiece}</td>
                    <td width={300}>
                        <button type='button' onClick={this.showPhotoDetails}>
                            <img name="preview" src={selectedFile} height="150" alt=""/>
                        </button>
                    </td>
                    <td width={150}>{adaptation}</td>
                    <td width={500}>{description} </td>
                    <td key={themes.id} width={300}>
                        {themes.map(s => <React.Fragment>{s}<br/></React.Fragment>)}
                    </td>
                    <td key={colors.id} width={300}>
                        {colors.map(s => <React.Fragment>{s}<br/></React.Fragment>)}
                    </td>
                </tr>
            )
        })
    }

    showPhotoDetails() {
        //TODO: how to add the details of the clicked photo?
        // TODO: heading should be "Update this photo"
        this.setState({
            showUploadPhotoForm: true
        })
    }


    renderTableHeader() {
        return (
            <tr>
                <td width={30}>ID</td>
                <td width={300}>Preview</td>
                <td width={150}>Type</td>
                <td width={500}>Beschrijving</td>
                <td width={300}>Thema's</td>
                <td width={300}>Kleuren</td>
            </tr>
        )
    }
}