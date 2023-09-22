import React, { useState, useEffect } from "react"

import Main from "../components/main"

const ContentScript: React.FC = () => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    let baseUrl = window.location.pathname

    useEffect(() => {
        const interval = setInterval(() => {
            if (baseUrl === window.location.pathname) return
            baseUrl = window.location.pathname
            console.log('url changed: ', baseUrl)
        }, 1500)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            {
                showSidebar ? (
                    <svg onClick={() => setShowSidebar(!showSidebar)} className="flex text-4xl items-center cursor-pointer fixed right-10 top-6 z-50 w-6 h-6 text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#2563EB" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                ) : (
                    <svg onClick={() => setShowSidebar(!showSidebar)} className="fixed  z-30 flex items-center cursor-pointer right-10 top-16 w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#2563EB" viewBox="0 0 20 18">
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"/>
                    </svg>
                )
            }
            <div className={`top-0 right-0 w-[25vw] bg-white p-10 text-white fixed select-none h-full z-40 transition-all duration-300 ease-in-out ${showSidebar ? "translate-x-0 " : "translate-x-full"}`}>
                <h2 className="flex items-center fixed left-10 top-5 text-xl text-blue-600">
                    <svg className="flex items-center cursor-pointer right-10 top-16 w-6 h-6 text-gray-800 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#2563EB" viewBox="0 0 20 18">
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"/>
                    </svg>
                    Kết bạn tự động từ Post
                </h2>
                <Main />
            </div>
        </>
    )
}

export default ContentScript