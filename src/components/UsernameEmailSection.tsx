import authUserServer from "@/server/authUserServer";
import UsernameEmailForm from "./Forms/UsernameEmailForm";

const UsernameEmailSection = async () => {
  const session = await authUserServer();

  return (
    <UsernameEmailForm
      username={session.user.username ?? ""}
      email={session.user.email}
    />
  );
};

export default UsernameEmailSection;
