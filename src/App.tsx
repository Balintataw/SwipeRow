/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Text,
  View,
  Button,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SwipeRow} from './swiperow';

type SwipeRef = {
  recenter: () => void;
  openOnClick: () => void;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 4,
  },
  scrollView: {},
  rightActionButton: {
    alignItems: 'center',
    flex: 1,
    width: 70,
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 4,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  rightActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
  staticLeftButton: {
    position: 'relative',
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#fefefe',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  staticLeftButtonText: {
    position: 'absolute',
    color: '#fefefe',
    fontSize: 38,
    top: -11,
    left: 6,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d2d2d2',
    height: 40,
    marginVertical: 4,
    paddingHorizontal: 4,
  },
});

export const App = () => {
  const swipeRef = React.useRef<SwipeRef[]>([]);
  const [isPressed, setIsPressed] = React.useState(false);
  const [openRowIndex, setOpenRowIndex] = React.useState(-1);
  const [isLeftButtonVisible, setIsLeftButtonVisible] = React.useState<boolean>(
    false,
  );

  React.useEffect(() => {
    resetSwipeAnimation(isPressed ? undefined : openRowIndex);
    return () => {
      // closes previously open rows when a new row is swiped open
    };
  }, [openRowIndex, isPressed]);

  const resetSwipeAnimation = (ignoreIndex?: number) => {
    const ref = swipeRef.current;
    if (ignoreIndex !== undefined && ignoreIndex >= 0) {
      ref.forEach((el: SwipeRef, idx: number) => {
        if (idx !== ignoreIndex) {
          el.recenter();
        }
      });
    } else {
      ref.forEach((el: SwipeRef) => el.recenter());
    }
  };

  const leftSwipeButtonClickHandler = (index: number) => {
    const currentSwipeRef = swipeRef.current[index] as SwipeRef;
    currentSwipeRef.openOnClick();
    setOpenRowIndex(index);
  };

  const [leftButtonList, setLeftButtonList] = React.useState([
    {val: 0},
    {val: 1},
    {val: 2},
    {val: 3},
    {val: 4},
  ]);

  const rightButtons = [
    <TouchableOpacity
      key="RightActionButton1"
      onPress={() => {
        setLeftButtonList(
          leftButtonList.filter((item, index) => index !== openRowIndex),
        );
        resetSwipeAnimation();
      }}
      style={styles.rightActionButton}>
      <Text style={[styles.rightActionText]}>X</Text>
      <Text style={styles.rightActionText}>Delete</Text>
    </TouchableOpacity>,
    <TouchableOpacity
      key="RightActionButton2"
      onPress={() => {
        Alert.alert('Clicked!');
        resetSwipeAnimation();
      }}
      style={[styles.rightActionButton, {backgroundColor: '#22FF22'}]}>
      <Text style={[styles.rightActionText, {color: '#222222'}]}>!</Text>
      <Text style={[styles.rightActionText, {color: '#222222'}]}>Go</Text>
    </TouchableOpacity>,
  ];

  const createStaticLeftButtons = (index: number) => {
    return [
      <TouchableOpacity
        key="StaticLeftButton"
        onPress={() => {
          // Alert.alert('Clicked!');
          leftSwipeButtonClickHandler(index);
          // resetSwipeAnimation();
        }}
        style={styles.staticLeftButton}>
        <Text style={[styles.staticLeftButtonText]}>-</Text>
      </TouchableOpacity>,
    ];
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={[styles.container]}>
          <Button
            title="Edit"
            onPress={() => setIsLeftButtonVisible(!isLeftButtonVisible)}
          />
          <ScrollView
            style={[styles.scrollView]}
            scrollEnabled={true}
            bounces={false}>
            {leftButtonList.map((item, index) => (
              <SwipeRow
                key={index}
                ref={el => {
                  if (el) {
                    swipeRef.current[index] = el as SwipeRef;
                  }
                }}
                swipeStartMinDistance={isPressed ? 10000 : 15}
                rightButtons={rightButtons}
                onSwipeStart={() => {
                  setOpenRowIndex(index);
                }}
                rightActionActivationDistance={
                  Dimensions.get('screen').width * 0.9
                }
                showStaticLeftButton={isLeftButtonVisible}
                staticLeftButtons={createStaticLeftButtons(index)}>
                <View style={[styles.listItem]}>
                  <Text>{item.val}</Text>
                </View>
              </SwipeRow>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};
