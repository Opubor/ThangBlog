import { axiosApi } from "."
import { IProfile } from "../types/IProfile"

interface IData {
        slug: string,
        title: string,
        description: string
        body: string
        tagList: string[]
        createdAt: string
        updatedAt: string
        favorited: boolean
        favoritesCount: number
        author: IProfile   
}

export const postArticle = (data: IData) => {
   return (
      axiosApi.post("article", data)
   )
}
