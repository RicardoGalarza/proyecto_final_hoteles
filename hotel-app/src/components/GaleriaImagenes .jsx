import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const GaleriaImagenes = ({ imagenes }) => {
    if (imagenes.length < 5) {
        console.error('Debe haber al menos 5 imágenes en la galería.');
        return null;
    }

    // La imagen principal es la primera en la lista
    const imagenPrincipal = imagenes[0];
    const imagenesSecundarias = imagenes.slice(1, 5);

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                {/* Imagen Principal */}
                <div className="col-md-8">
                    <img src={imagenPrincipal} alt="Imagen Principal" className="img-fluid mx-auto d-block" />
                </div>

                {/* Imágenes Secundarias */}
                <div className="col-md-4">
                    <div className="row">
                        {imagenesSecundarias.map((imagen, index) => (
                            <div className="col-6 mb-3" key={index}>
                                <img src={imagen} alt={`Imagen ${index + 1}`} className="img-fluid mx-auto d-block" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Ver más */}
            <div className="text-end mt-2">
                <button className="btn btn-outline-primary">
                    Ver más
                </button>
            </div>
        </div>
    );
};

export default GaleriaImagenes;
