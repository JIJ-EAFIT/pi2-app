import React from 'react';
import {
  Pressable,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

const RunButton = ({handleRun, exec, tasks}) => {
  return (
    <Pressable onPress={handleRun} style={({pressed}) => [styles.runButton]}>
      {exec ? (
        <>
          <View style={styles.activityLoader}>
            <ActivityIndicator size="small" color="#ffffff" styles />
          </View>
          <Text style={styles.runButtonText}>Corriendo procesos</Text>
        </>
      ) : (
        <>
          <Image
            resizeMode="contain"
            style={styles.runProcessArrow}
            source={require('inyector/src/assets/images/correr_procesos.png')}
          />
          <Text style={styles.runButtonText}>
            Correr procesos ({tasks.length})
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  runButton: {
    flexDirection: 'row',
    backgroundColor: '#1E0B7E',
    paddingHorizontal: 12,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 4,
    height: 40,
  },
  runButtonText: {
    color: 'white',
    fontSize: 14,
  },
  runProcessArrow: {
    height: 22.4,
    width: 20,
    marginRight: 5,
  },
  activityLoader: {
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RunButton;
