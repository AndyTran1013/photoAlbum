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

class NavBar extends React.Component{
  render(){
    const navItems=this.props.items.map((value, index)=>{
      return (
        <li key={index} onClick={this.props.onClick}>
          <a href="#">{value}</a>
        </li>
      )
    });

    return(
      <nav className="navbar navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <span className="navbar-brand" href="#">My Travels</span>
        </div>
        
        <ul className="nav navbar-nav nav-pills">
          {navItems}
        </ul>
        </div>
      </nav>
    ) 
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

    // myRequest.open("GET","/imgList",true);
    // myRequest.addEventListener('load',function(){
    //   that.setState({boxes: JSON.parse(myRequest.response)['imgs']});
    // });
    // myRequest.send(null);

    // used for testing
    this.setState({
      boxes: {
        'Japan 2016': test,
        'San Fransisco' : test2
      }
    })
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

  navClickHandler(e){
    e.preventDefault();
    if (this.state.active){
      if(this.state.active === e.target.parentElement) {return}
      this.state.active.className='';
    }
    e.target.parentElement.className='active';
    this.setState({active: e.target.parentElement});
  }

  render() {
    let btnBoxes;

    if (Object.keys(this.state.boxes).length > 0){
      btnBoxes = this.state.boxes['Japan 2016'].map((value, index)=>{
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
        <NavBar 
          items={Object.keys(this.state.boxes)} 
          onClick={e => this.navClickHandler(e)}
        />

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

var test = [ '20160409_194910.jpg',
  '20160410_075924.jpg',
  '20160410_125445.jpg',
  '20160410_125451.jpg',
  '20160410_130717.jpg',
  '20160410_130947.jpg',
  '20160410_145330.jpg',
  '20160411_081030.jpg',
  '20160411_104020.jpg',
  '20160411_112558.jpg',
  '20160411_112700.jpg',
  '20160411_120738.jpg',
  '20160411_124720.jpg',
  '20160411_150318.jpg',
  '20160411_151939.jpg',
  '20160411_172907.jpg',
  '20160411_175555.jpg',
  '20160411_175705.jpg',
  '20160412_070726.jpg',
  '20160412_070833.jpg',
  '20160412_073503.jpg',
  '20160412_074638.jpg',
  '20160412_105831.jpg',
  '20160412_110204.jpg',
  '20160412_111110.jpg',
  '20160412_140607.jpg',
  '20160412_144633.jpg',
  '20160412_145507.jpg',
  '20160412_145511.jpg',
  '20160412_152804.jpg',
  '20160413_141215.jpg',
  '20160413_145358.jpg',
  '20160413_155012.jpg',
  '20160413_171437.jpg',
  '20160413_180833.jpg',
  '20160414_095415.jpg',
  '20160414_095840.jpg',
  '20160414_100333.jpg',
  '20160414_103038.jpg',
  '20160414_160135.jpg',
  '20160414_161941.jpg',
  '20160414_163617.jpg',
  '20160415_094949.jpg',
  '20160415_095138.jpg',
  '20160415_095519.jpg',
  '20160415_100903.jpg',
  '20160415_101559.jpg',
  '20160415_105624.jpg',
  '20160415_151511.jpg',
  '20160415_185728.jpg',
  '20160415_190019.jpg',
  '20160415_190717.jpg',
  '20160416_112104.jpg',
  '20160416_120721.jpg',
  '20160416_121750.jpg',
  '20160416_122813.jpg',
  '20160416_145646.jpg',
  '20160417_074309.jpg',
  '20160417_074652.jpg',
  '20160417_074735.jpg',
  '20160417_094309.jpg',
  '20160418_104245.jpg',
  '20160418_104340.jpg',
  '20160418_120950.jpg',
  '20160418_165204.jpg',
  '20160419_102338.jpg',
  '20160419_125430.jpg',
  '20160419_144415.jpg',
  '20160419_144426.jpg',
  '20160419_204927.jpg',
  '20160423_161841.jpg',
  '20160423_172412.jpg',
  '20160424_112747.jpg',
  '20160424_112757.jpg',
  '20160430_071051.jpg' ]
;

var test2 =  [
  '20160424_112747.jpg',
  '20160424_112757.jpg'
]

export default App;
