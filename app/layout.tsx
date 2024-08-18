import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getUserEmail } from "@/actions/getUser";
import { UserProvider } from "@/context/userContext"; // Import UserProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the user's email on the server side
  const email = await getUserEmail();

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the children with UserProvider and pass the email */}
        <UserProvider email={email}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
