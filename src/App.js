import React from 'react';
import './App.css';

/*ToDo: Resize modal on window update? or just dump all styles in CSS*/

class Modal extends React.Component {
  render() {
    let modalStyle={
      display: this.props.display || "none"
    };

    return (
      <div className="modal" style={modalStyle} onClick={this.props.onClick}>
        <span
          className="close-btn"
          onClick={this.props.onClick}>
          X
        </span>
        
       <img className="modal-content" src={this.props.imgUrl} alt={this.props.imgUrl}/>
      </div>
    );
  }
}

class ModalButtons extends React.Component {
  render() {
    return (
      <li>
       <img 
          className="modal-btn"
          src={this.props.content} 
          alt={this.props.content}
          onClick={this.props.onClick}
        />
      </li>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      boxes: [],
      display: "none",
      imgPath: ""
    };
  }

  componentDidMount(){
    let myRequest = new XMLHttpRequest();
    let that = this;

    myRequest.open("GET","/imgList",true);
    myRequest.addEventListener('load',function(){
      that.setState({boxes: JSON.parse(myRequest.response)['imgs']});
    });
    myRequest.send(null);

    //used for testing
    //this.setState({boxes: ['20160409_194910.jpg','20160410_070313.jpg']})
  }

  showModal(e, imgUrl) {
    this.setState({
      display: "block",
      imgPath: './images/' + imgUrl
    });
  }

  closeModal(e) {
    if (e.target.className !== "modal-content") {
      this.setState({
        display: "none",
        imgPath: ""
      });
    }
  }

  render() {

    const btnBoxes=this.state.boxes.map((value, index)=>{
      return (
        <ModalButtons 
          onClick={(e) => this.showModal(e,value)}
          key={index}
          content={'./images/thumbnails/' + value}
        />
      )
    })


    return (
      <div>
        <Modal
          display={this.state.display}
          onClick={e => this.closeModal(e)}
          imgUrl={this.state.imgPath}
        />
        <ul className='list-inline'>{btnBoxes}</ul>
      </div>
    );
  }
}

export default App;
