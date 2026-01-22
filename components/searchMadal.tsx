"use client"

import { AddToHistory, clearHistory, deleteFromHistory, getSearchHistory, SearchProfiles } from "@/reducers/search/api"
import { IHistory } from "@/reducers/search/search"
import { RootState } from "@/store/store"
import { X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const SearchMadal = ({ isOpen }: { isOpen: boolean }) => {
    const dispatch = useDispatch() as any
    const { isLoading, searchHistory } = useSelector((state: RootState) => state.search)
    const [search, setSearch] = useState("")
    useEffect(() => {
        if (search != "") {
        dispatch(SearchProfiles(search))
        }
        else {
            dispatch(getSearchHistory())
        }
    }, [isOpen, search])
    return ( 
        <div className={`${isOpen ? "flex w-[29%] rounded-r-2xl fixed bg-white dark:bg-black" : "hidden w-[0%]"} ml-16 border-r h-screen flex-col gap-[2vh] items-start overflow-x-hidden overflow-y-auto transition-all duration-300 p-[5vh_0]`}>
            <p className="text-3xl pl-[4%] mb-[2vh] font-semibold">Search Request</p>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="p-[1vh_20px] rounded-full bg-[#F3F5F7] dark:bg-[#25292E] w-[92%] m-[0_auto] outline-0" placeholder="Search" type="search" />
            <div className="flex justify-between w-[90%] m-[0_auto] items-center">
                <p className="text-xl font-semibold">Recent</p>
                <button onClick={() => dispatch(clearHistory(1))} className="text-[#748CDD] cursor-pointer hover:underline">Clear all</button>
            </div>
            <div className="flex flex-col w-full m-[0_auto]">
                {search == "" ?
                    (searchHistory?.map((history: IHistory) => {
                        return <div key={history?.id} onClick={() => window.location.pathname = `/profile/${history?.users.id}`} className="flex p-[1vh_4%] cursor-pointer hover:bg-[#ffffff2d] p-[] justify-between items-center">
                            {history?.users?.avatar ? (<img alt="profile photo" width={30} draggable={false} className={`h-11 w-11 rounded-full`} height={30} src={ "https://instagram-api.softclub.tj/images/"+history?.users?.avatar } />) : (<Image draggable={false} className={`w-11 h-11 rounded-full`} src="/Profile.jpg" alt="Profile Photo" width={30} height={30} />)}
                            <div className="flex flex-col w-[75%] items-start">
                                <p className="font-semibold">{history?.users?.userName}</p>
                                <p className="line-clamp-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure tempore perferendis dolor aliquid eius eos eveniet? Quibusdam, molestiae debitis. Repellendus maiores inventore impedit pariatur quas debitis ea voluptatum, et perspiciatis!</p>
                            </div>
                            <X onClick={() => dispatch(deleteFromHistory(history.id))} className="cursor-pointer" />
                        </div>
                    }))
                : null}
                {search != "" ?
                    (searchHistory?.map((profile: any) => {
                        return <div onClick={() => {
                            dispatch(AddToHistory(profile?.id))
                            window.location.pathname = `/profile/${profile?.id}`
                        }} key={profile?.id} className="flex p-[1vh_4%] cursor-pointer hover:bg-[#ffffff2d] p-[] justify-between items-center">
                            {profile?.avatar ? (<img alt="profile photo" width={30} draggable={false} className={`h-11 w-11 rounded-full`} height={30} src={ "https://instagram-api.softclub.tj/images/"+profile?.avatar } />) : (<Image draggable={false} className={`w-11 h-11 rounded-full`} src="/Profile.jpg" alt="Profile Photo" width={30} height={30} />)}
                            <div className="flex flex-col w-[85%] items-start">
                                <p className="font-semibold">{profile?.userName}</p>
                                <p className="line-clamp-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure tempore perferendis dolor aliquid eius eos eveniet? Quibusdam, molestiae debitis. Repellendus maiores inventore impedit pariatur quas debitis ea voluptatum, et perspiciatis!</p>
                            </div>
                        </div>
                    }))
                : null}
                {isLoading ? (<p className="text-center w-full m-[20vh_auto]">Loading</p>) : null}
            </div>
        </div>
    )
}

export default SearchMadal