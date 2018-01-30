import React from 'react';
import { StyleSheet, Text, View, ToolbarAndroid } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.strip}></View>
        <ToolbarAndroid
            title="Actuariat Vie v0.0.1"
            actions={[
              {title: 'About'},
            ]}
            onActionSelected={i=>i}
            style={styles.toolbar}/>
        <Text style={styles.label}>Here we need to put some actual content. It is yet to come.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  strip: {
    height: 24
  },
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    color: '#eee'
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
});
