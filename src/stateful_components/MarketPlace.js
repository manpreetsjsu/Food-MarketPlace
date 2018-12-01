import React,{Component} from 'react';
import HeaderBar from "../stateless_components/HeaderBar/HeaderBar";
import SideBar from "../stateless_components/sideBar/SideBar";
import GridContainer from "../stateless_components/Grid/GridLayout";
import RenderGridElements from "../stateless_components/Grid/RenderGridElements";
import {Loader} from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";

class MarketPlace extends Component{

    render(){
        console.log(this.props);
        return(
            <>
                <HeaderBar {...this.props}/>
                <SideBar {...this.props}/>
                <GridContainer >
                    <RenderGridElements />
                </GridContainer>
                {this.props.marketPlaceIsLoading && <Loader size='large' active/>}
            </>
        )
    }

};


const mapStateToProps = (state) => {
    return {

        marketPlaceIsLoading:state.marketPlace.isLoading,


    };
};

export default connect(mapStateToProps)(MarketPlace);