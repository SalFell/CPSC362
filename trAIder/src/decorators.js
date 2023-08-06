// client/src/decorators.js

import React from 'react';

// Decorator to add a border to form inputs
export function withBorder(Component) {
  return (props) => (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <Component {...props} />
    </div>
  );
}

// Decorator to add a background color to form inputs
export function withBackgroundColor(Component) {
  return (props) => (
    <div style={{ backgroundColor: '#000000', padding: '10px' }}>
      <Component {...props} />
    </div>
  );
}
