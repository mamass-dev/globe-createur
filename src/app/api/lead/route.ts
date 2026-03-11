import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, source, context } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    // TODO: Intégrer Resend pour l'envoi d'email
    // import { Resend } from "resend"
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: "Globe Créateur <noreply@globecreateur.fr>",
    //   to: "contact@globecreateur.fr",
    //   subject: `🎯 Nouveau lead ${source} — ${name}`,
    //   html: `
    //     <h2>Nouveau lead depuis ${source}</h2>
    //     <p><strong>Nom :</strong> ${name}</p>
    //     <p><strong>Email :</strong> ${email}</p>
    //     <p><strong>Téléphone :</strong> ${phone || "Non renseigné"}</p>
    //     <h3>Contexte</h3>
    //     <pre>${JSON.stringify(context, null, 2)}</pre>
    //   `,
    // })

    console.log("Lead submission:", { name, email, phone, source, context })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
