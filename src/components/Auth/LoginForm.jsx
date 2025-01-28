import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Images de démonstration (à remplacer par les vraies images Orange Money)
  const images = [
    {
      url: "https://scontent.fdkr5-1.fna.fbcdn.net/v/t51.75761-15/469060686_17989652711744415_3383283260105695039_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGju1FEckC9qMkWe8Us_lmFOY5yrmllqTg5jnKuaWWpOKoMdwm6Ff58I8MBJ88GkVOlaItJSGxsjdl-u6FQRm8P&_nc_ohc=t98FF-P_L8gQ7kNvgHg5X0L&_nc_zt=23&_nc_ht=scontent.fdkr5-1.fna&_nc_gid=A_jjCi3SPHOzhH89NvC-nW_&oh=00_AYDAD_bv1vUl4SBHGTF-mtdbObC3hosOGyG00UqK8_NnbQ&oe=679D5A95",
      title: "Transfert d'argent instantané",
      description: "Envoyez de l'argent à vos proches en quelques clics"
    },
    {
      url: "https://scontent.fdkr7-1.fna.fbcdn.net/v/t51.75761-15/472217187_17993414717744415_6068947365060440527_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE9emiN7bY-A4HEG6Pl65D1aSZ47SzJPiNpJnjtLMk-I8-3XAMc8o_o9mmDfNx1rVZmk1OBourfGx9DdEK8MNie&_nc_ohc=Qt0bgefyE-8Q7kNvgFBr8Sm&_nc_zt=23&_nc_ht=scontent.fdkr7-1.fna&_nc_gid=AX6d-_Mo2A19ThtWnopoQne&oh=00_AYCLwunBEVttfYnZmUk9arGel8aMx54bwY2Ty7wV9h_kuQ&oe=679D64D0",
      title: "Paiement facile",
      description: "Réglez vos factures et achats quotidiens"
    },
    {
      url: "https://caractereconseil.com/assets/c_brands/orange_money/campagne_2/image1-e8e4be301cd1229c8664a074fc6385a7c5f5585ac5c23de648c6cdd8f2d1c3f2.jpg",
      title: "Sécurité garantie",
      description: "Vos transactions sont 100% sécurisées"
    }
  ];

  // Animation automatique du carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    await new Promise(resolve => setTimeout(resolve, 1000));

    const adminCredentials = {
      username: "admin",
      password: "admin123",
    };

    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      navigate("/admin");
    } else {
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Partie gauche - Carousel */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Image courante avec overlay léger */}
        <div className="relative w-full h-full">
          <img
            src={images[currentImageIndex].url}
            alt="Orange Money Services"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay avec gradient plus subtil */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
          
          {/* Contenu du slide avec fond semi-transparent derrière le texte */}
          <div className="absolute inset-0 flex flex-col justify-center items-center z-20 p-8 text-center">
            <div className="bg-black/40 p-6 rounded-xl backdrop-blur-sm">
              <h2 className="text-4xl font-bold mb-4 text-white">{images[currentImageIndex].title}</h2>
              <p className="text-xl text-white/90">{images[currentImageIndex].description}</p>
            </div>
          </div>
        </div>

        {/* Contrôles du carousel */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Boutons navigation */}
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-all backdrop-blur-sm"
          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-all backdrop-blur-sm"
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Partie droite - Formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">OM</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Campagne Orange Money</h2>
            <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Identifiant
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Entrez votre identifiant"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-sm rounded-lg p-3">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between text-sm ">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-gray-600">
                  Se souvenir de moi
                </label>
              </div>
              <a href="/forgot-password" className="text-orange-500 hover:text-orange-600">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex justify-center items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Nouveau sur Orange Money ?{" "}
              <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                Créer un compte
              </a>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Besoin d'aide ?{" "}
              <a href="/contact" className="text-orange-500 hover:text-orange-600">
                Contactez le support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;