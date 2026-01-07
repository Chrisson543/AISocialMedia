"use client"

import { JSX, useState } from "react";

type TabViews = {name: string, items: (JSX.Element | null)[]}[]


export default function Tabs({tabViews}: {tabViews: TabViews}){
    
    
    const [selectedView, setSelectedView] = useState<string>(tabViews[0].name)
    
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex space-x-5 font-bold p-6 text-gray-500">
                {
                    tabViews.map(view => {
                        return (
                            <button key={view.name} onClick={() => {setSelectedView(view.name)}} className={selectedView == view.name ?"border-b-4 border-blue-400 text-white" : ""}>
                                {view.name}
                            </button>
                        )
                    })
                }
            </div>
            <div className="flex flex-col h-full w-full">
                {
                    tabViews.find(view => view.name == selectedView)!.items.length > 0 ? tabViews.find(view => view.name == selectedView)!.items : <div className="flex w-full h-full items-center justify-center font-bold text-2xl">No Posts</div>
                }
            </div>
        </div>
    )
}