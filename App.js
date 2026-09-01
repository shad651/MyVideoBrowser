import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [url, setUrl] = useState('https://www.google.com');
  const [inputUrl, setInputUrl] = useState('https://www.google.com');
  const [detectedVideo, setDetectedVideo] = useState(null);
  const webViewRef = useRef(null);

  const handleSearch = () => {
    let target = inputUrl.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://www.google.com/search?q=' + encodeURIComponent(target);
    }
    setUrl(target);
  };

  const handleStateChange = (navState) => {
    const currentUrl = navState.url;
    if (currentUrl.includes('.mp4') || currentUrl.includes('.m3u8')) {
      setDetectedVideo(currentUrl);
    }
  };

  const downloadVideo = () => {
    Alert.alert('Video Detected!', 'Downloading video to private vault...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput 
          style={styles.input} 
          value={inputUrl} 
          onChangeText={setInputUrl} 
          placeholder="Type URL or Search..."
        />
        <TouchableOpacity style={styles.goBtn} onPress={handleSearch}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Go</Text>
        </TouchableOpacity>
      </View>

      <WebView 
        ref={webViewRef}
        source={{ uri: url }}
        onNavigationStateChange={handleStateChange}
        allowsInlineMediaPlayback={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      {detectedVideo && (
        <TouchableOpacity style={styles.downloadBtn} onPress={downloadVideo}>
          <Text style={styles.dlText}>⬇ Download Video</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  searchBar: { flexDirection: 'row', padding: 10, backgroundColor: '#1f1f1f' },
  input: { flex: 1, backgroundColor: '#333', color: '#fff', paddingHorizontal: 12, borderRadius: 8, marginRight: 8 },
  goBtn: { backgroundColor: '#007AFF', paddingHorizontal: 16, justifyContent: 'center', borderRadius: 8 },
  downloadBtn: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#FF3B30', padding: 14, borderRadius: 30, elevation: 5 },
  dlText: { color: '#fff', fontWeight: 'bold' }
});
