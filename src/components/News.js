import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
  
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const update = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eca7bb4aae45476ea5bb8795f3d9e294&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  }
  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)}-NewsDaily`;
    update()
  },[])

  const fetchMoreData = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eca7bb4aae45476ea5bb8795f3d9e294&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  /* handlePrevPage = async () => {
     await this.setState({
       page: this.state.page - 1,
     })
     this.update();
   }
 
   handleNextPage = async () => {
     await this.setState({
       page: this.state.page + 1,
     })
     this.update();
   }
 */


  return (
    <>
      <h1 className="text-center" style={{ margin: "35px", marginTop:'80px'}}>[NewsDaily-Top {capitalizeFirstLetter(props.category)} Headlines]</h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className='row my-3'>
            {articles.map((element) => {
              return <div className='col-md-4' key={element.url} >
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 82) : ""} imageUrl={element.urlToImage}
                  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className=" container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevPage} className="btn btn-dark">&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextPage} className="btn btn-dark">Next &rarr;</button>
        </div>*/}
    </>
  )

}

News.defaultProps = {
  country: 'in',
  pageSize: 12,
  category: 'general'

}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News

