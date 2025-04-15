import { ArrowRightOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';
import { RightOutlined } from '@ant-design/icons';
import { Carousel } from "antd";
const LandingPage = () => {
    return (
      <div className="bg-[url('/img/homepage-hero-kids.jpg')] bg-cover w-full h-screen
                      flex justify-center items-center ">  
       
        <div className="hc Left">
            <LeftOutlined/>
        </div>
        
        <div className="w-[200px]  text-white div-layout"   >
          <div className="flex flex-col justify-center items-center p-3">
            <img src="/img/squiggly-line-png.png" alt="squiggly line " 
                  className="w-[150px] h-[50px] object-contain mb-1.5 "/>
            <h2 className="mb-1.5">For Kid</h2>
            <p className="mb-1.5">All about how the body works, homework help, and more-just for kids</p>
            <a href="" className='flex items-center gap-2 text-black' >
              <p className='text-white  '>Kid Site</p>
              <ArrowRightOutlined className="text-white text-2xl ml-1.5 link-icon-move" />
            </a>
          </div>
          
          
        </div>
        
        <div>
            <RightOutlined/>
        </div>
        <ul>

        </ul>  
        
      </div>
    );
  };
  
  export default LandingPage;