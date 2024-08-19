import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const GaleriaImagenes = ({ imagenes }) => {
    // Asegurarnos de que hay al menos 5 imágenes
    if (imagenes.length < 5) {
        console.error('Debe haber al menos 5 imágenes en la galería.');
        return null;
    }

    // La imagen principal es la primera en la lista
    const imagenPrincipal = imagenes[0];

    // Las imágenes secundarias son las siguientes 4
    const imagenesSecundarias = imagenes.slice(1, 5);

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Imagen Principal */}
                <div className="col-md-6">
                    <img src={imagenPrincipal} alt="Imagen Principal" className="img-fluid" />
                </div>

                {/* Imágenes Secundarias */}
                <div className="col-md-6">
                    <div className="row">
                        {imagenesSecundarias.map((imagen, index) => (
                            <div className="col-6 mb-3" key={index}>
                                <img src={imagen} alt={`Imagen ${index + 2}`} className="img-fluid" />
                            </div>
                        ))}
                    </div>
                    {/* Ver más */}
                    <div className="text-end mt-2">
                        <button className="btn btn-outline-primary">
                            Ver más
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GaleriaImagenes;
