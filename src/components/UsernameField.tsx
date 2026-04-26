import { LockIcon } from "lucide-react";
import Link from "next/link";
import { Field, FieldLabel } from "./shadcnui/field";
import { Input } from "./shadcnui/input";

type UsernameFieldProps = {
  username: string;
};

const UsernameField = ({ username }: UsernameFieldProps) => {
  return (
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor="username">Username</FieldLabel>
        {/* Link to settings */}
        <Link
          href="/"
          className="text-xs text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          aria-label="Go to settings to change your username">
          Edit
        </Link>
      </div>

      <div className="relative">
        {/* Read-only input */}
        <Input
          id="username"
          value={`@${username}`}
          readOnly
          disabled
          aria-readonly="true"
          aria-label="Username (read-only)"
          className="cursor-not-allowed text-zinc-500 dark:text-zinc-400"
        />
        <LockIcon
          className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400"
          aria-hidden="true"
        />
      </div>

      <p className="text-xs text-zinc-400">
        You can&apos;t change your username here.
        <Link
          href="/settings"
          className="text-blue-600 transition-colors hover:text-blue-700 hover:underline">
          Change username in Settings
        </Link>
      </p>
    </Field>
  );
};

export default UsernameField;
