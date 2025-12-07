"use client"

import { useState } from "react";

type TabViews = {[key: string]: any[]}

export default function Tabs({tabViews}: {tabViews: TabViews}){
    
    
    type TabViewsKey = keyof typeof tabViews;
    const [selectedView, setSelectedView] = useState<TabViewsKey>(Object.keys(tabViews)[0])
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex space-x-5 font-bold p-6 text-gray-500">
                {
                    (Object.keys(tabViews) as TabViewsKey[]).map((view: TabViewsKey) => (
                        <button key={view} onClick={() => {setSelectedView(view)}} className={selectedView == view ?"border-b-4 border-blue-400 text-white" : ""}>
                            {String(view).charAt(0).toUpperCase() + String(view).slice(1)}
                        </button>
                    ))
                }
            </div>
            <div className="flex flex-col h-full">
                {
                    tabViews[selectedView].length > 0 ? tabViews[selectedView] : <div className="flex w-full h-full items-center justify-center font-bold text-2xl">No Posts</div>
                }
            </div>
        </div>
    )
}