import * as React from 'react';
import {TextInputProperties} from 'react-native';

export interface AutoGrowTextInputProps extends TextInputProperties {
  readonly maxHeight?: number;
  readonly minHeight?: number;
}

export declare class AutoGrowTextInput extends React.Component<
  AutoGrowTextInputProps,
  {}
> {

}
