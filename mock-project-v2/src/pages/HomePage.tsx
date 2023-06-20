import { MouseEvent, useEffect, useMemo, useState } from "react"
import { Button, Container, ListGroup, Pagination, Tab, Tabs } from "react-bootstrap"

import { Article } from "../components"
import { IArticle } from "../types"
import { getArticles, getTags } from "../utils"

export function HomePage() {
   const [loadingTags, setLoadingTags] = useState<boolean>(false)
   const [tags, setTags] = useState<string[]>([])
   const [currentTag, setCurrentTag] = useState<string>()

   const [loadingArticles, setLoadingArticles] = useState<boolean>(false)
   const [articles, setArticles] = useState<IArticle[]>([])
   const [articlesCount, setArticlesCount] = useState<number>(0)
   const [limit, setLimit] = useState<number>(10)
   const [offset, setOffset] = useState<number>(0)

   const maxOffset = useMemo(() => {
      return Math.ceil(articlesCount / limit)
   }, [articlesCount, limit])

   const paginationOffsets = useMemo(() => {
      return [...Array(maxOffset).keys()]
   }, [maxOffset])

   const handleSelectTabs = (activeKey: any) => {
      switch (activeKey) {
         case "globalFeed":
            setCurrentTag(undefined)
            break
      }
   }

   useEffect(() => {
      setOffset(0)
   }, [currentTag, limit])

   useEffect(() => {
      setLoadingArticles(true)
      setArticles([])

      getArticles({ limit, offset, tag: currentTag })
         .then((response) => {
            setArticles(response.data.articles)
            console.log(response.data.articles)
            setArticlesCount(response.data.articlesCount)
         })
         .finally(() => {
            setLoadingArticles(false)
         })
   }, [currentTag, limit, offset])

   useEffect(() => {
      setLoadingTags(true)

      getTags()
         .then((response) => {
            setTags(response.data.tags)
         })
         .finally(() => {
            setLoadingTags(false)
         })
   }, [])

   return (
      <div>
         <div className="py-5 text-center text-bg-success">
            <h1 className="fs-1 fw-bold">
               Conduity
            </h1>
            <div className="lead">A place to share your knowledge.</div>
         </div>

         <Container className="mt-4">
            <div className="row">
               <div className="col-9">
                  <Tabs activeKey={currentTag} onSelect={handleSelectTabs}>
                     <Tab
                        eventKey="globalFeed"
                        title={
                        <div>
                           Global Feed
                        </div>
                        }
                     >
                        <ListGroup variant="flush">
                           {articles.map((article, index) => (
                              <ListGroup.Item key={index}>
                                 <Article article={article} />
                              </ListGroup.Item>
                           ))}
                        </ListGroup>
                     </Tab>

                     {currentTag && (
                        <Tab
                           eventKey={currentTag}
                           title={
                              <div>
                                 <i className="fas fa-hashtag me-2" />
                                 {currentTag}
                              </div>
                           }
                        >
                           <ListGroup variant="flush">
                              {articles.map((article, index) => (
                                 <ListGroup.Item key={index}>
                                    <Article article={article} />
                                 </ListGroup.Item>
                              ))}
                           </ListGroup>
                        </Tab>
                     )}
                  </Tabs>

                  {loadingArticles && (
                     <div className="text-center mt-4">
                        <i className="fas fa-spinner fa-spin fs-2" />
                     </div>
                  )}


                  {!loadingArticles && (
                     <Pagination className="flex-wrap justify-content-center mt-4">
                        <Pagination.First />
                        <Pagination.Prev />

                        {paginationOffsets.map((offset2) => (
                           <Pagination.Item
                              key={offset2}
                              active={offset2 === offset}
                              onClick={() => setOffset(offset2)}
                           > {offset2 + 1}
                           </Pagination.Item>
                        ))}

                        <Pagination.Next />
                        <Pagination.Last />
                     </Pagination>
                  )}
               </div>

               <div className="col-3 fw-bold">
                  <p>
                     <i className="fas fa-hashtag me-2 " />
                     Popular Tags
                  </p>

                  <div className="d-flex flex-wrap gap-1">
                     {tags.map((tag, index) => (
                        <Button
                           key={index}
                           variant="outline-secondary"
                           size="sm"
                           onClick={() => setCurrentTag(tag)}
                        > {tag}
                        </Button>
                     ))}
                  </div>

                  {loadingTags && (
                     <div className="text-center">
                        <i className="fas fa-spinner fa-spin fs-2" />
                     </div>
                  )}
               </div>
            </div>
         </Container>
      </div>
   )
}
