import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRef, useState } from 'react';

// ─── URL de producción (versión mobile) ─────────────────────────────────
const VITE_DEV_URL = 'https://m.gomap.digital';
// ────────────────────────────────────────────────────────────────────────

export default function App() {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>⚠️ No se pudo conectar</Text>
        <Text style={styles.errorText}>
          Asegúrate de que el servidor Vite esté corriendo:{'\n\n'}
          <Text style={styles.code}>cd goMap/mobile{'\n'}npm run dev</Text>
          {'\n\n'}y que tu PC y celular estén en la misma red WiFi.{'\n\n'}
          URL: {VITE_DEV_URL}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0f172a" />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Iniciando GoMap...</Text>
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{ uri: VITE_DEV_URL }}
        style={styles.webview}
        onLoad={() => setLoading(false)}
        onHttpError={handleError}
        onError={handleError}
        startInLoadingState={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        geolocationEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="compatibility"
        cacheEnabled={false}
        incognito={false}
        userAgent="Mozilla/5.0 (Linux; Android 12; GoMap Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 16,
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    color: '#f87171',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  code: {
    color: '#6366f1',
    fontFamily: 'monospace',
    backgroundColor: '#1e293b',
  },
});
