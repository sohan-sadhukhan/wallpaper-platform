import { UserCard } from "@/components/Admin/UserCard";
import prisma from "@/lib/database/dbClient";
import authUserServer from "@/server/authUserServer";
import { User } from "lucide-react";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await authUserServer();

  if (session.user.role !== "ADMIN") {
    redirect("/signin");
  }

  const users = await prisma.user.findMany({
    include: {
      wallpapers: true,
    },
  });

  return (
    <section className="min-h-screen px-4 py-8 sm:px-6">
      {/* Page header */}
      <header className="mb-8 border-b border-white/[0.07] pb-6 sm:mb-10 sm:pb-8">
        <p className="mb-1 font-mono text-[10px] tracking-[0.3em] text-[#7c6fff] uppercase sm:text-xs">
          Control Panel
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          User Management
        </h1>
        <p className="mt-1.5 text-xs text-white/35 sm:text-sm">
          {users.length} registered user{users.length !== 1 ? "s" : ""}
        </p>
      </header>

      {/* Users grid */}
      {users.length === 0 ?
        <section className="flex flex-col items-center justify-center py-32 text-center">
          <div
            className="mb-3 text-5xl opacity-20"
            aria-hidden="true">
            <User
              height={10}
              width={10}
            />
          </div>
          <p className="text-base font-medium text-white/40">No users found</p>
        </section>
      : <section aria-label="Registered users">
          <ul className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 xl:gap-5">
            {users.map((user) => (
              <li key={user.id}>
                <UserCard user={user} />
              </li>
            ))}
          </ul>
        </section>
      }
    </section>
  );
};

export default page;
