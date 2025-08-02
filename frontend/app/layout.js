'use client';

import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-start h-16 items-center">
                  <h1 className="text-xl text-gray-900">
                    Employee Directory
                  </h1>
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </ApolloProvider>
      </body>
    </html>
  );
}