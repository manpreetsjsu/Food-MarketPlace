import React,{Component} from 'react';
import './previewImage.css';

class ImageWithCloseIcon extends Component{

    constructor(props){
        console.log("constructor of previewImages");
        super(props);
    }

    clickCloseIconHandler=(event)=>{
        this.props.deleteUploadedImage(event.target.id);

    };

    shouldComponentUpdate(nextProps,nextState){
        console.log('[previewImage.js] shouldComponentUpdate')
        return nextProps.images !== this.props.images ;
    }

    componentDidMount(){
        console.log('[previewImage.js] componentDidMount')
    }

    componentDidUpdate(prevProps){
        console.log('[previewImage.js] componentDidUpdate')
    }

    componentWillUnmount(){
        console.log('[previewImage.js] componentDidMount')
    }

    render(){
        return(
            this.props.images.map((img,index)=>{
                return(
                    <div className='imgPreviewParent'>
                        <img className='imgPreview' id={index} key={index} src={img.imagePreviewUrl} width="150px" height="150px" alt=""/>
                        <a id={index} onClick={this.clickCloseIconHandler} href="#" className="close-thik closeIcon"/>
                    </div>
                )
            })

        )
    };

}


export default ImageWithCloseIcon;