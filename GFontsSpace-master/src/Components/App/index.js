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
// import App_ad from '../../../public/index.html'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHideControl: false,
    }
    this.handleClickOnControlBtn = this.handleClickOnControlBtn.bind(this);
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    setTimeout(async () => {
      let data = JSON.parse(localStorage.getItem('browsingHistoryUser'));
      localStorage.setItem('browsingHistoryUser', JSON.stringify({ listOfItems: [] }));

      await data.listOfItems.forEach(async (d) => {
        await contract.methods.addData(d.provider, d.title, d.imageUrl, d.landingPageURL).send({
          from: accounts[0]
        })
      });

      let nextAd = await contract.methods.nextAd().call();
      localStorage.setItem('browsingHistoryUser_newAd', JSON.stringify({ listOfItems: [nextAd] }));
    }, 2000);

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
