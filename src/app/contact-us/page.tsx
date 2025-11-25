import React from 'react';

export default function ContactUs() {
    return (
        <main className="bg-white max-w-4xl mx-auto p-6">
            <section className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Contáctanos</h1>
                <p className="text-lg text-gray-700 mb-4">
                    ¡Nos encanta recibir noticias de nuestros lectores, socios y colaboradores!
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    Ya sea que tengas información para compartir, una idea de colaboración, una solicitud publicitaria o simplemente una pregunta, nuestro equipo está aquí para escucharte.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">📩 Información de contacto</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Email: <a href="mailto:contact@teacuerdas.com" className="text-blue-600 hover:underline">contact@teacuerdas.com</a></li>
                    <li>Sitio web: <a href="https://teacuerdas.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">teacuerdas.com</a></li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">📰 Envíos y Colaboraciones</h2>
                <p className="text-lg text-gray-700 mb-4">
                    ¿Eres redactor, periodista o una marca y deseas colaborar con nosotros? Aceptamos artículos de invitados, alianzas y colaboraciones promocionales en los ámbitos de actualidad, viajes, negocios, tecnología, estilo de vida y más.
                </p>
                <p className="text-lg text-gray-700">
                    Contáctanos para hablar sobre una posible colaboración.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">💼 Publicidad y Alianzas Mediáticas</h2>
                <p className="text-lg text-gray-700 mb-4">
                    ¿Quieres promocionar tu empresa o tus productos en teacuerdas.com? Ofrecemos soluciones publicitarias flexibles y alianzas mediáticas adaptadas a tus necesidades.
                </p>
                <p className="text-lg text-gray-700">
                    No dudes en contactar a nuestro equipo de medios para obtener más información.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">🌍 Mantente conectado</h2>
                <p className="text-lg text-gray-700">
                    Síguenos en nuestras redes sociales para no perderte ninguna de nuestras últimas noticias y publicaciones.
                </p>
                <p className="text-lg text-gray-700">
                    Tus comentarios y sugerencias siempre son bienvenidos — ¡nos ayudan a informarte mejor!
                </p>
            </section>
        </main>
    );
}
