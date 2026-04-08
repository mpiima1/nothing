import '../styles/globals.css'

export const metadata = {
  title: 'Nothing Store - Buy Absolutely Nothing',
  description: 'The revolutionary e-commerce platform selling what you never knew you needed.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
