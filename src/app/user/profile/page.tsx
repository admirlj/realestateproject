import PageTitle from "@/app/components/PageTitle";
import { getUserById } from "@/app/lib/actions/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Avatar, Card } from "@nextui-org/react";
import { redirect } from "next/navigation";
import SectionTitle from "./_components/SectionTitle";
import type { ReactNode } from "react";
import UploadAvatar from "./_components/UploadAvatar";

const UserProfile = async () => {
  const { getUser } = await getKindeServerSession();

  const user = await getUser();

  const dbUser = user?.id ? await getUserById(user.id) : null;


  return (
    <>
      <PageTitle
        title="Profile Settings"
        linkCaption="Back to Homepage"
        href="/"
      />
      <Card className="m-4 p-4">
        <SectionTitle title="Basic Information" />
        <div className="flex">
          <div className="flex flex-col items-center">
            <Avatar
              className="w-20 h-20"
              src={dbUser?.avatarUrl ?? "/profile.png"}
            />
            <UploadAvatar userId={user?.id} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Attribute
            title="Name"
            value={`${dbUser?.firstName} ${dbUser?.lastName}`}
          />
          <Attribute title="Email" value={`${dbUser?.email}`} />
          <Attribute
            title="Registreted On"
            value={`${dbUser?.createdAt?.toLocaleDateString()}`}
          />
          <Attribute
            title="Properties posted"
            value={"1"} //hardcoded temprarly
          />
        </div>
      </Card>
    </>
  );
};

export default UserProfile;

const Attribute = ({ title, value }: { title: string; value: ReactNode }) => {
  return (
    <div className="flex flex-row text-sm">
      <span className="text-slate-800 font-semibold">{title}</span>
      <span className="text-slate-600 ml-2">{value}</span>
    </div>
  );
};
