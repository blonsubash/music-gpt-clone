import { MainLogoIcon } from "@/app/assets/icons";
import Image from "next/image";

export function SidebarLogo() {
  return (
    <div className="p-6 ">
      <div className="flex items-center gap-3">
        <Image src={MainLogoIcon} alt="MusicGPT Logo" width={28} height={28} />
        <span className="text-base font-medium text-white">MusicGPT</span>
      </div>
    </div>
  );
}
