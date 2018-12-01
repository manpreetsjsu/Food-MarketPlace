import React,{Component} from 'react';
import HeaderBar from "../stateless_components/HeaderBar/HeaderBar";
import SideBar from "../stateless_components/sideBar/SideBar";
import GridContainer from "../stateless_components/Grid/GridLayout";
import {Loader} from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";
import UserProfilePosts from "../stateless_components/UserProfile/userProfile";
import {set_loading_status} from "../Redux/actions/marketPlaceAction";

class UserProfile extends Component{

    render(){
        console.log(this.props);
        return(
            <>
                <HeaderBar {...this.props}/>
                <SideBar {...this.props}/>
                <GridContainer >
                    <UserProfilePosts set_loading_status={this.props.set_loading_status}
                                      reloadMemberPosts={this.props.accountLoginReloadMemberPosts}/>
                </GridContainer>
                {this.props.marketPlaceIsLoading && <Loader size='large' active/>}
            </>
        )
    }

};


const mapStateToProps = (state) => {
    return {
        accountLoginReloadMemberPosts: state.accountLogin.reloadMemberPosts,
        marketPlaceIsLoading:state.marketPlace.isLoading,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        set_loading_status: (flag) => {
            dispatch(set_loading_status(flag))
        },

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);