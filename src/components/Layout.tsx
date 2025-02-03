import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import Header from "./Header";
import Login from "@/pages/login";

export function ProtectedLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}

export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    return (
      <ProtectedLayout>
        <Component {...props} />
      </ProtectedLayout>
    );
  };
}
