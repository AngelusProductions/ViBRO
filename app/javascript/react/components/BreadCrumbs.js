import React from 'react'

const BreadCrumbs = ( props => {
 return(
   <nav role="navigation">
     <ul className="breadcrumbs">
       <li><i className="far fa-arrow-alt-circle-left"></i></li>
       <li><a href="#">Home</a></li>
     </ul>
   </nav>
 )
})

export default BreadCrumbs
