import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, service, budget, message } = body

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    // TODO: Intégrer Resend pour l'envoi d'email
    // import { Resend } from "resend"
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: "Globe Créateur <noreply@globecreateur.fr>",
    //   to: "contact@globecreateur.fr",
    //   subject: `Demande de devis - ${service} - ${name}`,
    //   text: `Nom: ${name}\nEmail: ${email}\nEntreprise: ${company || "-"}\nService: ${service}\nBudget: ${budget || "-"}\n\n${message}`,
    // })

    console.log("Devis form submission:", { name, email, company, service, budget, message })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
