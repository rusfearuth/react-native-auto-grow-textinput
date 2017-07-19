# ReactNative Auto Grow TextInput

<a href="https://www.npmjs.com/package/react-native-auto-grow-textinput"><img src="https://img.shields.io/npm/v/react-native-auto-grow-textinput.svg"></a>

This component allows to create auto grow text input for both platforms (iOS and Android).


## Attantion

If you use ReactNative <= 0.43.X in your poject, you should install version 1.1.2 of ReactNative Auto Grow TextInput.

```bash
$ yarn add react-native-auto-grow-textinput@1.1.2
```

## Getting started
First of all, you need to install `react-native-auto-grow-textinput` to your project.

```bash
$ yarn add react-native-auto-grow-textinput
```

After, you can use it in your project:

```javascript
import { AutoGrowInputText } from 'react-native-auto-grow-textinput';

...
// If you don't need max height
<AutoGrowInputText placeholder='Some text here' />
// else if you need to set up max height
<AutoGrowInputText placeholder='Some text here' maxHeight={ 120 } />
...
// Also you can use any other TextInput props with AutoGrowInputText component
```

I hope it'll save your time.
