import React from "react";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';


const ImageView = ({image, className=""}) => {
    return (
        <PhotoProvider className="!cursor-pointer">
            <PhotoView src={image}>
                <img src={image} className={`${className} max-w-20 object-contain mx-auto`} alt="image" />
            </PhotoView>
        </PhotoProvider>
    );
};

export default ImageView;