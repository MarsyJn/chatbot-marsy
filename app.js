const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['4', 'siguiente']).addAnswer(['En Dermo Organic Center somos especialistas en Salud y Belleza de la piel.            En un momento nos comunicaremos contigo. Gracias por tu paciencia'])

const flow2 = addKeyword(['2']).addAnswer(
    [
        'Nuestro horario de atención es de Lunes a Viernes de 11:00 am a 6:00 pm y Sabados de 11:00 am a 2:00 pm',

        '¿Qué horario es de tu prefencia?',

        'En un momento nos comunicaremos contigo',
        
        'Escribe (Hola) para Menú principal',

        '\n*4* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*4* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flow1 = addKeyword(['1']).addAnswer(
    [
        'Acné https://www.facebook.com/photo/?fbid=707927788002853&set=p.707927788002853',

        'Eliminación de Lunares https://www.facebook.com/photo/?fbid=707927894669509&set=p.707927894669509',
        
        'Eliminación de Verrugas https://www.facebook.com/photo/?fbid=707927974669501&set=p.707927974669501',
        
        'Eliminación de Tatuajes https://www.facebook.com/photo/?fbid=707928061336159&set=p.707928061336159',
        
        'Hipercromías(Machas en la piel) https://www.facebook.com/photo/?fbid=707928161336149&set=p.707928161336149',
        
        'Faciales',
        
        'Tratamientos corporales',


        'Escribe (Hola) para Menú principal',

        '\n*4* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flow3 = addKeyword(['3']).addAnswer(
    ['¿En qué podemos ayudarte?', 
    'En un momento nos pondremos en contacto contigo',

    'Escribe la palabra _*(Hola)*_ para Menú principal',

    '\n*4* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'buenas', 'informacion', 'info'])
    .addAnswer('🙌 Hola, bienvenido a Dermo Organic Center')
    .addAnswer(
        [
            'Selecciona la opción que desees escribiendo el número de la misma.',
            '👉 1 Quiero mas información de un servicio',
            '👉 2 Quiero agendar una cita',
            '👉 3 Otro',
        ],
        null,
        null,
        [flow2, flow1, flowTuto, flow3]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()