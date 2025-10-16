'use client';

export default function Startups() {
  return (

    // Imagem de Fundo
    <div
      className="w-full bg-[url('/Startups.png')] bg-cover bg-center px-6 pt-18 pb-16 md:pt-18 md:pb-24"
      id="startups">

      {/* Frase */}
      <h1 className="text-center text-4xl text-white font-semibold sm:text-5xl lg:text-6xl">
        Nossas conexões <br /> geram <span className="text-green">impacto</span>
      </h1>

      {/* Carousel de Cards */}
      <div id="carouselExampleControls" className="carousel slide mt-10" data-bs-ride="carousel">
        <div className="carousel-inner flex gap-6 justify-center">

          <div className="carousel-item active">
            <div className="card w-80 h-45 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
              <img className="w-350px h-48 object-cover" src="https://ninnahub.com.br/wp-content/uploads/2021/11/Startups-residentes1.png" alt="Startup 1" />
            </div>
          </div>

          <div className="carousel-item">
            <div className="card w-80 h-45 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
              <img className="w-350px h-48 object-cover" src="https://ninnahub.com.br/wp-content/uploads/2025/09/HealthDev.jpg" alt="Startup 2" />
              
            </div>
          </div>

          <div className="carousel-item">
            <div className="card w-80 h-45 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
              <img className="w-350px h-48 object-cover" src="https://ninnahub.com.br/wp-content/uploads/2025/09/cirurgia-autorizada.jpeg" alt="Startup 3" />
            </div>
          </div>

           <div className="carousel-item">
            <div className="card w-80 h-45 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
              <img className="w-350px h-48 object-cover" src="https://ninnahub.com.br/wp-content/uploads/2025/07/medflow.png" alt="Startup 4" />
            </div>
          </div>
{/* 
          <div className="carousel-item">
            <div className="card w-80 h-45 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
              <img className="w-350px h-48 object-cover" src="https://ninnahub.com.br/wp-content/uploads/2025/09/Logo_Beanalytic_-_Copia-removebg-preview.png" alt="Startup 5" />
            </div>
          </div>

          <div className="carousel-item">
            <div className="card w-80 h-45 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
              <img className="w-350px h-48 object-cover" src="https://ninnahub.com.br/wp-content/uploads/2025/07/thumbnail_flake2-scaled.png" alt="Startup 4" />
            </div>
          </div>

          <div className="carousel-item">
            <div className="card w-80 h-45 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
              <img className="w-350px h-48 object-cover" src="https://ninnahub.com.br/wp-content/uploads/2025/07/medflow.png" alt="Startup 4" />
            </div>
          </div>

          <div className="carousel-item">
            <div className="card w-80 h-45 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
              <img className="w-350px h-48 object-cover" src="https://ninnahub.com.br/wp-content/uploads/2025/07/medflow.png" alt="Startup 4" />
            </div>
          </div> */}
        </div>

        {/* Controles */}
        <div>

        </div>

      </div>
    </div>
  );
}
