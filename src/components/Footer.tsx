import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://github.com/sohan-sadhukhan",
      label: "GitHub",
      icon: <GithubIcon size={20} />,
    },
    {
      href: "https://linkedin.com/in/sohansadhukhan",
      label: "LinkedIn",
      icon: <LinkedinIcon size={20} />,
    },
    {
      href: "mailto:mrsohansadhukhan@gmail.com",
      label: "Email",
      icon: <MailIcon size={20} />,
    },
  ];

  return (
    <footer
      className="bg-primary"
      aria-label="Site footer">
      <div
        className={cn(
          "text-background mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-6 sm:flex-row sm:justify-between",
        )}>
        <small
          className="text-xs text-gray-300 dark:text-gray-700"
          aria-label="Copyright information">
          &copy; {currentYear} ALL RIGHTS RESERVED
        </small>

        <small
          className="mt-4 text-xs sm:mt-0"
          aria-label="Designer and developer credit">
          Designed &amp; Developed by
          <strong className="font-semibold"> Sohan Sadhukhan</strong>
        </small>

        <nav aria-label="Social media links">
          <ul className="mt-4 flex justify-center gap-5 sm:my-4">
            {socialLinks.map((data) => (
              <li key={data.href}>
                <a
                  href={data.href}
                  aria-label={`Visit my ${data.label} profile`}
                  target="_blank"
                  rel="noreferrer noopener">
                  <span
                    aria-hidden="true"
                    className="bg-background hover:bg-muted text-primary hover:ring-muted-foreground/20 flex size-7 items-center justify-center rounded-full p-1 duration-75 hover:scale-105 hover:-rotate-6 hover:ring-6">
                    {data.icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
