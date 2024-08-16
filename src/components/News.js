import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
    
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsDaily`;
  }


  async update() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eca7bb4aae45476ea5bb8795f3d9e294&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })

  }

  async componentDidMount() {
    this.update();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eca7bb4aae45476ea5bb8795f3d9e294&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
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
  async componentDidUpdate(element) {
    if (element.searchQuery !== this.props.searchQuery) {
      await this.update();
    }
  }

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px" }}>[NewsDaily-Top {this.capitalizeFirstLetter(this.props.category)} Headlines]</h1>
        {/*{this.state.loading && <Spinner />}*/}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length <= this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
          <div className='row my-3'>
            {this.state.articles.map((element) => {
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
}

export default News

