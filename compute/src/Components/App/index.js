import React, { Component } from 'react';
import { connect } from 'react-redux';
import GFontsAction from './../../Containers/Actions';

import FontOptionContainer from './../FontOptionContainer';
import TextBoxContainer from './../TextBoxContainer';
import Loader from './../Loader';
import Header from './../Header';
import './App.css';
import web3 from '../../ethereum-connect/web3';
import contract from '../../ethereum-connect/contract';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHideControl: false,
    }
    this.handleClickOnControlBtn = this.handleClickOnControlBtn.bind(this);
  }

  async componentDidMount() {
    console.log("hello");
    console.log(web3.version);
    contract.methods.user().call().then(console.log);
    const accounts = await web3.eth.getAccounts();
    let data = await contract.methods.getDataString().call();
    let finalArray = []
    data.split('||').forEach(d => {
      if (d != '') {
        d = d.split("--");
        let obj = {
          website: d[0],
          imageUrl: d[1],
          landingUrl: d[2],
          productName: d[3]
        }
        // console.log(obj);
        finalArray.push(obj);
      }
    });
    console.log(finalArray);
    let nextIndex1 = Math.random() * finalArray.length;
    let nextIndex2 = Math.random() * finalArray.length;
    let nextIndex3 = Math.random() * finalArray.length;
    
    console.log("index:", parseInt(nextIndex1)+" "+parseInt(nextIndex2)+" "+parseInt(nextIndex3));
    // setInterval(async () => {
      // nextIndex = Math.random() * finalArray.length;
      // console.log("index:", parseInt(nextIndex));
      let data2 = await contract.methods.updateNode(parseInt(nextIndex1),parseInt(nextIndex2),parseInt(nextIndex3)).send({
        from: accounts[0]
      })
      console.log(data2);
    // }, 2000);

    //   });  
    // },1000);

    // console.log(await contract.methods.productsViewed(2).call());

    this.props.fetchData();
  }

  handleClickOnControlBtn() {
    this.setState({ isHideControl: !this.state.isHideControl });
  }

  render() {
    return (
      <div className={this.state.isHideControl ? "HideControl" : "ShowControl"}>
        {this.props.fonts.length === 0 ? <Loader /> :
          <div className="App">
            <Header />
            <section className="Wrapper">
              <FontOptionContainer />
              <div className="TexBoxContainerWrapper">
                <TextBoxContainer textBoxes={this.props.textBoxOption} />
              </div>
              <button type="button"
                onClick={this.handleClickOnControlBtn}
                className="App__Btn">
                {this.state.isHideControl ? "Show Control" : "Hide Control"}
              </button>
            </section>
          </div>
        }
      </div>
    );
  }
}


// contract.methods.addData().call("amazon","watch","hello","hello1").then(console.log);
function mapStateToProps(state) {
  return {
    userSelectedTextBox: state.GFontsReducer.userSelectedTextBox,
    textBoxOption: state.GFontsReducer.textBoxOption,
    fonts: state.GFontsReducer.fonts,
    availableCategories: state.GFontsReducer.availableCategories,
    availableFontFamilies: state.GFontsReducer.availableFontFamilies
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => {
      dispatch(GFontsAction.fetchData(dispatch))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App_2
