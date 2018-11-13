import React,{Component} from 'react'
import  './Grid.css'
import axios from 'axios';
import Multimap from 'multimap';
import DisplayItems from './displayItems';

const categories =   {
    "_id": "5be7f9d768e6065f38baf1b4",
    "Fruits": ["5be7f9d768e6065f38baf1b3","5be73b1c07141e5dd090aba9","5be7427c07141e5dd090abad","5be7426807141e5dd090abac","5be7428707141e5dd090abae","5be7428e07141e5dd090abaf",
    "5be7429b07141e5dd090abb0","5be742a807141e5dd090abb1"],
    "Vegetables": ["5be768f707141e5dd090abb5","5be7416107141e5dd090abab"],
    "HomeCooked": [],
    "GreenWaste": ["5be7fcb5041a938e746e75ba"],
    "Other": ["5be76e9507141e5dd090abb6","5be74a3907141e5dd090abb2","5be7687707141e5dd090abb3","5be768ac07141e5dd090abb4","5be76e9507141e5dd090abb6",
    ],
    "__v": 0
};

class RenderGridElements extends Component {

    constructor(props) {
        super(props);
        this.deepClone= this.deepClone.bind(this);
        this.state = {
            isLoading: false,
            data:[],
            filters:false,
            location:false,
            categories:''
        }
    };

    componentDidMount(){
        // fetching remote posts from backend
        axios.get('http://localhost:3001/posts/').
        then(res=>{
            //whenever location is changed, fetch catgories result also - not imp,emented yet
            console.log(res);
            let result = this.multiMapCollection(res.data);
            this.setState({data:res.data, categories: categories, sortedByIdCollection:result[0], sortedByLocationCollection :result[1],safe_sortByIdCollection:result[2]});
        }).catch();
        console.log('[gridLayout.js ComponentDidMount]');
    }

    componentDidUpdate(prevProps, prevState, snapsShot){
        console.log(this.state);
        if(prevProps.reset !== this.props.reset && this.props.location === ''){
            console.log('reset');
            //reset the marketplace
            axios.get('http://localhost:3001/posts/').
            then(res=>{
                //need to fetch catgories result here also
                console.log(res);
                this.setState({data:res.data,categories:categories,location:false})
                }).catch();
            return;
        }
        if(prevProps.location !== this.props.location){
            console.log('location props are not same');
            axios.get('http://localhost:3001/posts/').
            then(res=>{
                //whenever location is changed, fetch categories result also - not implemented - need endpoint here
                console.log(res);
                // if(this.props.location === ''){ //if location props has been reset by clicking on marketplace click handler
                //     console.log('location empty');
                //     this.setState({data:res.data,categories:categories,location:false});
                // }
                //location is selected by user, hence need to sort the posts by sortByLocation()
                    this.setState({data:res.data,categories:categories,location:true},()=>this.sortByLocation());

            }).catch((err)=>console.log(err));
        }
        if(prevProps.filterState !== this.props.filterState){ // if filters are changed by user, initially all categories post are shown to user
            console.log('filters applied');
            this.applyFilters(prevProps);
        }
    }

    shouldComponentUpdate(){
        console.log('[gridLayout.js shouldComponentUpdate]');
        return true;
    }

    //filters
    applyFilters=(prevProps)=>{
        let keys = Object.keys(this.props.filterState); // return arrays of keys
        console.log(keys);
        let new_entries = new Map();
        let delete_entries = []; // need ids of posts not be rendered
        keys.map((key)=>{
            console.log('inside map');
            if(this.props.filterState[key] && !prevProps.filterState[key]){ // check if any category 's flag is set true && check it is not same as it was in old state
                // hence we need to add to grid data
                if(this.props.location !== ''){ //check if location has been turned on by user
                    console.log('location turned on , filters on - adding entries');
                    console.log(key);
                    new_entries = this.filterOffLocation(key,new_entries);
                }
                else{
                    console.log('location turned off, filters turned on - adding entries');
                    console.log(key);
                    this.state.categories[key].map((post_id)=>{
                        // since this.state.sortedByIdCollection is changed in setState when user apply filters
                        //in order to add back the categories entries to display, we need to access the previous posts which were deleted from display or this.sortedByIdCollection
                        // hence this.state.safe_sorted... saves all the posts globally , hence we can access any post using postID
                        let post_entry = this.state.safe_sortByIdCollection.get(post_id);
                        if(post_entry){
                            new_entries.set(post_id,post_entry);
                        }
                    })
                }
            }
            else if(!this.props.filterState[key] && prevProps.filterState[key]){ // if any category is set false  && check it is not same as it was in old state
                //delete the categories from result
                console.log('deleteing entries');
                    console.log(key);
                   this.applyCategoryFilter(key,delete_entries);
                }
        });
        console.log('applying filters');
        console.log(new_entries);
        console.log(delete_entries);
        this.stateChangeByFiltersOff(new_entries);
        this.stateChangeByFiltersOn(delete_entries);
    };

    filterOffLocation=(key,new_entries)=>{
        // if location is turned on, filter is turned off i.e a category needs to be result, hence push new_entries to result

        let location_post_entries = this.state.sortedByLocationCollection.get(this.props.location.id); // return array of posts or undefined
        if(location_post_entries){ // if location has posts...
            this.state.categories[key].map((post_id)=>{
                let post_entry=location_post_entries.find((each_entry)=>{
                    return each_entry._id === post_id ; // will return matching post or undefined////
                });

                if(post_entry){
                    // append the post_entry and post_id to result...
                    new_entries.set(post_id,post_entry);
                }
            })
        }
        return new_entries;
    };

    applyFilterOnLocation=()=> {
        //checks if any filter is on i.e. if any category needs to be removed from the result
        // applies filters on location if user has turned off any category i.e remove entries
        let keys = Object.keys(this.props.filterState); // return arrays of keys
        let delete_entries = []; // need ids of posts not be rendered
        keys.map((key)=>{
            if(!this.props.filterState[key] ){ // if any category is set false , apply that filter on location
                //delete the categories from result
                {
                    console.log(' applying filters on location by deleteing entries');
                    console.log(key);
                    this.applyCategoryFilter(key,delete_entries);
                }

            }
        });
        console.log('applying fiters on location');
        console.log(delete_entries);
        this.stateChangeByFiltersOn(delete_entries);

    };

    stateChangeByFiltersOn=(delete_entries)=>{
        //if filters are applied, then apply those changes on the state to re-render the posts on screen as per filters
        if(delete_entries.length > 0){
            let new_sortedByIdCollection = this.deleteEntriesFromSortedByIdCollection(delete_entries);
            let new_data = this.getArrayFromMap(new_sortedByIdCollection);
            console.log('new deleted data');
            console.log(new_data);
            let result_data = this.convert2DArrayto1D(new_data);
            console.log(result_data);
            this.setState((updatedState)=>{
                return{...updatedState,filters:true,data:result_data.length>0 ? result_data : new_data,sortedByIdCollection:new_sortedByIdCollection}
            });
        }
    };

    stateChangeByFiltersOff=(new_entries)=>{
        if(new_entries.size>0){ // new entries need to be added to render screen
            let new_sortedIdByCollection = this.pushNewEntries(new_entries);
            let new_data = this.getArrayFromMap(new_entries);
            console.log('new data');
            console.log(new_data);
            let result_data= this.convert2DArrayto1D(new_data);
            result_data.push(...this.state.data);
            console.log(result_data);
            this.setState((updatedState)=>{
                return{...updatedState,filters:true,data:result_data,sortedByIdCollection:new_sortedIdByCollection}
            });
        }
    };

    convert2DArrayto1D=(new_data)=>{
        //somehow multimap saves values in the array/bucket, when we save those values in array in this.state.data which is consumed by displayItems component
        //it becomes 2D array .this function converts  [[{..}],[{..}],[{..}]] ---> [{},{},{},{}]
        // i am not able to figure out exactly why this is happening... this can slightly hit performance while rendering
        let result_data=[];
        if(new_data.length>0){
            new_data.map((arr)=>{
                if(Array.isArray(arr)){
                    result_data.push(arr[0]);
                }
                else{
                    result_data.push(arr);
                }
            });
        }
        return result_data;
    };

    applyCategoryFilter=(key,delete_entries)=>{
        //if filter is turned on i.e. category is turned off, then delete those categories posts
        // remember applied filter means user has turned off a category, otherwise filters are off or at initial state.
        if(this.state.sortedByIdCollection){
            this.state.categories[key].map((post_id)=>{
                let post_entry = this.state.sortedByIdCollection.get(post_id); // return entry value or undefined
                if(post_entry){
                    // append the post_id to result in delete entries...
                    delete_entries.push(post_id);
                }
            })
        }
    };

    getArrayFromMap=(map)=>{
        let arr=[];
        let map_values_iterator = map.values();
        for(let i=0 ; i<map.size ;i++){
            arr.push(map_values_iterator.next().value)
        }
        return arr;
    };

     deepClone( obj ) {
        if( !obj || true == obj ) //this also handles boolean as true and false
            return obj;
        var objType = typeof( obj );
        if( "number" == objType || "string" == objType ) // add your immutables here
            return obj;
        var result = Array.isArray( obj ) ? [] : !obj.constructor ? {} : new obj.constructor();
        if( obj instanceof Map )
            for( var key of obj.keys() )
                result.set( key, this.deepClone( obj.get( key ) ) );
        for( var key in obj )
            if( obj.hasOwnProperty( key ) )
                result[key] = this.deepClone( obj[ key ] );
        return result;
    }

    deleteEntriesFromSortedByIdCollection=(ids)=>{
        let copy_sortedByIdCollection = this.deepClone(this.state.sortedByIdCollection); // not optimal for performance - need to rethink the logic to avoid deep copy
            ids.map((id)=>{
            copy_sortedByIdCollection.delete(id);
        });
        return copy_sortedByIdCollection;
    };

    pushNewEntries=(map)=>{
        let copy_sortedByIdCollection = this.deepClone(this.state.sortedByIdCollection); //not optimal for performance - need to rethink the logic to avoid deep copy
        map.forEach(function (value,key) {
           copy_sortedByIdCollection.set(key,value);
        });
        return copy_sortedByIdCollection;
    };

    multiMapCollection=(data)=>{
        //saving multimap of posts using _id as key and multimap of same posts using location id as key
        //immutable_sortById is same as sortedById, but it will be safe to use as it will never be mutated or changed in any setState call..
        let sortedById = new Multimap();
        let sortByLocation = new Multimap();
        let immutable_sortById = new Multimap();
        data.map((item)=>{
            sortedById.set(item._id,item);
            sortByLocation.set(item.location.id,item);
            immutable_sortById.set(item._id,item);
        }) ;
        let temp_arr = [];
        temp_arr.push(sortedById);
        temp_arr.push(sortByLocation);
        temp_arr.push(immutable_sortById);
        return temp_arr;
    };

    ArrayToMultimap=(data)=>{
        let multimap = new Multimap();
        data.map((item)=>{
            multimap.set(item._id,item);
        }) ;
        return multimap;
    };

    sortByLocation=()=>{
        console.log("sorting by location");
        let itemsCollectionByLocation = this.state.sortedByLocationCollection.get(this.props.location.id); //return array or undefined
        if(itemsCollectionByLocation){ // if items are posted at specific location
            let new_sortedByIDCollection = this.ArrayToMultimap(itemsCollectionByLocation);
            this.setState({data: itemsCollectionByLocation,sortedByIdCollection: new_sortedByIDCollection},()=>this.applyFilterOnLocation());
        }
        else { // there are no items posted in the searched location, hence display nothing
            this.setState((updatedState)=> {

                return({data:[],sortedByIdCollection: updatedState.sortedByIdCollection ? updatedState.sortedByIdCollection.clear(): updatedState.sortedByIdCollection})
                //sortedByIdCollection will be undefined since there are no posts in the selected location
            });//end setstate

        }
    };

    render() {
        console.log('[RenderGridElements.js render method]');
        return(
            <>
                { <p  className='foodTextCategory'>{this.props.category}</p>}
                    { <DisplayItems data={this.state.data}/>}
            </>
        );
    }
}

export default RenderGridElements;