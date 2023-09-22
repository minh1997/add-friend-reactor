import React from "react"
import { createRoot } from 'react-dom/client'

import '../assets/tailwind.css'
import ContentScript from "./contentScript"

function init() {
    const appContainer = document.createElement('div')
    if (!appContainer) throw new Error('Can not find Container')

    document.body.appendChild(appContainer)
    const root = createRoot(appContainer)

    root.render(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <ContentScript />
        </div>
    )
}

init()