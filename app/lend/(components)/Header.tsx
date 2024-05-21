import formatedString from "@/lib/string";

type HeaderProps = {
  page: "main" | "turbo";
  setPage: (page: "main" | "turbo") => void;
};

const Header = ({ setPage, page }: HeaderProps) => {
  const data: {
    title: string;
    page_id: "main" | "turbo";
  }[] = [
    {
      title: "Solend Main Pool",
      page_id: "main",
    },
    {
      title: "Solend Turbo Sol",
      page_id: "turbo",
    },
  ];
  return (
    <div className="flex gap-0 sm:gap-x-2 z-10 bg-[#0d111b] rounded-full mb-3">
      {data.map((tab, index) => (
        <div
          // value={tab.page_id.toLocaleLowerCase()}
          className="text-xs sm:text-sm md:text-lg text-center hyphens-none flex md:flex px-3 sm:px-5 py-2 w-max cursor-pointer font-['DM Sans'] text-[#d9f8ff] hover:text-white transition-all box-border data-[state=active]:bg-[#D9F8FF10] rounded-full transition-none shadow-none border-none"
          style={{
            border:
              formatedString(tab.page_id).toLocaleLowerCase() === page
                ? "1px solid #D9F8FF"
                : "",
            boxShadow:
              formatedString(tab.page_id).toLocaleLowerCase() === page
                ? "0 0 4px 1px #d9f8ff75"
                : "",
          }}
          key={index}
          onClick={() => setPage(tab.page_id)}
        >
          {tab.title}
        </div>
      ))}
    </div>
  );
};

export default Header;
