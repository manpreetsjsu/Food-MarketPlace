import React,{Component} from 'react';
import {Button} from 'semantic-ui-react';

class FileInput extends Component {
    constructor(props) {
        super(props);
    }

    handleImageChange=(event)=> {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        if (file && file.type.match('image.*')){
            reader.readAsDataURL(file);
            this.fileInput.value='';
        }
        //this method gets triggered when file reader is done reading the file..
        reader.onloadend = () => {
            //update() is immutable way to update the state
            //https://reactjs.org/docs/update.html
            this.props.appendImageToArray({file: file, imagePreviewUrl: reader.result})
        };
    };

    handleUploadChange=()=>{
        this.fileInput.click();
    };

    render() {
        return (
            <form>
                    <input  style={{display:'None'}}
                            name="images"
                            placeholder="upload image"
                            type="file"
                            onChange={this.handleImageChange}
                            multiple
                            ref={node => this.fileInput=node}/>
            <br/>
                <Button
                    onClick={this.handleUploadChange}
                    icon='upload'
                    content='Upload Images' />
            </form>
        );
    }
}

export default FileInput;