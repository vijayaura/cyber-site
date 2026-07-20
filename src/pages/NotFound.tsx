import { Link } from 'react-router-dom'
import { SEO } from '@/components/site/SEO'
import { Container } from '@/components/site/Container'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page not found — Sentrix" description="The page you're looking for doesn't exist." />
      <main className="flex min-h-screen flex-col items-center justify-center bg-cream grain">
        <Container className="text-center">
          <p className="font-display text-[clamp(6rem,20vw,12rem)] font-light leading-none text-foreground/10">
            404
          </p>
          <h1 className="display-md -mt-8">Page not found</h1>
          <p className="mt-4 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button asChild variant="default" shape="pill" size="lg" className="mt-8">
            <Link to="/">Back to home</Link>
          </Button>
        </Container>
      </main>
    </>
  )
}
