import React, { Component } from 'react'
import { FaHiking, FaShuttleVan,FaBeer,FaCocktail } from 'react-icons/fa'
import Title from "./Title"
export default class Services extends Component {
state={
    services:[{
        icon:<FaCocktail/>,
        title:"Free Cocktails",
        info:"A whole family of Collins cocktails exists—JohnA whole family of Collins cocktails"
         
        
},
{
     icon:<FaHiking/>,
     title:"Endless Hiking",
     info:"A whole family of Collins cocktails exists—John A whole family of Collins cocktails exists—John, Ron, Michael"},

{
    icon: <FaShuttleVan/>,
    title:"Free Shuttle",
    info:"Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs"

},
{
     icon:<FaBeer/>,
     title:"Strong Beer",
     info:"Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs"
}]};

    render() {
        return (
            <section className="services" >
              <Title title="services"/>
              <div className="services-center">
              {this.state.services.map((item,index) =>{
                  return( <article key={index} className="service">
                  <span>{item.icon}</span>
                  <h6>{item.title}</h6>
                  <p>{item.info}</p>
                  </article>
              );
              }
                )}
              </div>
            </section>
        )

    }
}
