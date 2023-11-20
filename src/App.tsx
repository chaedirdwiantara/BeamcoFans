import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import {AppProvider} from './context/app.context';
import {PortalProvider} from '@gorhom/portal';
import {RootStackScreen} from './navigations';
import {QueryClientProvider} from 'react-query';
import {CrashRecord} from './service/crashReport';
import codePush from 'react-native-code-push';
import {queryClient} from './service/queryClient';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

import * as Sentry from '@sentry/react-native';
import linking from './navigations/linking';

Sentry.init({
  dsn: 'https://0eb38ae5f289dd77f6943db24ce7b549@o4505644342050816.ingest.sentry.io/4505820192702464',
});

const App = () => {
  const errorHandler = (error: Error, stackTrace: string) => {
    CrashRecord({error: error});
  };

  return (
    <NavigationContainer linking={linking}>
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

export default codePush(codePushOptions)(App);
