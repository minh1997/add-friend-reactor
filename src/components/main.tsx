import React, { useEffect, useRef } from "react"

const Main: React.FC = () => {
    const statusButton = useRef<HTMLLabelElement>(null)
    let intervals = []

    const startAddFriendProcess = ():void => {
      const addFriendInterval = setInterval(() => {
        const dialog = document.querySelectorAll("div[role='dialog']")[0]
        
        // quan trọng: vì fb chống auto crawl rất căng nên không thế lấy chính xác id hoặc class, 
        // nên các bạn hãy check chính xác ngôn ngữ để bắt đúng label của nút
        const button = dialog.querySelectorAll("div[aria-label='Thêm bạn bè']")[0]

        if (button.getAttribute('status-label') === 'added') {
          button.remove()
          return
        }

        const parentPosition = 9
        const itemPosition = 7
        let element = button
        let scrollElement = null
        let itemElement = null
        // lấy div scroll danh sách
        for(let i = 0; i < parentPosition; i++) {
          if (!element) break
          
          element = element.parentElement
          if (element && element.tagName.toLowerCase() === "div") {
            scrollElement = element
          }
        }
        // lấy div cha của từng nút kết bạn 
        element = button
        for(let i = 0; i < itemPosition; i++) {
          if (!element) break
          
          element = element.parentElement
          if (element && element.tagName.toLowerCase() === "div") {
            itemElement = element
          }
        }

        if (button instanceof HTMLElement) {
          button.click()
          button.style.background = 'blue'
          button.setAttribute('status-label', 'added')

          if (scrollElement) {
            const currentTop = itemElement.offsetTop
            scrollElement.scrollTo({
              top: currentTop,
              behavior: "smooth"
            })
          }
        }
      }, 2000) // đặt ít nhất 2 giây/click add friend vì quá nhanh fb sẽ checkpoint tài khoản

      intervals.push(addFriendInterval)
    }

    const clearAllInterval = ():void => {
      for (const interval of intervals) {
        clearInterval(interval)
      }
      intervals = []
    }

    const onToggleAddFriend = (event):void => {
      if (event.target.checked) {
        startAddFriendProcess()
      } else {
        clearAllInterval()
      }
      statusButton.current.innerHTML = event.target.checked ? 'Đang kết bạn tự động...' : 'Bật tự động kết bạn'
    }

    useEffect(() => {
      return () => {
        clearAllInterval()
      }
    }, [])

    return (
        <>
          <div style={{ height: '30vh' }}></div>
          <input
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              onChange={onToggleAddFriend}
              role="switch"
              id="flexSwitchCheckDefault" />
          <label
              ref={statusButton}
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="flexSwitchCheckDefault"
            >Bật tự động kết bạn</label>
        </>
    )
}

export default Main