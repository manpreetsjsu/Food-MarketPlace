import React,{Component} from 'react';
import {Icon} from 'semantic-ui-react';
import withClassHoc from '../../HOC/classfulHOC';
import './previewImage.css';
import update from 'react-addons-update';

class ImageWithCloseIcon extends Component{

    constructor(props){
        console.log("constructor of previewImages");
        super(props);
        this.state= {
         images: [],
         hoveredImageIndex: ''
        }
    }

    handleMouseOver=(event)=>{
        console.log('current index of image' + event.target.id);
        this.id = event.target.id
        this.setState(()=> {
            return {hoveredImageIndex:this.id }
            }
         )
    };

    clickCloseIconHandler=()=>{
        // this.setState({
        //     images: update(this.state.images, {$splice: [[this.state.hoveredImageIndex,1]]}),
        //     hoveredImageIndex:''
        //
        // })
        console.log('close Handler');
        this.setState((prevState)=>{
            return{
                images: prevState.images.splice(prevState.hoveredImageIndex,1),
                hoveredImageIndex:''
            }
        })
    };

    shouldComponentUpdate(nextProps,nextState){
        console.log('[previewImage.js] shouldComponentUpdate')
        return nextState.images.length !== this.state.images.length || nextState.hoveredImageIndex !== this.state.hoveredImageIndex ;
    }

    componentDidMount(){
        console.log('[previewImage.js] componentDidMount')
    }

    static getDerivedStateFromProps(props, state){
        //when user uploads or deletes images, then props changes
        //this lifecycle executes when function gets new props before render()
        //only use when component's inner state depends upon props...
        console.log('[previewImage.js getDerivedStatefromProps]');
        console.log(props);
        console.log(state);
        if(props.images !== state.images ){
            console.log('updating state')
            return{
                images: props.images
            }
        }
        return null;
    }
    componentDidUpdate(prevProps){
        console.log('[previewImage.js] componentDidUpdate')
    }

    componentWillUnmount(){
        console.log('[previewImage.js] componentDidMount')
    }
    render(){
        console.log(this.props);
        console.log(this.state);

        return(
            this.state.images.map((img,index)=>{
               return(
                   <div className='imgPreviewParent'>
                   <img className='imgPreview' onMouseOver={this.handleMouseOver} id={index} key={index} src={img.imagePreviewUrl} width="150px" height="150px" alt=""/>
                   <a onMouseOver={this.handleMouseOver} id={index} onClick={this.clickCloseIconHandler} href="#" className="close-thik closeIcon"/>
                   </div>
               )
            })

        )
    };

}


export default ImageWithCloseIcon;