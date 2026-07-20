import { Component, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/site/Container'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-cream grain">
          <Container className="max-w-md text-center">
            <h1 className="display-md">This page didn&apos;t load</h1>
            <p className="mt-4 text-muted-foreground">
              Something went wrong. Please try again or return home.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button onClick={() => window.location.reload()} shape="pill">
                Try again
              </Button>
              <Button asChild variant="outline" shape="pill">
                <Link to="/">Go home</Link>
              </Button>
            </div>
          </Container>
        </main>
      )
    }
    return this.props.children
  }
}
