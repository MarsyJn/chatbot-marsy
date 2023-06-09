const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowMultimedia = addKeyword(['Servicios,servicios'])
.addAnswer('Estos son nuestros servicios:',{
    media: 'https://scontent.fslp1-1.fna.fbcdn.net/v/t39.30808-6/327018226_2003323743207318_835205794291103539_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=19026a&_nc_eui2=AeFiYx3a3B8t-bh6Qv3bzZKXgMAuPZt418SAwC49m3jXxEMYrx-8dzklU5sxC-1-uPg&_nc_ohc=n62SRJuK_XAAX9HHYJu&_nc_ht=scontent.fslp1-1.fna&oh=00_AfAmenEkmsutIHMKOOWVtdTPVEwGJrzPDVyIHgN_p7x3xQ&oe=6471B3D1'
})

const flowSecundario = addKeyword(['4', 'siguiente']).addAnswer(['En *Dermo Organic Center* somos especialistas en *Salud* y *Belleza* de la piel.\nEn un momento nos comunicaremos contigo.\nGracias por tu paciencia'])

const flow2 = addKeyword(['2']).addAnswer(
    [
        'Nuestro horario de atención es de Lunes a Viernes de 11:00 am a 6:00 pm y Sabados de 11:00 am a 2:00 pm\n',

        '¿Qué horario es de tu prefencia?\n',

        'En un momento nos comunicaremos contigo\n',
        
        'Escribe _*(Hola)*_ para Menú principal\n',

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
        '*Acné* https://www.facebook.com/photo/?fbid=707927788002853&set=p.707927788002853\n',
      
        '*Eliminación de Lunares* https://www.facebook.com/photo/?fbid=707927894669509&set=p.707927894669509\n',
        
        '*Eliminación de Verrugas* https://www.facebook.com/photo/?fbid=707927974669501&set=p.707927974669501\n',
        
        '*Eliminación de Tatuajes* https://www.facebook.com/photo/?fbid=707928061336159&set=p.707928061336159\n',
        
        '*Hipercromías(Machas en la piel)* https://www.facebook.com/photo/?fbid=707928161336149&set=p.707928161336149\n',
        
        '*Faciales*\n',
        
        '*Tratamientos corporales*\n',


        'Escribe _*(Hola)*_ para Menú principal\n',

        '*4* Para siguiente paso.',
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
    .addAnswer('🙌 Hola, bienvenido a *Dermo Organic Center*')
    .addAnswer(
        [
            '😊Selecciona la opción que desees.',
            '👉 *1* Quiero mas información de un servicio',
            '👉 *2* Quiero agendar una cita',
            '👉 *3* Otro',
            '👉 *servicios* Para conocer que servicios manejamos',

        ],
        null,
        null,
        [flow2, flow1, flowTuto, flow3]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowMultimedia])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()