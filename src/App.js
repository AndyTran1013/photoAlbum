import React from 'react';
import './App.css';

class Modal extends React.Component {
  componentDidMount(){
    document.addEventListener("keydown", this.props.onKeyDown)
  }

  render() {
    let modalStyle={
      display: this.props.display || "none"
    };

    return (
      <div 
        className="modal" 
        style={modalStyle} 
        onClick={this.props.onClick}
      >
        <span
          className="close-btn"
          onClick={this.props.onClick}
        >
          X
        </span>
        
        <img 
          className="modal-img" 
          src={this.props.imgUrl} alt=''
        />

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
      imgPath: "",
      active: {}
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

  }

  showModal(e, imgUrl) {
    this.setState({
      display: "block",
      imgPath: './images/' + imgUrl
    });
  }

  modalClickHandler(e) {
    if (e.target.className !== "modal-img") {
      this.closeModal();
    }
  }

  modalKeyHandler(e){
    if (e.keyCode === 27){
      this.closeModal();
    }
  }

  closeModal(){
    this.setState({
        display: "none",
        imgPath: ""
    });
  }

  render() {
    let btnBoxes;

    if (Object.keys(this.state.boxes).length > 0){
      btnBoxes = this.state.boxes.map((value, index)=>{
        return (
          <ModalButtons 
            onClick={(e) => this.showModal(e,value)}
            key={index}
            content={'./images/thumbnails/' + value}
          />
        )
      })
    }

    return (
      <div className="container">
        <Modal
          display={this.state.display}
          onClick={e => this.modalClickHandler(e)}
          onKeyDown={e => this.modalKeyHandler(e)}
          imgUrl={this.state.imgPath}
        />
        <ul className='list-inline'>{btnBoxes}</ul>
      </div>
    );
  }

}

export default App;
