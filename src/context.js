import { findAllByAltText } from '@testing-library/react'
import React, { Component } from 'react'
//import items from "./data"
import Client from './Contentful'


const RoomContext=React.createContext()

 class RoomProvider extends Component {
    state={
     rooms:[],
     sortedRooms:[],
     featuredrooms:[],
     loading:true,
     type:"all",
     capacity:1,
     price:0,
     minprice:0,
     maxprice:0,
     minsize:0,
     maxsize:0,
     breakfast:false,
     pets:false
    }
    //get data
getData=async()=>{
    try{
        let response= await Client.getEntries({
            content_type:"beachResortRoom"
        });
        let rooms=this.formatData(response.items)
        let featuredrooms=rooms.filter(room=>room.featured===true)
        let maxprice=Math.max(...rooms.map(item=>item.price))
        let maxsize=Math.max(...rooms.map(item=>item.size))
        this.setState({
            rooms,featuredrooms,sortedRooms:rooms,loading:false,price:maxprice,maxprice,maxsize});
    }catch(error){
        console.log(error)

    }
}
componentDidMount(){
    this.getData()
}
formatData(items){
    let tempItems=items.map(item=>{
        let id=item.sys.id
        let images=item.fields.images.map(image=>
            image.fields.file.url)
        
        let room={...item.fields,images,id}
        return room
    })
    return tempItems
}
getRoom=(slug)=>{
    let tempRooms=[...this.state.rooms]
    const room=tempRooms.find((room)=>room.slug===slug)
    return room
}
handleChange=event=>{
    const target=event.target
    const value=target.type==="checkbox"?target.checked:target.value
    const name=event.target.name
    this.setState({
        [name]:value
    },this.filterRooms)
    
}
filterRooms=()=>{
    let{
        rooms,type,capacity,price,minSize,maxSize,breakfast,pets
    }=this.state
    let tempRooms=[...rooms]
    capacity=parseInt(capacity)
    price=parseInt(price)
    
    if (type!=="all"){
        tempRooms=tempRooms.filter(room=>room.type===type)
    }

    // filter by capacity
    if (capacity !==1 ){
        tempRooms=tempRooms.filter(room=>room.capacity>=capacity)
    }
    // filter by price
    tempRooms=tempRooms.filter(room=>room.price<=price)
    //filter by size
    tempRooms=tempRooms.filter(room=>room.size>=minSize && room.size<=maxSize)
    //filter by extras
    if(breakfast){
        tempRooms=tempRooms.filter(room=>room.breakfast===true)
    }
      this.setState({
          sortedRooms:tempRooms

      })
}
    render() {

        return (
            <RoomContext.Provider value={{...this.state,getRoom:this.getRoom,handleChange:this.handleChange}}>
                {this.props.children}

            </RoomContext.Provider>

                
            
        )
    }
}
const RoomConsumer=RoomContext.Consumer
export{RoomProvider,RoomConsumer,RoomContext}
