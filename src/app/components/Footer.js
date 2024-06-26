import PopupComponent from "./PopupComponent";
import logo from '../../../public/Images/Misc/logo.png';
import {  Typography } from "@material-tailwind/react";
import Image from "next/image";

const Footer = () => {
  
    return (
    <div>
      <div className="lg:hidden">
        <div className="mx-auto max-w-screen-2xl flex items-center justify-center border-t border-blue-gray-50 py-4 gap-2">
            <Typography as="a" href="https://www.instagram.com/shopthe_line/" target="_blank" rel="noopener noreferrer" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography as="a" href="https://twitter.com/shopthe_line/" target="_blank" rel="noopener noreferrer" className="opacity-80 transition-opacity hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg"  className="h-5 w-5" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M 4.0175781 4 L 13.091797 17.609375 L 4.3359375 28 L 6.9511719 28 L 14.246094 19.34375 L 20.017578 28 L 20.552734 28 L 28.015625 28 L 18.712891 14.042969 L 27.175781 4 L 24.560547 4 L 17.558594 12.310547 L 12.017578 4 L 4.0175781 4 z M 7.7558594 6 L 10.947266 6 L 24.279297 26 L 21.087891 26 L 7.7558594 6 z"/></svg>
            </Typography>
        </div>
        <div className="mx-auto max-w-screen-2xl flex items-center justify-center gap-8 mb-4">

          <div>
            <PopupComponent type="instructions" text="text-blue-500 text-sm cursor-pointer"></PopupComponent>
          </div>
          <div>
            <a href="mailto:team@shopthe-line.com">
            <span className="text-blue-500 text-sm">Contact Us</span></a>
          </div>
          <div>
            <PopupComponent type="sportsbook-list" text="text-blue-500 text-sm cursor-pointer"></PopupComponent>
          </div>
          
        </div>
        <div className="mx-auto max-w-screen-2xl flex items-center justify-center gap-8 mb-4">
            <div>
              <span className="text-sm">Icons by <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">
              <span className="text-blue-500 text-sm">Icons8</span> </a></span>
              
            </div>
            <div>
              <span className="text-sm">Powered by <a target="_blank" rel="noopener noreferrer" href="https://the-odds-api.com/">
              <span className="text-blue-500 text-sm">The Odds API</span></a></span>
            </div>
        </div>
        <div className="mx-auto max-w-screen-2xl flex items-center justify-center gap-8 mb-4">
            <div>
              <PopupComponent type="terms" text="text-gray-500 text-sm cursor-pointer"></PopupComponent> 
            </div>
            <div>
              <span className="text-gray-500 text-sm">|</span>
            </div>
            <div>
              <PopupComponent type="privacy" text="text-gray-500 text-sm cursor-pointer"></PopupComponent>
            </div>
        </div>
        <div className="mx-auto max-w-screen-2xl flex items-center justify-center gap-8 mb-8">
          <Image className="opacity-70" src={logo} alt={"Shop the Line"} />
        </div>
      </div>
      <div className="hidden lg:grid mx-auto max-w-screen-2xl border-t border-blue-gray-50 grid grid-cols-3">
        <div className="text-left py-4 ml-8">
          <Image className="opacity-70" src={logo} alt={"Shop the Line"} />
        </div>
        <div>
          <div className="mx-auto flex items-center justify-center py-4 gap-8">
            <div>
              <PopupComponent type="instructions" text="text-blue-500 text-sm cursor-pointer"></PopupComponent>
            </div>
            <div>
              <a href="mailto:team@shopthe-line.com">
              <span className="text-blue-500 text-sm">Contact Us</span></a>
            </div>
            <div>
              <PopupComponent type="sportsbook-list" text="text-blue-500 text-sm cursor-pointer"></PopupComponent>
            </div>
            
          </div>
          <div className="mx-auto flex items-center justify-center gap-8">
              <div>
                <span className="text-sm">Icons by <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">
                <span className="text-blue-500 text-sm">Icons8</span> </a></span>
                
              </div>
              <div>
                <span className="text-sm">Powered by <a target="_blank" rel="noopener noreferrer" href="https://the-odds-api.com/">
                <span className="text-blue-500 text-sm">The Odds API</span></a></span>
              </div>
          </div>
          <div className="mx-auto flex items-center justify-center py-4 gap-2">
              <Typography as="a" href="https://www.instagram.com/shopthe_line/" target="_blank" rel="noopener noreferrer" className="opacity-80 transition-opacity hover:opacity-100">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                </svg>
              </Typography>
              <Typography as="a" href="https://twitter.com/shopthe_line/" target="_blank" rel="noopener noreferrer" className="opacity-80 transition-opacity hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg"  className="h-5 w-5" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M 4.0175781 4 L 13.091797 17.609375 L 4.3359375 28 L 6.9511719 28 L 14.246094 19.34375 L 20.017578 28 L 20.552734 28 L 28.015625 28 L 18.712891 14.042969 L 27.175781 4 L 24.560547 4 L 17.558594 12.310547 L 12.017578 4 L 4.0175781 4 z M 7.7558594 6 L 10.947266 6 L 24.279297 26 L 21.087891 26 L 7.7558594 6 z"/></svg>
              </Typography>
          </div>
        </div>
        <div className="text-right mr-8">
            <div className="py-4">
              <PopupComponent type="terms" text="text-gray-500 text-sm cursor-pointer"></PopupComponent> 
            </div>
            <div>
              <PopupComponent type="privacy" text="text-gray-500 text-sm cursor-pointer"></PopupComponent>
            </div>
        </div>
      </div> 
      <div className="hidden md:grid mx-auto flex items-center justify-center text-center max-w-screen-md mb-4">
        <span className="text-gray-500 text-sm">Ages 21+. This site is for entertainment and informational purposes only, and no real money betting is involved. If you or someone you know has a gambling problem, please call 1-800-GAMBLER for help</span>
      </div>
      <div className="md:hidden mx-auto flex items-center justify-center text-center max-w-xs mb-4">
        <span className="text-gray-500 text-sm">Ages 21+. This site is for entertainment and informational purposes only, and no real money betting is involved. If you or someone you know has a gambling problem, please call 1-800-GAMBLER for help</span>
      </div>
    </div>);
  };
  
  export default Footer;