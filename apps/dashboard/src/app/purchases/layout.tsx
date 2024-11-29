import { Header } from '@/components/Header'

export default async function PurshasesLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>{children}</div>
    )
  }