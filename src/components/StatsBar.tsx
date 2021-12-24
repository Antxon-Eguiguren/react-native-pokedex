import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  stat: number;
  color: string;
}

export const StatsBar = ({stat, color}: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.statBar,
          width: stat > 100 ? '100%' : `${stat}%`,
          backgroundColor: color,
        }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 12,
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    marginLeft: 10,
  },
  statBar: {
    height: 12,
    borderRadius: 50,
  },
});
