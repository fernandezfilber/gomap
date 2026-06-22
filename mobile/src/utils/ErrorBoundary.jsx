// src/components/ui/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Aquí podrías enviar el error a un servicio como Sentry
    console.error("Fallo en componente:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center bg-red-900 text-white">
          <h2>⚠️ Algo salió mal en el Mapa</h2>
          <button onClick={() => window.location.reload()}>Recargar Red</button>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;