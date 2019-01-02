import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search/Search';
import Header from './Header/Header';
import VideoInfo from './VideoInfo/VideoInfo';
import Loading from './Loading/Loading';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      link: undefined,
      id: undefined,
      thumbnail: undefined,
      title: undefined,
      convertInProgress: false,
      errors: []
    }
    
    this.handleConvert = this.handleConvert.bind(this);
  }
  handleConvert(url){
    //Revoking the objectURL in case the use already converted a video previously
    if(this.state.link)
      window.URL.revokeObjectURL(this.state.link);

    this.setState({ 
        convertInProgress: true, 
        errors: [],
        link: undefined,
        thumbnail: undefined,
        id: undefined,
        title: undefined
      })

    //Catching the id from the url
    const id = url.substring(url.indexOf("=") + 1);

    axios({
          url: `/api/download/${id}`,
          method: "GET",
          responseType: 'blob',
          timeout: (5 * 60 * 1000)
        })
        .then((res) => {
          this.setState({
            id: id,
            link: window.URL.createObjectURL(new Blob([res.data]))
          })

          //Gettin the info for the videoinfo card
          axios.get(`/api/info/${id}`)
              .then((res) => {
                this.setState({
                   thumbnail: res.data.thumbnail,
                    title: res.data.title,
                    convertInProgress: false
                })
              })
              .catch((e) => {
                this.setState((prevState) => ({ 
                    convertInProgress: false,
                    errors: [...prevState.errors, "There were an error getting the videoInfo"]}))
              })
        })
        .catch((e) => {
          this.setState(() => ({ 
              convertInProgress: false,
              errors: ["There were an error with your video, please check the url format"]}))
        });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5"> 
            <Header />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <Search 
                    handleConvert={this.handleConvert} 
                    convertInProgress={this.state.convertInProgress} 
            />
          </div>
        </div>
        {this.state.errors !== 0 && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">            
              {this.state.errors.map((error) => (
                  <p key={error} className="text-center">{error}</p>
              ))}
          </div>
        </div>
        )}
        {this.state.convertInProgress && (
        <div className="row justify-content-center">
          <div className="col-2 col-md-1">            
              <Loading />
          </div>
        </div>
        )}
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            {(this.state.id && !this.state.convertInProgress) && (
              <VideoInfo 
                        thumbnail={this.state.thumbnail} 
                        title={this.state.title} 
                        link={this.state.link} 
                        id={this.state.id}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
