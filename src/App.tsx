import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import {AppProvider} from './context/app.context';
import {PortalProvider} from '@gorhom/portal';
import {RootStackScreen} from './navigations';
import {QueryClient, QueryClientProvider} from 'react-query';
import {CrashLog, CrashRecord} from './service/crashReport';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://0eb38ae5f289dd77f6943db24ce7b549@o4505644342050816.ingest.sentry.io/4505820192702464',
});

const App = () => {
  const queryClient = new QueryClient();

  const errorHandler = (error: Error, stackTrace: string) => {
    CrashLog({message: stackTrace});
    CrashRecord({error: error});
  };

  return (
    <NavigationContainer>
      <PortalProvider>
        <AppProvider>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary onError={errorHandler}>
              <RootStackScreen />
            </ErrorBoundary>
          </QueryClientProvider>
        </AppProvider>
      </PortalProvider>
    </NavigationContainer>
  );
};

export default Sentry.wrap(App);
