/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TextInput,
} from 'react-native';

type Props = {
  maxHeight?: number;
  style: View.propTypes.style;
  onResized?: () => void;
};

type State = {
  limit: ?number;
  text: string;
  height: number;
};

export default class AutoGrowTextInput extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    let limit = null;

    if (this.props.maxLines) {
      limit = this.props.maxHeight;
    }

    this.state = {
      limit,
      text: '',
      height: 30,
    };
  }

  render() {
    const newProps = Object.assign({}, this.props);
    const externalStyle = this.props.style;
    const textInputStyle = {
      height: this.state.height,
    };

    delete newProps['style'];
    delete newProps['maxLines'];

    return (
      <TextInput
        { ...newProps }
        multiline={ true }
        underlineColorAndroid='transparent'
        onChange={ (event) => {
          const { contentSize } = event.nativeEvent;
          const allowResized = this.state.height !== contentSize.height;
          const height = this._calcHeight(contentSize.height);

          this.setState({
            text: event.nativeEvent.text,
            height,
          });

          if (allowResized && this.props.onResized) {
            this.props.onResized();
          }
        }}
        style={[ externalStyle, textInputStyle ]}
      />
    );
  }

  _calcHeight(actualHeight: number): number {
    let result;

    if (this.state.limit) {
      result = this.state.limit > actualHeight
        ? actualHeight
        : this.state.limit;
    }
    else {
      result = Math.max(30, actualHeight);
    }

    return result;
  }
};
