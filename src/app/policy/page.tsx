import React from 'react';

export default function Policy() {
    return (
        <main className="bg-white max-w-4xl mx-auto p-6">
            <section className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Política de Privacidad</h1>
                <p className="text-lg text-gray-700 mb-4">Tu privacidad es muy importante para nosotros</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Introducción</h2>
                <p className="text-lg text-gray-700 mb-4">
                    Bienvenido a <strong>teacuerdas.com</strong> (<a href="https://teacuerdas.com" className="text-blue-600 hover:underline">https://teacuerdas.com</a>). Tu privacidad es muy importante para nosotros. Esta política de privacidad explica cómo recopilamos, utilizamos y protegemos tu información personal cuando visitas nuestro sitio web, te suscribes a nuestro boletín o interactúas con nuestro contenido. Al usar nuestro sitio, aceptas los términos de esta política de privacidad.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Información que recopilamos</h2>
                <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">Información personal:</h3>
                <p className="text-lg text-gray-700 mb-2">
                    Cuando nos contactas mediante un formulario o por correo electrónico, recopilamos tu nombre, dirección de correo electrónico y tu mensaje.
                </p>
                <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">Información no personal:</h3>
                <p className="text-lg text-gray-700 mb-2">
                    Recopilamos automáticamente datos técnicos como tu dirección IP, tipo de navegador, información del dispositivo y comportamiento de navegación (a través de herramientas como Google Analytics).
                </p>
                <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">Cookies:</h3>
                <p className="text-lg text-gray-700 mb-2">
                    Nuestro sitio utiliza cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido o la publicidad. Puedes gestionar tus preferencias de cookies en la configuración de tu navegador.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Uso de tu información</h2>
                <p className="text-lg text-gray-700 mb-2">Utilizamos tu información para:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                    <li>Mejorar nuestro sitio web y la experiencia del usuario.</li>
                    <li>Responder a tus preguntas o solicitudes.</li>
                    <li>Enviarte boletines o actualizaciones (solo si has dado tu consentimiento).</li>
                    <li>Analizar el tráfico y el rendimiento del sitio.</li>
                    <li>Mostrar contenido publicitario relevante.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Protección de datos</h2>
                <p className="text-lg text-gray-700 mb-2">
                    Tomamos muy en serio la protección de tus datos. Toda la información recopilada se almacena de forma segura y nunca se comparte con terceros no autorizados. Usamos medidas de seguridad estándar para prevenir el acceso, modificación o divulgación no autorizada de tus datos personales.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Servicios de terceros</h2>
                <p className="text-lg text-gray-700 mb-2">
                    Nuestro sitio puede incluir enlaces a sitios de terceros o utilizar servicios externos (por ejemplo: Google Analytics, redes publicitarias o widgets de redes sociales). Estos terceros tienen sus propias políticas de privacidad, y no somos responsables de sus prácticas.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Tus derechos (RGPD)</h2>
                <p className="text-lg text-gray-700 mb-2">De acuerdo con el Reglamento General de Protección de Datos (RGPD), tienes derecho a:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                    <li>Acceder a tus datos personales.</li>
                    <li>Solicitar su rectificación o eliminación.</li>
                    <li>Retirar tu consentimiento en cualquier momento.</li>
                    <li>Oponerte al tratamiento de tus datos.</li>
                </ul>
                <p className="text-lg text-gray-700 mb-2">
                    Para ejercer estos derechos, contáctanos en: <a href="mailto:contact@teacuerdas.com" className="text-blue-600 hover:underline">contact@teacuerdas.com</a>
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Modificaciones de esta política</h2>
                <p className="text-lg text-gray-700 mb-2">
                    Podemos actualizar esta política de privacidad en cualquier momento. Cualquier cambio se publicará en esta página junto con la fecha de actualización correspondiente.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Contáctanos</h2>
                <p className="text-lg text-gray-700 mb-2">
                    Si tienes preguntas o inquietudes sobre esta política de privacidad, contáctanos en:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>📩 Email: <a href="mailto:contact@teacuerdas.com" className="text-blue-600 hover:underline">contact@teacuerdas.com</a></li>
                    <li>🌐 Sitio web: <a href="https://teacuerdas.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">teacuerdas.com</a></li>
                </ul>
            </section>
        </main>
    );
}
