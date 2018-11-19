import React,{Suspense} from 'react';
import {Grid,Placeholder } from 'semantic-ui-react';
const ItemCard = React.lazy(()=>import('../feed_post/Card_MaterialUI'));

const CustomLoader = ()=>{
    return <>
        <Placeholder>
            <Placeholder.Image rectangular/>
            <Placeholder.Line length='full' />
            <Placeholder.Line length='full' />
            <Placeholder.Line length='full' />
        </Placeholder>
        </>
};
const gridColumn = (props)=>{
    return(
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <Suspense fallback={<CustomLoader/>}>
                { !props.isLoading && <ItemCard click={()=>{}}/>}
            </Suspense>
        </Grid.Column>
    )
};

export default gridColumn;