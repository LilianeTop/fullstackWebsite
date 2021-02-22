import {Carousel} from 'react-bootstrap';
import React, {Component} from "react";
import Photo from "./Photo";
import "./ThemaCarousel.css";
import axios from "axios";


export default class ThemaCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [
                {
                    idArtpiece: 0,
                    description: "",
                    imagePath: "",
                    portfolio: "",
                    themes: [],
                    colors: []

                }
            ]
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/showPhoto")
            .then(response => {
                const photos = response.data;
                this.setState({photos})
            })
    }


    render() {
        return (
            //FIXME: doesn't show the photos just the controls of a carousel
            //Warning: Each child in a list should have a unique "key" prop.
            //solved this by adding within the Carousel.Item tag the key={photo.idArtPiece}
            // which is also added to Photo.js component
            <Carousel className='photos'>
                {this.state.photos.map(photo =>
                        <Carousel.Item key={photo.idArtpiece}>
                            <Photo photo={photo} />

                        </Carousel.Item>

                )};
            </Carousel>

        );

    }
}





