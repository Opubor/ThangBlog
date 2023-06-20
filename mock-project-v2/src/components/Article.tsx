import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import dayjs from "dayjs"

import { IArticle } from "../types"

interface IProps {
   article: IArticle
}

export function Article({ article }: IProps) {
   return (
      <div className="py-3">
         <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
               <Link to={`/@${article.author.username}`}>
                  <img className="rounded" src={article.author.image} alt="Avatar" />
               </Link>

               <div className="d-flex flex-column lh-sm">
                  <Link className="text-decoration-none text-primary" to={`/@${article.author.username}`}>
                     {article.author.username}
                  </Link>
                  <small className="text-secondary">
                     {dayjs(article.createdAt).format("MMMM D, YYYY")}
                  </small>
               </div>
            </div>

            <Button variant="outline-primary" size="sm">
               <i className="fas fa-heart me-2" />
               {article.favoritesCount}
            </Button>
         </div>

         <Link className="d-block mt-3 text-decoration-none" to={`/article/${article.slug}`}>
            <div className="fs-4 text-black">
               {article.title}
            </div>
            <div className="text-secondary">
               {article.description}
            </div>

            <div className="d-flex mt-3 justify-content-between">
               <small className="text-secondary">Read more...</small>
               <div className="d-flex flex-wrap gap-1">
                  {article.tagList.map((tag, index) => (
                     <Button key={index} className="py-0" variant="outline-secondary" size="sm">
                        {tag}
                     </Button>
                  ))}
               </div>
            </div>
         </Link>
      </div>
   )
}
