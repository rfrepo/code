import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; onReload?: () => void };
type State = { failed: boolean };

const reloadPage = () => window.location.reload();

/**
 * Shows a short message and a Reload button instead of a blank page when rendering throws.
 * React has no hook for this, so it is a class.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div
        role="alert"
        className="flex flex-col items-center justify-center gap-3 h-screen text-kumo-default"
      >
        <p>Something went wrong. Your rules and reviews are saved.</p>
        <button
          type="button"
          className="rounded-lg border border-kumo-line px-3 py-1.5"
          onClick={this.props.onReload ?? reloadPage}
        >
          Reload
        </button>
      </div>
    );
  }
}
