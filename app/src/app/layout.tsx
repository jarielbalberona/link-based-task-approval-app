export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return { children };
}

export const dynamic = "force-dynamic";
