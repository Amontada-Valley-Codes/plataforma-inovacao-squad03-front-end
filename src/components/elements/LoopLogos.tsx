"use client"

import LogoLoop from '../LogoLoop';



export default function LoopLogos() {



    // Alternative with image sources
    const imageLogosCol1 = [
    { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
    { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
    { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
    ];

    const imageLogosCol2 = [
    { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
    { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
    { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
    ];

    return (
        <div style={{ height: '240px', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

            <div className='flex flex-col gap-12'>

                <LogoLoop
                    logos={imageLogosCol1}
                    speed={80}
                    direction="left"
                    logoHeight={50}
                    gap={40}
                    pauseOnHover
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#ffffff"
                    ariaLabel="Technology partners"
                />

                <LogoLoop
                    logos={imageLogosCol2}
                    speed={80}
                    direction="right"
                    logoHeight={50}
                    gap={40}
                    pauseOnHover
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#ffffff"
                    ariaLabel="Technology partners"
                />

            </div>

        </div>
    );

}
