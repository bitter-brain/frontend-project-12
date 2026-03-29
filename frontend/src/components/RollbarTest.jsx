import React from 'react';
import { useRollbar } from '@rollbar/react';

function TestRollbar() {
  const rollbar = useRollbar();

  return (
    <div>
      <button className="btn btn-primary" onClick={() => rollbar.info('Test message from React')}>
        Send Test Message
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          throw new Error('Test error from React ErrorBoundary');
        }}
      >
        Trigger Test Error
      </button>
    </div>
  );
}

export default TestRollbar