import React, { useEffect, useState } from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import {fetchDataFromApi} from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import noResults from '../../assets/no-results.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../components/spinner/Spinner'
import MovieCard from '../../components/movieCard/MovieCard'
 

const SearchResult = () => {
  const [data,setData] = useState(null);
  const [pageNum,setPageNum] = useState(1);
  const [loading,setLoading] = useState(false);
  const {query} = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false)})
  } 

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if(data?.results){
        setData({
              ...data , results:[...data?.results , ...res.results]
        })
      }else setData(res);
    setPageNum((prev) => prev + 1);
  }) 
  }

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  },[query])

  return (
  <div className='searchResultsPage '>
    <ContentWrapper>
    {!loading && 
        (data?.results?.length > 0 ? 
          <>
          <div className="pageTitle">
            {`Search ${data?.results.length > 1 ? 'results' : 'result'} of  '${query}'`}
          </div> 
          <InfiniteScroll 
          className='content'
          next={fetchNextPageData}
          dataLength={data?.results?.length || []}
          hasMore = {pageNum <= data?.total_pages}
          loader = {<Spinner/>}>
            {data?.results?.map((item,index) => {
              if(item.media_type === "person") return;
              return (
                <MovieCard data={item} key={index} fromSearch={true}/>
              )
            }) }
          </InfiniteScroll>
          </>:
          <span className="resultNotFound">Sorry, Results not found!!</span>
          )}
          <Spinner initial={true}/>
     </ContentWrapper>
  </div>
  )
}

export default SearchResult
