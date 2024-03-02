import Image from 'next/image';
import React, { useState } from 'react'

export default function TeamImageDisplay(imageProperties) {
    const [imageSrc, setImageSRC] = useState(imageProperties.src);
    if(imageSrc.length == 0) return (<></>);
    return (
        <Image
        className={imageProperties.className}
        width={imageProperties.width}
        height={imageProperties.height}
        src={imageSrc}
        alt={imageProperties.alt}
        onError={() => {
            setImageSRC(`/Images/TeamImages/${imageProperties.sport}_TeamImages/NotFound.png`);
        }}
        />
    );
}