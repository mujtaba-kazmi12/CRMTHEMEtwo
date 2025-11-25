import React from 'react';

export default function AboutUs() {
    return (
        <main className="bg-white max-w-4xl mx-auto p-6">
            <section className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Acerca de nosotros</h1>
                <p className="text-lg text-gray-700 mb-4">
                    Bienvenido a <strong>teacuerdas.com</strong>. Tu destino moderno para noticias, tendencias e historias que realmente importan.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    En teacuerdas.com, te ofrecemos las últimas novedades de todo el mundo: desde noticias de celebridades hasta innovaciones tecnológicas, pasando por criptomonedas, negocios y viajes.
                </p>
                <p className="text-lg text-gray-700">
                    Nuestro objetivo es proporcionar contenido preciso, atractivo y relevante para informar e inspirar a nuestros lectores cada día.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Nuestras Categorías</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Noticias de Celebridades:</strong> Sigue las últimas novedades del mundo del entretenimiento y la cultura popular.</li>
                    <li><strong>Viajes y Turismo:</strong> Descubre nuevos destinos, consejos de viaje y lugares imprescindibles.</li>
                    <li><strong>Cripto y Finanzas:</strong> Mantente al día con las tendencias en criptomonedas, mercados y economía.</li>
                    <li><strong>Negocios y Economía:</strong> Sigue la actualidad que da forma a las empresas y a la economía global.</li>
                    <li><strong>Tecnología e Innovación:</strong> Explora los últimos avances en gadgets, IA y transformación digital.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Nuestra Misión</h2>
                <p className="text-lg text-gray-700">
                    Nuestra misión es ofrecer un espacio donde todos puedan acceder a información fiable, variada y de calidad. Creemos en el poder de la información para inspirar, educar y conectar a las personas más allá de las fronteras.
                </p>
                <p className="text-lg text-gray-700 mt-4">
                    Ya sea que te apasione viajar, invertir, la tecnología o simplemente quieras entender mejor el mundo que te rodea, teacuerdas.com es tu fuente esencial de noticias e inspiración.
                </p>
            </section>
        </main>
    );
}
