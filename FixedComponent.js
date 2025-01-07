```javascript
// BuggyComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const BuggyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData({ name: 'John Doe', age: 30 });
    };
    fetchData();
  }, []);

  // INCORRECT: Accessing data.name before it's initialized
  return (
    <View>
      <Text>Name: {data.name}</Text> {/* Error here */}
      <Text>Age: {data.age}</Text> {/* Error here */}
    </View>
  );
};

export default BuggyComponent;
```

```javascript
// FixedComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const FixedComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData({ name: 'John Doe', age: 30 });
    };
    fetchData();
  }, []);

  // CORRECT: Using optional chaining and nullish coalescing
  return (
    <View>
      <Text>Name: {data?.name ?? 'Loading...'}</Text>
      <Text>Age: {data?.age ?? 'Loading...'}</Text>
    </View>
  );
};

export default FixedComponent;
```