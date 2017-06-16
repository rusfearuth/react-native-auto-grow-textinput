// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TextInput,
} from 'react-native';
const omit = require('lodash.omit');

type Props = {
  maxHeight?: number;
  minHeight?: number;
  style: View.propTypes.style;
  onResized?: () => void;
  value: ?string;
};

type State = {
  limit: ?number;
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
      height: this._minHeight()
    };
  }

  render() {
    const newProps = omit({
      ...this.props,
      ...Platform.select({
        ios: {
          onContentSizeChange: this._onContentSizeChange,
        },
        android: {
          onChange: this._onContentSizeChange
        },
      }),
    }, [ 'style', 'maxLines' ]);

    const externalStyle = this.props.style;
    const textInputStyle = {
      height: this.state.height
    };

    return (
      <TextInput
        { ...newProps }
        multiline={ true }
        style={[ externalStyle, textInputStyle ]}
      />
    );
  }

  _onContentSizeChange = (event) => {
    const { contentSize } = event.nativeEvent;
    const height = this._calcHeight(contentSize.height, this.state.limit);

    if (height === this.state.height) {
      return;
    }
    this.setState({ height });
    this.props.onResized && this.props.onResized();
  }
  
  _calcHeight(actualHeight: number, limit:? number) {
    return limit
      ? Math.min(limit, actualHeight)
      : Math.max(this._minHeight(), actualHeight);
  }
  
  _minHeight() {
    return this.props.minHeight || 30;
  }
};
