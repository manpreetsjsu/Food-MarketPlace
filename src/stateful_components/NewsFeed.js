import React from 'react';
import HeaderBar from "../stateless_components/HeaderBar/HeaderBar";
import SideBar from "../stateless_components/sideBar/SideBar";
import NewsFeed from "../stateless_components/NewsFeed/NewsFeed";

const Notifications=(props)=>{
    return(
        <>
                <HeaderBar {...props} />
                <SideBar {...props}/>
                <NewsFeed/>
        </>
    )
};

export default Notifications;