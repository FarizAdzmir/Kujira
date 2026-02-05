import { Component, type ReactNode, type ErrorInfo } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[v0] ErrorBoundary caught:", error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", color: "#ff6b6b", backgroundColor: "#0a0a0a", minHeight: "100vh", fontFamily: "monospace" }}>
          <h1 style={{ marginBottom: "1rem" }}>Something went wrong</h1>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {this.state.error?.message}
          </pre>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", marginTop: "1rem", fontSize: "0.8rem", opacity: 0.7 }}>
            {this.state.error?.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
