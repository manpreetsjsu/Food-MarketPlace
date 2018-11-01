import React from 'react';
import {Button} from 'semantic-ui-react';

function FileInput(props) {

    let fileInput = React.createRef();

    function handleImageChange(event) {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        if (file && file.type.match('image.*')){
            reader.readAsDataURL(file);
            fileInput.value='';
        }
        //this method gets triggered when file reader is done reading the file..
        reader.onloadend = () => {
            //update() is immutable way to update the state
            //https://reactjs.org/docs/update.html
            props.appendImageToArray({file: file, imagePreviewUrl: reader.result})
        };
    };

    function handleUploadChange(){
        fileInput.click();
    };

        return (
            <>
                    <input  style={{display:'None'}}
                            name="images"
                            placeholder="upload image"
                            type="file"
                            onChange={handleImageChange}
                            multiple
                            ref={node => fileInput=node}/>
            <br/>
                <Button
                    onClick={handleUploadChange}
                    icon='upload'
                    content='Upload Images' />
            </>
        );

}

export default React.memo(FileInput);