
const SearchMadal = ({ isOpen } : { isOpen: boolean }) => {
  return (
    <div className={`${isOpen ? "flex w-[29%] fixed bg-white dark:bg-black" : "hidden w-[0%]"} ml-16.5 pr-7 border-r h-screen flex-col gap-[2vh] items-start overflow-x-hidden overflow-y-auto transition-all duration-300 p-[5vh_2%]`}>
        <p className="text-3xl mb-[2vh] font-semibold">Search Request</p>
        <input className="p-[1vh_20px] rounded-full bg-[#F3F5F7] dark:bg-[#25292E] w-full outline-0" placeholder="Search" type="search" />
    </div>
  )
}

export default SearchMadal