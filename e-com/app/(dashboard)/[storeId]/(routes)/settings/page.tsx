import SettingForm from "@/components/SettingForm";
import prismadb from "@/lib/prismadb";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

interface settingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingPage: React.FC<settingsPageProps> = async ({params}) => {
  const {userId} = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingPage;
