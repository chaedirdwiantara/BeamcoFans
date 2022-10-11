import React from 'react';
import {BaseProvider} from './base.context';

const provider = (provider: any, props = {}) => [provider, props];

type AppProviderProps = {
  children: React.ReactNode;
};

const ProviderComposer = ({providers, children}: any) => {
  for (let i = providers.length - 1; i >= 0; --i) {
    const [Provider, props] = providers[i];
    children = <Provider {...props}>{children}</Provider>;
  }
  return children;
};

export const AppProvider = ({children}: AppProviderProps) => {
  return (
    <ProviderComposer providers={[provider(BaseProvider)]}>
      {children}
    </ProviderComposer>
  );
};
