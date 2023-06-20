import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import { Header } from "../components"
import { RootState } from "../store"
import { setUser } from "../store/reducers/user"
import { IUser } from "../types"
import { getUser } from "../utils"

export function Layout() {
   const dispatch = useDispatch()

   const [loaded, setLoaded] = useState<boolean>(false)
   const user: IUser | null = useSelector((state: RootState) => state.user.user)

   useEffect(() => {
      if (localStorage.userToken) {
         getUser()
            .then((response) => {
               dispatch(setUser(response.data.user))
               console.log(response.data.user)
            })
      } else {
         setLoaded(true)
      }
   }, [])

   return (
      <div>
         {loaded && (
            <>
               <Header />
               <Outlet />
            </>
         )}
      </div>
   )
}
