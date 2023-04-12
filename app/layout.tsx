import "./globals.css";

export const metadata = {
  title: "FrontEndMentor | Age Calculator",
  description: "Age Calculator",
  icons: "/favicon-32x32.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
