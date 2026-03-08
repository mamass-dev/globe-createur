import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    // TODO: Intégrer Resend pour l'envoi d'email
    // import { Resend } from "resend"
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: "Globe Créateur <noreply@globecreateur.fr>",
    //   to: "contact@globecreateur.fr",
    //   subject: `Nouveau message de ${name}`,
    //   text: `Nom: ${name}\nEmail: ${email}\nTél: ${phone || "Non renseigné"}\n\n${message}`,
    // })

    console.log("Contact form submission:", { name, email, phone, message })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
