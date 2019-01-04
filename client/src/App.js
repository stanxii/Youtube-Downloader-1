import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header/Header';
import VideoInfo from './VideoInfo/VideoInfo';
import Loading from './Loading/Loading';
import Errors from './Errors/Errors';


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
        <div>
          <div id="top" className="gradient">
            <div className="container">
                <Header handleConvert={this.handleConvert} convertInProgress={this.state.convertInProgress} />
            </div>
          </div>
          <div id="bottom">
            <div className="container">
                {this.state.convertInProgress && (
                    <div className="row justify-content-center">
                      <div className="col-2 col-md-1">            
                          <Loading />
                      </div>
                    </div>
                )}
                {this.state.errors !== 0 && (
                  <Errors errors={this.state.errors} />
                )}
                <VideoInfo 
                  title={this.state.title} 
                  link={this.state.link} 
                  id={this.state.id}
                />
            </div>
          </div>
        </div>
    );
  }
}

export default App;