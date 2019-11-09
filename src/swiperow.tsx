// TODO: This is a heavily modified npm package and thus doesn't really
// maintain consistency with the rest of the app. Will likely be made into
// a separate npm package

/* eslint-disable no-invalid-this */
import React, {PureComponent} from 'react';
import {Animated, Easing, PanResponder, StyleSheet, View} from 'react-native';

function noop() {}

interface NativeSyntheticEvent<T> {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: T;
  preventDefault(): void;
  stopPropagation(): void;
  target: EventTarget;
  timeStamp: number;
  type: string;
}

export interface NativeTouchEvent {
  changedTouches: NativeTouchEvent[];
  identifier: string;
  locationX: number;
  locationY: number;
  pageX: number;
  pageY: number;
  target: string;
  timestamp: number;
  touches: NativeTouchEvent[];
}

export interface PanResponderGestureState {
  stateID: number;
  moveX: number;
  moveY: number;
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  numberActiveTouches: number;
  _accountsForMovesUpTo: number;
}

export interface GestureResponderEvent
  extends NativeSyntheticEvent<NativeTouchEvent> {}

type propTypes = {
  // elements
  children: any;
  leftContent: any;
  rightContent: any;
  leftButtons: JSX.Element[];
  staticLeftButtons: JSX.Element[];
  rightButtons: JSX.Element[];

  // left action lifecycle
  onLeftActionActivate: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onLeftActionDeactivate: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onLeftActionRelease: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onLeftActionComplete: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  leftActionActivationDistance: number;
  leftActionReleaseAnimationFn: () => void;
  leftActionReleaseAnimationConfig: {};

  // right action lifecycle
  onRightActionActivate: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onRightActionDeactivate: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onRightActionRelease: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onRightActionComplete: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  rightActionActivationDistance: number;
  rightActionReleaseAnimationFn: () => void;
  rightActionReleaseAnimationConfig: {};

  // left buttons lifecycle
  onLeftButtonsActivate: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onLeftButtonsDeactivate: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onLeftButtonsOpenRelease: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onLeftButtonsOpenComplete: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onLeftButtonsCloseRelease: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onLeftButtonsCloseComplete: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  leftButtonWidth: number;
  leftButtonsActivationDistance: number;
  leftButtonsOpenReleaseAnimationFn: () => void;
  leftButtonsOpenReleaseAnimationConfig: {};
  leftButtonsCloseReleaseAnimationFn: () => void;
  leftButtonsCloseReleaseAnimationConfig: {};

  // right buttons lifecycle
  onRightButtonsActivate: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onRightButtonsDeactivate: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onRightButtonsOpenRelease: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onRightButtonsOpenComplete: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onRightButtonsCloseRelease: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onRightButtonsCloseComplete: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  rightButtonWidth: number;
  rightButtonsActivationDistance: number;
  rightButtonsOpenReleaseAnimationFn: () => void;
  rightButtonsOpenReleaseAnimationConfig: {};
  rightButtonsCloseReleaseAnimationFn: () => void;
  rightButtonsCloseReleaseAnimationConfig: {};

  // base swipe lifecycle
  onSwipeStart: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onSwipeMove: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onSwipeRelease: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  onSwipeComplete: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any,
  ) => void;
  swipeReleaseAnimationFn: (
    pan: Animated.AnimatedValueXY,
    animationConfig: {
      toValue: {
        x: number;
        y: number;
      };
    },
  ) => any;
  swipeReleaseAnimationConfig: {
    toValue: {
      x: number;
      y: number;
    };
    duration: number;
    easing: any;
  };

  // misc
  onRef: (c: any) => void;
  onPanAnimatedValueRef: (pan: any) => void;
  swipeStartMinDistance: number;
  showStaticLeftButton?: boolean;
  staticLeftButtonAction?: () => void;

  // styles
  style?: {};
  leftContainerStyle?: {};
  leftButtonContainerStyle?: {};
  rightContainerStyle?: {};
  rightButtonContainerStyle?: {};
  contentContainerStyle?: {};
};

export class SwipeRow extends PureComponent<propTypes> {
  static defaultProps = {
    leftContent: null,
    rightContent: null,
    leftButtons: null,
    rightButtons: null,

    // left action lifecycle
    onLeftActionActivate: noop,
    onLeftActionDeactivate: noop,
    onLeftActionRelease: noop,
    onLeftActionComplete: noop,
    leftActionActivationDistance: 125,
    leftActionReleaseAnimationFn: null,
    leftActionReleaseAnimationConfig: null,

    // right action lifecycle
    onRightActionActivate: noop,
    onRightActionDeactivate: noop,
    onRightActionRelease: noop,
    onRightActionComplete: noop,
    rightActionActivationDistance: 125,
    rightActionReleaseAnimationFn: null,
    rightActionReleaseAnimationConfig: null,

    // left buttons lifecycle
    onLeftButtonsActivate: noop,
    onLeftButtonsDeactivate: noop,
    onLeftButtonsOpenRelease: noop,
    onLeftButtonsOpenComplete: noop,
    onLeftButtonsCloseRelease: noop,
    onLeftButtonsCloseComplete: noop,
    leftButtonWidth: 75,
    leftButtonsActivationDistance: 75,
    leftButtonsOpenReleaseAnimationFn: null,
    leftButtonsOpenReleaseAnimationConfig: null,
    leftButtonsCloseReleaseAnimationFn: null,
    leftButtonsCloseReleaseAnimationConfig: null,

    // right buttons lifecycle
    onRightButtonsActivate: noop,
    onRightButtonsDeactivate: noop,
    onRightButtonsOpenRelease: noop,
    onRightButtonsOpenComplete: noop,
    onRightButtonsCloseRelease: noop,
    onRightButtonsCloseComplete: noop,
    rightButtonWidth: 75,
    rightButtonsActivationDistance: 75,
    rightButtonsOpenReleaseAnimationFn: null,
    rightButtonsOpenReleaseAnimationConfig: null,
    rightButtonsCloseReleaseAnimationFn: null,
    rightButtonsCloseReleaseAnimationConfig: null,

    // base swipe lifecycle
    onSwipeStart: noop,
    onSwipeMove: noop,
    onSwipeRelease: noop,
    onSwipeComplete: noop,
    swipeReleaseAnimationFn: Animated.timing,
    swipeReleaseAnimationConfig: {
      toValue: {x: 0, y: 0},
      duration: 250,
      easing: Easing.elastic(0.5),
    },

    // misc
    onRef: noop,
    onDone: noop,
    onPanAnimatedValueRef: noop,
    swipeStartMinDistance: 15,
  };

  state = {
    pan: new Animated.ValueXY(),
    width: 0,
    lastOffset: {x: 0, y: 0},
    leftActionActivated: false,
    leftButtonsActivated: false,
    leftButtonsOpen: false,
    rightActionActivated: false,
    rightButtonsActivated: false,
    rightButtonsOpen: false,
  };

  componentDidMount() {
    const {onPanAnimatedValueRef, onRef} = this.props;
    onRef(this);
    onPanAnimatedValueRef(this.state.pan);
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  recenter = (
    animationFn = this.props.swipeReleaseAnimationFn,
    animationConfig = this.props.swipeReleaseAnimationConfig,
    onDone?: any,
  ) => {
    const {pan} = this.state;

    this.setState({
      lastOffset: {x: 0, y: 0},
      leftActionActivated: false,
      leftButtonsActivated: false,
      leftButtonsOpen: false,
      rightActionActivated: false,
      rightButtonsActivated: false,
      rightButtonsOpen: false,
    });

    pan.flattenOffset();

    animationFn(pan, animationConfig).start(onDone);
  };

  openOnClick = (
    animationFn = this.props.swipeReleaseAnimationFn,
    animationConfig = this.props.swipeReleaseAnimationConfig,
    onDone?: any,
  ) => {
    const {pan} = this.state;
    animationConfig = {
      toValue: {x: -75 * this.props.rightButtons.length, y: 0},
      duration: 250,
      easing: Easing.elastic(0.5),
    };

    this.setState(
      {
        // TODO set this x value to be the width
        // of the right buttons element
        lastOffset: {x: -75 * this.props.rightButtons.length, y: 0},
      },
      () => {
        pan.flattenOffset();

        animationFn(pan, animationConfig).start(onDone);
      },
    );
  };

  _unmounted = false;

  _handlePan = Animated.event([
    null,
    {
      dx: this.state.pan.x,
      dy: this.state.pan.y,
    },
  ]);

  _handleMoveShouldSetPanResponder = (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => Math.abs(gestureState.dx) > this.props.swipeStartMinDistance;

  _handlePanResponderStart = (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    const {lastOffset, pan} = this.state;

    pan.setOffset(lastOffset);
    this.props.onSwipeStart(e, gestureState, this);
  };

  _handlePanResponderMove = (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    const {
      leftActionActivationDistance,
      leftButtonsActivationDistance,
      onLeftActionActivate,
      onLeftActionDeactivate,
      onLeftButtonsActivate,
      onLeftButtonsDeactivate,
      rightActionActivationDistance,
      rightButtonsActivationDistance,
      onRightActionActivate,
      onRightActionDeactivate,
      onRightButtonsActivate,
      onRightButtonsDeactivate,
      onSwipeMove,
    } = this.props;
    const {
      lastOffset,
      leftActionActivated,
      leftButtonsActivated,
      rightActionActivated,
      rightButtonsActivated,
    } = this.state;
    const {dx, vx} = gestureState;
    const x = dx + lastOffset.x;
    const canSwipeRight = this._canSwipeRight();
    const canSwipeLeft = this._canSwipeLeft();
    const hasLeftButtons = this._hasLeftButtons();
    const hasRightButtons = this._hasRightButtons();
    const isSwipingLeft = vx < 0;
    const isSwipingRight = vx > 0;
    let nextLeftActionActivated = leftActionActivated;
    let nextLeftButtonsActivated = leftButtonsActivated;
    let nextRightActionActivated = rightActionActivated;
    let nextRightButtonsActivated = rightButtonsActivated;

    this._handlePan(e, gestureState);
    onSwipeMove(e, gestureState, this);

    if (
      !leftActionActivated &&
      canSwipeRight &&
      x >= leftActionActivationDistance
    ) {
      nextLeftActionActivated = true;
      onLeftActionActivate(e, gestureState, this);
    }

    if (
      leftActionActivated &&
      canSwipeRight &&
      x < leftActionActivationDistance
    ) {
      nextLeftActionActivated = false;
      onLeftActionDeactivate(e, gestureState, this);
    }

    if (
      !rightActionActivated &&
      canSwipeLeft &&
      x <= -rightActionActivationDistance
    ) {
      nextRightActionActivated = true;
      onRightActionActivate(e, gestureState, this);
    }

    if (
      rightActionActivated &&
      canSwipeLeft &&
      x > -rightActionActivationDistance
    ) {
      nextRightActionActivated = false;
      onRightActionDeactivate(e, gestureState, this);
    }

    if (
      !leftButtonsActivated &&
      hasLeftButtons &&
      !isSwipingLeft &&
      x >= leftButtonsActivationDistance
    ) {
      nextLeftButtonsActivated = true;
      onLeftButtonsActivate(e, gestureState, this);
    }

    if (leftButtonsActivated && hasLeftButtons && isSwipingLeft) {
      nextLeftButtonsActivated = false;
      onLeftButtonsDeactivate(e, gestureState, this);
    }

    if (
      !rightButtonsActivated &&
      hasRightButtons &&
      !isSwipingRight &&
      x <= -rightButtonsActivationDistance
    ) {
      nextRightButtonsActivated = true;
      onRightButtonsActivate(e, gestureState, this);
    }

    if (rightButtonsActivated && hasRightButtons && isSwipingRight) {
      nextRightButtonsActivated = false;
      onRightButtonsDeactivate(e, gestureState, this);
    }

    const needsUpdate =
      nextLeftActionActivated !== leftActionActivated ||
      nextLeftButtonsActivated !== leftButtonsActivated ||
      nextRightActionActivated !== rightActionActivated ||
      nextRightButtonsActivated !== rightButtonsActivated;

    if (needsUpdate) {
      this.setState({
        leftActionActivated: nextLeftActionActivated,
        leftButtonsActivated: nextLeftButtonsActivated,
        rightActionActivated: nextRightActionActivated,
        rightButtonsActivated: nextRightButtonsActivated,
      });
    }
  };

  _handlePanResponderEnd = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    const {
      onLeftActionRelease,
      onLeftActionDeactivate,
      onLeftButtonsOpenRelease,
      onLeftButtonsCloseRelease,
      onRightActionRelease,
      onRightActionDeactivate,
      onRightButtonsOpenRelease,
      onRightButtonsCloseRelease,
      onSwipeRelease,
    } = this.props;
    const {
      leftActionActivated,
      leftButtonsOpen,
      leftButtonsActivated,
      rightActionActivated,
      rightButtonsOpen,
      rightButtonsActivated,
      pan,
    } = this.state;
    const animationFn = this._getReleaseAnimationFn();
    const animationConfig = this._getReleaseAnimationConfig() as {
      toValue: {
        x: number;
        y: number;
      };
    };

    onSwipeRelease(event, gestureState, this);

    if (leftActionActivated) {
      onLeftActionRelease(event, gestureState, this);
    }

    if (rightActionActivated) {
      onRightActionRelease(event, gestureState, this);
    }

    if (leftButtonsActivated && !leftButtonsOpen) {
      onLeftButtonsOpenRelease(event, gestureState, this);
    }

    if (!leftButtonsActivated && leftButtonsOpen) {
      onLeftButtonsCloseRelease(event, gestureState, this);
    }

    if (rightButtonsActivated && !rightButtonsOpen) {
      onRightButtonsOpenRelease(event, gestureState, this);
    }

    if (!rightButtonsActivated && rightButtonsOpen) {
      onRightButtonsCloseRelease(event, gestureState, this);
    }

    this.setState({
      lastOffset: {x: animationConfig.toValue.x, y: animationConfig.toValue.y},
      leftActionActivated: false,
      rightActionActivated: false,
      leftButtonsOpen: leftButtonsActivated,
      rightButtonsOpen: rightButtonsActivated,
    });

    pan.flattenOffset();

    animationFn(pan, animationConfig).start(() => {
      if (this._unmounted) {
        return;
      }

      const {
        onLeftActionComplete,
        onLeftButtonsOpenComplete,
        onLeftButtonsCloseComplete,
        onRightActionComplete,
        onRightButtonsOpenComplete,
        onRightButtonsCloseComplete,
        onSwipeComplete,
      } = this.props;

      onSwipeComplete(event, gestureState, this);

      if (leftActionActivated) {
        onLeftActionComplete(event, gestureState, this);
        onLeftActionDeactivate(event, gestureState, this);
      }

      if (rightActionActivated) {
        onRightActionComplete(event, gestureState, this);
        onRightActionDeactivate(event, gestureState, this);
      }

      if (leftButtonsActivated && !leftButtonsOpen) {
        onLeftButtonsOpenComplete(event, gestureState, this);
      }

      if (!leftButtonsActivated && leftButtonsOpen) {
        onLeftButtonsCloseComplete(event, gestureState, this);
      }

      if (rightButtonsActivated && !rightButtonsOpen) {
        onRightButtonsOpenComplete(event, gestureState, this);
      }

      if (!rightButtonsActivated && rightButtonsOpen) {
        onRightButtonsCloseComplete(event, gestureState, this);
      }
    });
    return true;
  };

  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    onMoveShouldSetPanResponderCapture: this._handleMoveShouldSetPanResponder,
    onPanResponderGrant: this._handlePanResponderStart,
    onPanResponderMove: this._handlePanResponderMove,
    onPanResponderRelease: this._handlePanResponderEnd,
    onPanResponderTerminate: this._handlePanResponderEnd,
    onPanResponderTerminationRequest: this._handlePanResponderEnd,
  });

  _handleLayout = ({
    nativeEvent: {
      layout: {width},
    },
  }: {
    nativeEvent: {layout: {width: number}};
  }) => this.setState({width});

  _canSwipeRight() {
    return this.props.leftContent || this._hasLeftButtons();
  }

  _canSwipeLeft() {
    return this.props.rightContent || this._hasRightButtons();
  }

  _hasLeftButtons() {
    const {leftButtons, leftContent} = this.props;

    return !leftContent && leftButtons && leftButtons.length;
  }

  _hasRightButtons() {
    const {rightButtons, rightContent} = this.props;

    return !rightContent && rightButtons && rightButtons.length;
  }

  _getReleaseAnimationFn() {
    const {
      leftActionReleaseAnimationFn,
      leftButtonsOpenReleaseAnimationFn,
      leftButtonsCloseReleaseAnimationFn,
      rightActionReleaseAnimationFn,
      rightButtonsOpenReleaseAnimationFn,
      rightButtonsCloseReleaseAnimationFn,
      swipeReleaseAnimationFn,
    } = this.props;
    const {
      leftActionActivated,
      leftButtonsActivated,
      leftButtonsOpen,
      rightActionActivated,
      rightButtonsActivated,
      rightButtonsOpen,
    } = this.state;

    if (leftActionActivated && leftActionReleaseAnimationFn) {
      return leftActionReleaseAnimationFn;
    }

    if (rightActionActivated && rightActionReleaseAnimationFn) {
      return rightActionReleaseAnimationFn;
    }

    if (leftButtonsActivated && leftButtonsOpenReleaseAnimationFn) {
      return leftButtonsOpenReleaseAnimationFn;
    }

    if (
      !leftButtonsActivated &&
      leftButtonsOpen &&
      leftButtonsCloseReleaseAnimationFn
    ) {
      return leftButtonsCloseReleaseAnimationFn;
    }

    if (rightButtonsActivated && rightButtonsOpenReleaseAnimationFn) {
      return rightButtonsOpenReleaseAnimationFn;
    }

    if (
      !rightButtonsActivated &&
      rightButtonsOpen &&
      rightButtonsCloseReleaseAnimationFn
    ) {
      return rightButtonsCloseReleaseAnimationFn;
    }

    return swipeReleaseAnimationFn;
  }

  _getReleaseAnimationConfig() {
    const {
      leftActionReleaseAnimationConfig,
      leftButtons,
      leftButtonsOpenReleaseAnimationConfig,
      leftButtonsCloseReleaseAnimationConfig,
      leftButtonWidth,
      rightActionReleaseAnimationConfig,
      rightButtons,
      rightButtonsOpenReleaseAnimationConfig,
      rightButtonsCloseReleaseAnimationConfig,
      rightButtonWidth,
      swipeReleaseAnimationConfig,
    } = this.props;
    const {
      leftActionActivated,
      leftButtonsActivated,
      leftButtonsOpen,
      rightActionActivated,
      rightButtonsActivated,
      rightButtonsOpen,
    } = this.state;

    if (leftActionActivated && leftActionReleaseAnimationConfig) {
      return leftActionReleaseAnimationConfig;
    }

    if (rightActionActivated && rightActionReleaseAnimationConfig) {
      return rightActionReleaseAnimationConfig;
    }

    if (leftButtonsActivated) {
      return {
        ...swipeReleaseAnimationConfig,
        toValue: {
          x: leftButtons.length * leftButtonWidth,
          y: 0,
        },
        ...leftButtonsOpenReleaseAnimationConfig,
      };
    }

    if (rightButtonsActivated) {
      return {
        ...swipeReleaseAnimationConfig,
        toValue: {
          x: rightButtons.length * rightButtonWidth * -1,
          y: 0,
        },
        ...rightButtonsOpenReleaseAnimationConfig,
      };
    }

    if (
      !leftButtonsActivated &&
      leftButtonsOpen &&
      leftButtonsCloseReleaseAnimationConfig
    ) {
      return leftButtonsCloseReleaseAnimationConfig;
    }

    if (
      !rightButtonsActivated &&
      rightButtonsOpen &&
      rightButtonsCloseReleaseAnimationConfig
    ) {
      return rightButtonsCloseReleaseAnimationConfig;
    }

    return swipeReleaseAnimationConfig;
  }

  _renderButtons(buttons: JSX.Element[], isLeftButtons: boolean) {
    const {leftButtonContainerStyle, rightButtonContainerStyle} = this.props;
    const {pan, width} = this.state;
    const canSwipeLeft = this._canSwipeLeft();
    const canSwipeRight = this._canSwipeRight();
    const count = buttons.length;
    const leftEnd = canSwipeLeft ? -width : 0;
    const rightEnd = canSwipeRight ? width : 0;
    const inputRange = isLeftButtons ? [0, rightEnd] : [leftEnd, 0];

    return buttons.map((buttonContent, index) => {
      const outputMultiplier = -index / count;
      const outputRange = isLeftButtons
        ? [0, rightEnd * outputMultiplier]
        : [leftEnd * outputMultiplier, 0];
      const transform = [
        {
          translateX: pan.x.interpolate({
            inputRange,
            outputRange,
            extrapolate: 'clamp',
          }),
        },
      ];
      const buttonStyle = [
        StyleSheet.absoluteFill,
        {width, transform},
        isLeftButtons ? leftButtonContainerStyle : rightButtonContainerStyle,
      ];

      return (
        <Animated.View key={index} style={buttonStyle}>
          {buttonContent}
        </Animated.View>
      );
    });
  }

  render() {
    const {
      children,
      contentContainerStyle,
      leftButtons,
      leftContainerStyle,
      leftContent,
      rightButtons,
      rightContainerStyle,
      rightContent,
      style,
      showStaticLeftButton,
      // staticLeftButtonAction,
      staticLeftButtons,
      ...props
    } = this.props;
    const {pan, width} = this.state;
    const canSwipeLeft = this._canSwipeLeft();
    const canSwipeRight = this._canSwipeRight();

    const transform = [
      {
        translateX: pan.x.interpolate({
          inputRange: [canSwipeLeft ? -width : 0, canSwipeRight ? width : 0],
          outputRange: [
            canSwipeLeft ? -width + StyleSheet.hairlineWidth : 0,
            canSwipeRight ? width - StyleSheet.hairlineWidth : 0,
          ],
          extrapolate: 'clamp',
        }),
      },
    ];

    return (
      <View
        onLayout={this._handleLayout}
        style={[styles.container, style]}
        {...this._panResponder.panHandlers}
        {...props}>
        {canSwipeRight && (
          <Animated.View
            style={[
              {transform, marginLeft: -width, width},
              leftContainerStyle,
            ]}>
            {leftContent || this._renderButtons(leftButtons, true)}
          </Animated.View>
        )}
        <Animated.View
          style={[{transform}, styles.content, contentContainerStyle]}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {showStaticLeftButton && staticLeftButtons}
            {children}
          </View>
        </Animated.View>
        {canSwipeLeft && (
          <Animated.View
            style={[
              {transform, marginRight: -width, width},
              rightContainerStyle,
            ]}>
            {rightContent || this._renderButtons(rightButtons, false)}
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
});
