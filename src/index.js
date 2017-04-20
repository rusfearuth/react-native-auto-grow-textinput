// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TextInput,
} from 'react-native';
import _ from 'lodash';

type Props = {
  maxHeight?: number;
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
      height: 30,
    };
  }

  render() {
    const newProps = _.omit({
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
        underlineColorAndroid='transparent'
        style={[ externalStyle, textInputStyle ]}
      />
    );
  }

  _onContentSizeChange = (event) => {
    const { contentSize } = event.nativeEvent;
    const height = _calcHeight(contentSize.height, this.state.limit);

    if (height === this.state.height) {
      return;
    }
    this.setState({ height });
    this.props.onResized && this.props.onResized();
  }

};

const _calcHeight = (actualHeight: number, limit:? number) =>
  limit ? Math.min(limit, actualHeight):  Math.max(30, actualHeight);
