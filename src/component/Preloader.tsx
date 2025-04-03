'use client'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Preloader() {
    const loadingScreenRef = useRef(null);
    const loaderRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".loader", {
          height: 0,
          duration: 0.7,
          ease: "power4.inOut"
        }).to(".loader", {
          width: "300px",
          duration: 0.2,
          ease: "power4.inOut"
        })

        tl.from(".loader-1", {
          width: 0,
          duration: 4,
          ease: "power1.inOut"
        }).to(".loader", {
          background: "none",
          duration: 0.1
        }).to(".loader-1", {
            rotate: 125,
            duration: 0.5
        })
        .to(".loader", {
            scale: 120,
            duration: 1,
            ease: "power2.inOut"
        })     
        .to(loadingScreenRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut"
        });   
    }, { scope: loadingScreenRef });

    return (
        <div ref={loadingScreenRef} className=" loading-screen fixed bg-black flex  items-center justify-center top-0 left-0 w-full h-full text-white pointer-events-none z-[1000]">
            <div ref={loaderRef} className="loader absolute w-[300px] h-[40px] bg-gray-700">
                <div className="loader-1 relative bg-white w-[300px] h-[40px]"></div>
            </div>
        </div>
    );
}
