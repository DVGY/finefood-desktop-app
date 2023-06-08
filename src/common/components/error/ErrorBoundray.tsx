import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundray extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error);
    // Optional: Send the error to an error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
