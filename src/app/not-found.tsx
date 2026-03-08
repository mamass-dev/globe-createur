import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <Container className="py-20 lg:py-32 text-center">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="mt-4 text-lg text-gray-500">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-8">
        <Button href="/">Retour à l&apos;accueil</Button>
      </div>
    </Container>
  )
}
