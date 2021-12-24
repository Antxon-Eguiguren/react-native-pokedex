import React, {useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onDebounce: (value: string) => void;
}

export const SearchInput = ({onDebounce}: Props) => {
  const [textValue, setTextValue] = useState<string>('');
  const debouncedValue = useDebouncedValue(textValue, 500);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue, onDebounce]);

  return (
    <View style={styles.textBackground}>
      <TextInput
        placeholder="Search Pokemon by name or #"
        style={{...styles.textInput, top: Platform.OS === 'ios' ? 0 : 2}}
        autoCapitalize="none"
        autoCorrect={false}
        value={textValue}
        onChangeText={setTextValue}
      />
      {textValue.length === 0 && (
        <Icon name="search-outline" size={25} color="grey" />
      )}
      {textValue.length > 0 && (
        <TouchableOpacity activeOpacity={0.6} onPress={() => setTextValue('')}>
          <Icon name="close-outline" size={25} color="grey" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});
