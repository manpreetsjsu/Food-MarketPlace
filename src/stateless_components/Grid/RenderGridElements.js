import React,{Component} from 'react'
import  './Grid.css'
import axios from 'axios';
import Multimap from 'multimap';
import DisplayItems from './displayItems';
import update from "react-addons-update";

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
        if(prevProps.location !== this.props.location){
            console.log('location props not same');
            axios.get('http://localhost:3001/posts/').
            then(res=>{
                //whenever location is changed, fetch categories result also - not implemented

                if(this.props.location === ''){
                    this.setState({data:res.data,categories:categories,location:false});
                }
                else{
                    this.setState({data:res.data,categories:categories,location:true},()=>this.sortByLocation());
                }
            })
                .catch();


        }
        if(prevProps.filterState !== this.props.filterState){
            console.log('filters applied');
            let prevFilters = prevProps;
            this.applyFilters(prevFilters);
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
            if(this.props.filterState[key] && !prevProps.filterState[key]){ // check if any category 's flag is set true && check not same as on old state
                // add to grid data
                if(this.props.location !== ''){
                    console.log('location turned on , filters on - adding entries');
                    console.log(key);
                    let location_post_entris = this.state.sortedByLocationCollection.get(this.props.location.id);
                    console.log(location_post_entris);
                    this.state.categories[key].map((post_id)=>{
                            let post_entry=location_post_entris.find((each_entry)=>{
                            return each_entry._id === post_id ; // will return post or undefined////
                             });

                        if(post_entry){
                            // append the post_entry and post_id to result...
                            new_entries.set(post_id,post_entry);
                        }
                    })
                }
                else{
                    console.log('location turned off, filters turned on - adding entries');
                    console.log(key);
                    console.log(this.state.sortedByIdCollection);
                    this.state.categories[key].map((post_id)=>{
                        let post_entry = this.state.safe_sortByIdCollection.get(post_id);
                        if(post_entry === undefined){console.log('undefined value')}
                            new_entries.set(post_id,post_entry);

                    })
                }
            }
            else if(!this.props.filterState[key] && prevProps.filterState[key]){ // if any category is set false  && check not same as on old state
                //delete the categories from result
                {
                    console.log('deleteing entries');
                    console.log(key);
                    this.state.categories[key].map((post_id)=>{
                        let post_entry = this.state.sortedByIdCollection.get(post_id); // return entry value or undefined
                        if(post_entry){
                            // append the post_id to result in delete entries...
                            delete_entries.push(post_id);
                        }
                    })
                }

            }
        });
        console.log('final');
        console.log(new_entries);
        console.log(delete_entries);
        if(new_entries.size>0){ // new entries need to be added to render screen
            let new_sortedIdByCollection = this.pushNewEntries(new_entries);
            let new_data = this.getArrayFromMap(new_entries);
            console.log('new data');
            console.log(new_data);
            let result_data=[];
            // new_data.map((arr)=>{
            //     result_data.push(arr[0]);
            // });
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
            result_data.push(...this.state.data);
            console.log(result_data);
            this.setState((updatedState)=>{
                return{...updatedState,filters:true,data:result_data,sortedByIdCollection:new_sortedIdByCollection}
        });
        }
        else if(delete_entries.length > 0){
            let new_sortedByIdCollection = this.deleteEntries(delete_entries);
            let new_data = this.getArrayFromMap(new_sortedByIdCollection);
            console.log('new deleted data');
            console.log(new_data);
            let result_data =[];
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
            console.log(result_data);
            console.log(this.state.sortedByIdCollection);
            this.setState((updatedState)=>{
                return{...updatedState,filters:true,data:result_data.length>0 ? result_data : new_data,sortedByIdCollection:new_sortedByIdCollection}
            });
        }
    };

    genericFilter=()=> {
        let keys = Object.keys(this.props.filterState); // return arrays of keys
        console.log(keys);
        let new_entries = new Map();
        let delete_entries = []; // need ids of posts not be rendered

        keys.map((key)=>{
            // if(this.props.filterState[key] ){ // check if any category 's flag is set true
            //     // add to grid data
            //     if(this.props.location !== ''){
            //         console.log('location turned on , filters on - adding entries');
            //         console.log(key);
            //         this.state.categories[key].map((post_id)=>{
            //             let post_entry = this.state.sortedByLocationCollection.get(this.props.location.id).find((each_entry)=>{
            //                 return each_entry._id === post_id ; // will return post or undefined////
            //             });
            //             if(post_entry){
            //                 // append the post_entry and post_id to result...
            //                 new_entries.set(post_id,post_entry);
            //             }
            //         })
            //     }
            // }
            if(!this.props.filterState[key] ){ // if any category is set false
                //delete the categories from result
                {
                    console.log('deleteing entries');
                    console.log(key);
                    this.state.categories[key].map((post_id)=>{
                        let post_entry = this.state.sortedByIdCollection.get(post_id); // return entry value or undefined
                        if(post_entry){
                            // append the post_id to result in delete entries...
                            delete_entries.push(post_id);
                        }
                    })
                }

            }
        })

        console.log('generic final');
        console.log(new_entries);
        console.log(delete_entries);
        // if(new_entries.size>0){ // new entries need to be added to render screen
        //     let new_sortedIdByCollection = this.pushNewEntries(new_entries);
        //     let new_data = this.getArrayFromMap(new_entries);
        //     console.log('new data');
        //     console.log(new_data);
        //     let result_data=[];
        //     new_data.map((arr)=>{
        //         result_data.push(arr[0]);
        //     });
        //     result_data.push(...this.state.data);
        //     console.log(new_data);
        //     this.setState((updatedState)=>{
        //         return{...updatedState,filters:true,data:result_data,sortedByIdCollection:new_sortedIdByCollection}
        //     });
        // }
        if(delete_entries.length > 0){
            let new_sortedByIdCollection = this.deleteEntries(delete_entries);
            let new_data = this.getArrayFromMap(new_sortedByIdCollection);
            console.log('new deleted data');
            console.log(new_data);
            let result_data =[];
            if(new_data.length>0){
                if(Array.isArray(new_data[0])){
                    new_data.map((arr)=>{
                        result_data.push(arr[0]);
                    });
                }
            }
            console.log(result_data);
            console.log(this.state.sortedByIdCollection);
            this.setState((updatedState)=>{
                return{...updatedState,filters:true,data:result_data.length>0 ? result_data : new_data,sortedByIdCollection:new_sortedByIdCollection}
            });
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

    deleteEntries=(ids)=>{
        let copy_sortedByIdCollection = this.deepClone(this.state.sortedByIdCollection);
            ids.map((id)=>{
            copy_sortedByIdCollection.delete(id);
        });
            console.log(this.state.sortedByIdCollection);
        return copy_sortedByIdCollection;
    };

    pushNewEntries=(map)=>{
        let copy_sortedByIdCollection = this.deepClone(this.state.sortedByIdCollection);
        map.forEach(function (value,key) {
           copy_sortedByIdCollection.set(key,value);
        });
        return copy_sortedByIdCollection;
    };

    multiMapCollection=(data)=>{
        //saving multimap of posts using _id as key and multimap of same posts using location id as key
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

    convertToMultimap=(data)=>{
        let multimap = new Multimap();
        data.map((item)=>{
            multimap.set(item._id,item);
        }) ;
        return multimap;
    };

    sortByLocation=()=>{
        console.log("sorting by location");
        let itemsCollectionByLocation = this.state.sortedByLocationCollection.get(this.props.location.id); //return array
        let new_sortedByIDCollection = this.convertToMultimap(itemsCollectionByLocation);
        if(itemsCollectionByLocation !== undefined){ // returns undefined if no key in map...
            this.setState({data: itemsCollectionByLocation,sortedByIdCollection: new_sortedByIDCollection},()=>this.genericFilter());
        }
        else{
            this.setState({data:[],gridData:[]});
        }

    };

    render() {
        console.log('render of Grid layout');

        return(
            <>
                { <p  className='foodTextCategory'>{this.props.category}</p>}
                    { <DisplayItems data={this.state.data}/>}
            </>
        );
    }


}

export default RenderGridElements;