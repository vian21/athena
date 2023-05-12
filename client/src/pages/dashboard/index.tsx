import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function dashboard() {
    const { data: session, status, } = useSession();

    const router = useRouter();

    if (status === "loading") {
        return <p>Authenticating...</p>;
    } else if (status === "unauthenticated") {
        void router.push("api/auth/signin");
    }

    switch (session?.user?.role) {
        case 0:
            return <p>Admin Dashboard</p>;
        case 1:
            return <p>User Dashboard</p>;
    }
}