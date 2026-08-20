import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Generic error boundary. Used around anything "nice to have but not
 * essential" (the 3D monogram, in particular) so a runtime failure there
 * degrades to a static fallback instead of breaking the page. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('Recovered from a rendering error, falling back gracefully:', error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
