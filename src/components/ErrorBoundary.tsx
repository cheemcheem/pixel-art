import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";

type ErrorBoundaryProps = PropsWithChildren<{ fatal?: false } | { fatal: true, alternative: ReactNode}>;
type ErrorBoundaryState = { hasError: boolean };

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.fatal) {
      console.error({ errorInfo, error });
    }
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fatal) {
        return this.props.alternative;
      }
      return <></>;
    }

    return this.props.children;
  }
}