import Categories from "./Categories"
import Navbar from "./Navbar"
import Navbox from "./Navbox"
import Slides from "./Slides"
import TopProducts from "./TopProducts"
import Offer from "./Offer"
import Footer from "./Footer"



function Home() {
 
  return (
    <div className='text-black bg-black'>
      <Navbar />  
       <Slides />
       <Navbox />
       <Categories />
       <TopProducts/>
       <Offer />
       <Footer />
      
    </div>
  )
}

export default Home