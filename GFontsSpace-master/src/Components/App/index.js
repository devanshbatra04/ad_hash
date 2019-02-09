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
    console.log(await contract.methods.productsViewed(1).call());
    // console.log(await contract.methods.addData("amazon", "watch", "hello", "hello1").send({
    //   from : accounts[0]
    // }));

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
