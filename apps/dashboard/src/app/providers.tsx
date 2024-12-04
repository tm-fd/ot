'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { SWRConfig } from 'swr';
import { swrConfig } from '@/lib/swr-config';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider >
      <NextThemesProvider
        attribute='class'
        defaultTheme='dark'
        themes={['light', 'dark']}
      >
        <SWRConfig value={swrConfig}>
        {children}
        </SWRConfig>
      </NextThemesProvider>
    </NextUIProvider>
  )
}