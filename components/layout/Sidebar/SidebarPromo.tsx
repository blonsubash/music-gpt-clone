import { PROMO_MESSAGE } from "@/lib/constants";

export function SidebarPromo() {
  return (
    <div className="p-4 ">
      <div
        className="rounded-xl px-3 py-2.5 text-xs"
        style={{
          background:
            "linear-gradient(233.67deg, rgba(48, 7, 255, 0.29) -2.43%, rgba(209, 40, 150, 0.271346) 58.32%, rgba(255, 86, 35, 0.25) 98.83%)",
          backgroundColor: "#1D2125",
        }}
      >
        <h5 className="text-sm font-semibold text-white">
          Model v6 Pro is here!
        </h5>
        <p className=" text-white/65 font-normal text-xs">{PROMO_MESSAGE}</p>
      </div>
    </div>
  );
}
