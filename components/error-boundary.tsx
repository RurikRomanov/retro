import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { getTelegramApp } from "@/utils/telegram";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error("ErrorBoundary: getDerivedStateFromError", error)
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Component stack:', errorInfo.componentStack);
    this.setState({ error, errorInfo });
  }

  private handleRetry = () => {
    console.log("ErrorBoundary: Retry button clicked")
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  }

  private handleClose = () => {
    console.log("ErrorBoundary: Close button clicked")
    const tg = getTelegramApp();
    if (tg) {
      tg.close();
    } else {
      window.close();
    }
  }

  public render() {
    if (this.state.hasError) {
      console.log("ErrorBoundary: Rendering error UI")
      return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-[var(--tg-theme-bg-color,#ffffff)]">
          <div className="w-full max-w-md p-4 rounded-lg border border-[var(--tg-theme-hint-color,#999999)] bg-[var(--tg-theme-secondary-bg-color,#f0f0f0)]">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-[var(--tg-theme-destructive-text-color,#ff0000)]" />
              <div>
                <h3 className="font-medium text-[var(--tg-theme-text-color,#000000)]">
                  Произошла ошибка
                </h3>
                <p className="mt-1 text-[var(--tg-theme-hint-color,#999999)]">
                  {this.state.error?.toString() || "Неизвестная ошибка. Пожалуйста, попробуйте еще раз."}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-[var(--tg-theme-link-color,#3390ec)]">
                      Подробности ошибки
                    </summary>
                    <pre className="mt-2 text-xs overflow-auto max-h-40 p-2 bg-[var(--tg-theme-bg-color,#ffffff)] rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={this.handleRetry}
                className="flex-1 px-4 py-2 rounded-lg text-[var(--tg-theme-button-text-color,#ffffff)] bg-[var(--tg-theme-button-color,#3390ec)]"
              >
                Попробовать снова
              </button>
              <button
                onClick={this.handleClose}
                className="flex-1 px-4 py-2 rounded-lg text-[var(--tg-theme-destructive-text-color,#ff0000)] bg-[var(--tg-theme-secondary-bg-color,#f0f0f0)] border border-[var(--tg-theme-hint-color,#999999)]"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      );
    }

    console.log("ErrorBoundary: Rendering children")
    return this.props.children;
  }
}

