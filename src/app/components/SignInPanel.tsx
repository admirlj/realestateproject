import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@nextui-org/react";
import UserProfilePanel from "./UserProfilePanel";
import prisma from "../lib/prisma";

const SingInPanel = async () => {
  const { isAuthenticated, getUser } = await getKindeServerSession();

  if (await isAuthenticated()) {
    const user = await getUser();
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return (
      <div>{dbUser != undefined && <UserProfilePanel user={dbUser} />}</div>
    );
  }

  return (
    <div className="flex  gap-3">
      <Button color="primary">
        <LoginLink>Sign In</LoginLink>
      </Button>
      <Button color="secondary">
        <LoginLink>Sign Up</LoginLink>
      </Button>
    </div>
  );
};

export default SingInPanel;
