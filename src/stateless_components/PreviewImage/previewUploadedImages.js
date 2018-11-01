import React from 'react';
import './previewImage.css';

const PreviewUploadedImages=(props)=> {

    function clickCloseIconHandler(event){
        props.deleteUploadedImage(event.target.id);

    };

    return(
            props.images.map((img,index)=>{
                return(
                    <div key={index} className='imgPreviewParent'>
                        <img className='imgPreview' id={index}  src={img.imagePreviewUrl} width="150px" height="150px" alt=""/>
                        <a id={index} onClick={clickCloseIconHandler} href="#" className="close-thik closeIcon"/>
                    </div>
                )
            })

        )


}


export default React.memo(PreviewUploadedImages);