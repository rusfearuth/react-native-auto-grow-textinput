// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

const omit = (obj, keys) => Object.keys(obj)
  .filter((key) => keys.indexOf(key) < 0)
  .reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {})

type _Style = {[key: string]: Object} | number;
export type Style = _Style | Array<_Style>;

type Props = {
  maxHeight?: number;
  minHeight?: number;
  style?: Style;
  onResized?: () => void;
  value: ?string;
  shrinkIfEmpty?: boolean;
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
      onContentSizeChange: this._onContentSizeChange,
    }, [ 'style', 'maxLines' ]);

    const { value, shrinkIfEmpty } = newProps;

    const externalStyle = this.props.style;
    const textInputStyle = {
      height: (shrinkIfEmpty || !value) ? this._minHeight() : this.state.height
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
  
  _minHeight = () => this.props.minHeight || 30;
};
