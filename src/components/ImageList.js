import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageList = (props) =>  {
    useEffect(() => {
        fetchImages();
    }, [])

    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchImages = async () =>{
        const data = await axios.get('https://boiling-refuge-66454.herokuapp.com/images');
        setImages(data.data);
        setIsLoaded(true);
    }

    return (
        <React.Fragment>
            <div className="images">
                {
                    isLoaded ?
                        images.map(image => {
                            return <img key={image.id} src={image.url} alt={image.id} className="image" onClick={() => props.handleClick(image.id)}/>
                        }) :
                        <h3>Loading...</h3>
                }
            </div>
        </React.Fragment>
    );
}

export default ImageList;