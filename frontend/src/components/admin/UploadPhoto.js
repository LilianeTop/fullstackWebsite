import "./Admin.css";
import React, {Component} from 'react';
import axios from "axios";
import {toBeChecked} from "@testing-library/jest-dom/dist/to-be-checked";

export default class UploadPhoto extends Component {
    //do we need props in our constructor and where do they come from? it still works without the props
    //TODO: validation you have to choose at least a theme or a color and upload an image


    constructor(props) {
        super(props)
        this.state = this.initialState;
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.renderSpecials = this.renderSpecials.bind(this)
        this.renderColors = this.renderColors.bind(this)
        this.renderThemes = this.renderThemes.bind(this)
        this.changeColor = this.changeColor.bind(this)
        this.changeTheme = this.changeTheme.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeSpecial = this.changeSpecial.bind(this)
        this.previewFile = this.previewFile.bind(this)
    }

    initialState = {
        sort: "photo",
        specials: "FOTO",
        description: "",
        themes: [],
        colors: [],
        selectedFile: "",
    }


    //FIXME: after submit all fields should be reset to empty

    onFormSubmit = e => {
        e.preventDefault();
        //FIXME: how to validate checkboxes?
        // const validate = document.querySelector("input[type=checkbox]");
        if ('input[type=checkbox]'.toBeChecked) {
            alert("You must check at least one checkbox of either Theme or Color.");
            return false;
        }


        const artpieceData = {
            specials: this.state.specials,
            description: this.state.description,
            selectedFile: this.state.selectedFile,
            themes: this.state.themes,
            colors: this.state.colors
        }

        axios.post("http://localhost:8080/api/addArtpiece", artpieceData)
            .then(response => {
                this.setState(this.initialState)
                console.log(response.data)
                if (response.data != null)
                    alert("Kunstwerk opgeslagen")
            }).catch(error => {
            alert("Something went wrong" + error);
            this.setState(this.initialState)
        });
    }

    previewFile(event) {
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


    changeTheme(event) {
        let tempThemes = this.state.themes;
        const theme = {id: event.target.id, name: event.target.value, status: event.target.checked}

        if (!event.target.checked) {
            const index = tempThemes.findIndex((item) => item.name === theme.name)
            tempThemes.splice(index, 1);
        } else {
            tempThemes.push(theme.name.toUpperCase());
        }

        this.setState({
            themes: tempThemes
        })
    }

//FIXME: duplicated code
    changeColor(event) {
        let tempColors = this.state.colors;
        const color = {id: event.target.id, name: event.target.value, status: event.target.checked}
        if (!event.target.checked) {
            const index = tempColors.findIndex((item) => item.name === color.name)
            tempColors.splice(index, 1);
        } else {
            tempColors.push(color.name.toUpperCase());
        }
        this.setState({
            colors: tempColors
        })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    changeSpecial(event) {
        const {name, value} = event.target
        if (name === 'sort' && value === 'photo') {
            this.setState({sort: 'photo', specials: 'FOTO'});
        } else {
            this.setState({
                sort: 'special'
            })
            switch (value) {
                case 'Camera & Kwast':
                    this.setState({
                        specials: 'CAMERAKWAST'
                    });
                    break;
                case 'Boxbeeld':
                    this.setState({
                        specials: 'BOXBEELD'
                    });
                    break;
                case 'Geënsceneerd':
                    this.setState({
                        specials: 'GEENSCENEERD'
                    });
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        return (
            <main>
                <div className="koptekst">
                    <h1>Het uploaden van een foto</h1>
                </div>
                <form className="formulier" onSubmit={this.onFormSubmit}>
                    <h3>Kies de foto die je wilt uploaden.</h3>
                    <div key='bestand'
                         className="custom-file bestand"
                         style={{width: 250}}>
                        <input
                            type="file"
                            className="custom-file-input"
                            id="customFileLangHTML"
                            name='preview'
                            accept=".jpeg, .png, .jpg"
                            onChange={this.previewFile}
                            required
                        />
                        <label className="custom-file-label" htmlFor="customFileLangHTML"
                               data-browse="Bestand kiezen">Voeg je foto toe</label>

                        <img id="preview" name="preview" src="" height="150" alt=""/>
                        <br/>
                    </div>

                    <hr/>
                    <h3>Kies het type kunstwerk: </h3>
                    <label key='foto'>Foto</label>
                    <input
                        type="radio"
                        name="sort"
                        value="photo"
                        checked={this.state.sort === "photo"}
                        onChange={this.changeSpecial}
                    />
                    <label key='special'>Special</label>
                    <input
                        type="radio"
                        name="sort"
                        value="special"
                        checked={this.state.sort === "special"}
                        onChange={this.changeSpecial}
                    />
                    {this.state.sort === 'special' ? this.renderSpecials() : ""}
                    <hr/>
                    <br/>
                    <h3>De ingegeven tekst is zichtbaar als ondertiteling bij de foto.</h3>
                    <textarea className='beschrijvingsveld'
                              key='beschrijving'
                              value={this.state.description}
                              name='description'
                              placeholder="Geef titel of beschrijf het werk"
                              onChange={this.handleChange}
                    />
                    <br/>
                    <hr/>
                    <br/>
                    <h3>Kies de thema's:</h3>
                    {this.renderThemes()}
                    <hr/>
                    <br/>
                    <h3>Kies de kleuren:</h3>
                    {this.renderColors()}
                    <hr/>
                    <button className='knop' type='submit'>Uploaden</button>
                </form>

            </main>
        )
    }
    ;

    renderSpecials() {
        const specials = ['Camera & Kwast', 'Boxbeeld', 'Geënsceneerd']
        return specials.map((special, i) => {
            return (
                <div key={i} className="form-check-inline">
                    <label> {special} </label>
                    <input
                        type='radio'
                        name='specials'
                        onChange={this.changeSpecial}
                        checked={this.state.specials[special]}
                        value={special}
                        required
                    />
                </div>
            )
        })
    }

    renderThemes() {
        const themes = ['Landschap', 'Stad', 'Buiten', 'Reizen', 'Water', 'Mensen', 'Abstract', 'Industrie', 'Scenes'];

        return themes.map((theme, i) => {
            return (
                <div key={i} className="form-check-inline">
                    <label> {theme} </label>
                    <input
                        type='checkbox'
                        name="theme"
                        onChange={this.changeTheme}
                        checked={this.state.themes[theme]}
                        value={theme}/>
                </div>
            )
        })
    }


    renderColors() {
        const colors = ['Blauw', 'Geel', 'Groen', 'Rood', 'Oranje', 'Paars', 'Kleurrijk'];
        return colors.map((color, i) => {
            return (
                <div key={i} className="form-check-inline">
                    <label>
                        {color}</label>
                    <input
                        type="checkbox"
                        name='color'
                        onChange={this.changeColor}
                        checked={this.state.colors[color]}
                        value={color}

                    />
                </div>
            )
        })
    }
}
