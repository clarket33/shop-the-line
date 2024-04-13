export const metadata = {
  title: 'Shop the Line',
  description: 'Explore a comprehensive view of upcoming professional sports games, while accessing real-time betting odds from top bookmakers.',
}

export default function RootLayout({ children }) {
  return (<html lang="en">
      <body>
          <div id="root">{children}</div>
      </body>
  </html>)
}