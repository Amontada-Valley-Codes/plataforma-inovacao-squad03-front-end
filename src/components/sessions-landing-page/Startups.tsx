"use client"

import React from "react";
import CardCarousel from "../CardCarousel";
import LogoLoop from "../LogoLoop";

const imageLogos = [
  { src: "https://ninnahub.com.br/wp-content/uploads/2021/11/Startups-residentes1.png", alt: "Startup 1" },
  { src: "https://ninnahub.com.br/wp-content/uploads/2025/09/HealthDev.jpg", alt: "Startup 2" },
  { src: "https://ninnahub.com.br/wp-content/uploads/2025/09/cirurgia-autorizada.jpeg", alt: "Startup 3" },
  { src: "https://test.medflowapp.com/static/media/medflow-logo.e44c58bd4dc0611657dd765b2a10b4e7.svg", alt: "Startup 4" },
  { src: "https://upload.wikimedia.org/wikipedia/pt/9/9e/Logo_beAnalytic.png", alt: "Startup 5" },
  { src: "https://ninnahub.com.br/wp-content/uploads/2025/07/thumbnail_flake2-scaled.png", alt: "Startup 6" },
  { src: "https://ninnahub.com.br/wp-content/uploads/2025/09/starlight-logo-default-1.png", alt: "Startup 7" },
  { src: "https://ninnahub.com.br/wp-content/uploads/2025/09/thumbnail_Logo-Sombank.png", alt: "Startup 8" },
  { src: "https://ninnahub.com.br/wp-content/uploads/2025/07/lovel.dev_.jpg", alt: "Startup 9" },
  { src: "https://ninnahub.com.br/wp-content/uploads/2025/07/iDun.png", alt: "Startup 10" },
  { src: "https://ninnahub.com.br/wp-content/uploads/2025/07/WhatsApp-Image-2022-12-12-at-11.23.56.jpeg", alt: "Startup 11" },
  { src: "https://ninnahub.com.br/wp-content/uploads/2025/07/Resolvvi.jpg", alt: "Startup 12" },
  { src: "https://ninnahub.com.br/wp-content/uploads/2025/07/urbis.png", alt: "Startup 13" },
  { src: "https://www.pliq.io/wp-content/uploads/2025/01/pliq_play_fundo_branco_site.png", alt: "Startup 14" },
  { src: "https://entrar.trilogo.app/assets/tr-logo@2x.4e763489.png", alt: "Startup 15" },
  { src: "https://inhousemarket.com.br/wp-content/uploads/2020/06/Logo-size-Inhouse-Market-1-e1590985559351.png", alt: "Startup 16" },
  { src: "https://ninnahub.com.br/wp-content/uploads/2021/11/Startups-residentes6.png", alt: "Startup 17" },
];

export default function Startups() {
  return (
    <div
  id="startups"
  className="w-full bg-[url('/Startups.png')] bg-cover bg-center py-8 md:py-12 lg:py-16 overflow-hidden"
>
  <h1 className="text-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-semibold mb-4 md:mb-6 pb-7">
    Nossas conexões <br />
    geram <span className="text-green">impacto</span>
  </h1>

  <div className="overflow-hidden w-full">
    <LogoLoop
      logos={imageLogos.map(({ src, alt }, index) => ({
        node: (
          <div
            key={index}
            className="flex items-center justify-center w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px]"
          >
            <CardCarousel src={src} alt={alt} />
          </div>
        ),
      }))}
      speed={90}
      direction="left"
      pauseOnHover={false}
      scaleOnHover={false}
      fadeOut={false}
      ariaLabel="Startups residentes"
    />
  </div>
</div>

  );
}
