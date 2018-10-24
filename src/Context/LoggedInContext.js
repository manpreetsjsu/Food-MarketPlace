import React from 'react';

export const LoggedInContext = React.createContext({

    accountLogin:{
        status: false,
        email:'',
        newsFeed: false,
        marketPlace: false
    }
});

