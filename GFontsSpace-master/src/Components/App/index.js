import React, { Component } from 'react';
import { connect } from 'react-redux';
import GFontsAction from './../../Containers/Actions';

import FontOptionContainer from './../FontOptionContainer';
import TextBoxContainer from './../TextBoxContainer';
import Loader from './../Loader';
import Header from './../Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHideControl: false,
    }
    this.handleClickOnControlBtn = this.handleClickOnControlBtn.bind(this);
  }

  componentDidMount() {
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

class App_2 extends React.Component {
    state = {
        company_name: 'Company Name',
        product_name: 'Product Name',
        ad_link: 'https://www.google.co.in',
        photo_link: 'https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    }
    set_bg_img = () => {
        setTimeout(() => {
            let alpha = 'url(' + this.state.photo_link + ')' + ''
            document.getElementById("app_bg").style.backgroundImage = alpha
            console.log(alpha)
        }, 2000)
    }

    render(){
        //
        this.set_bg_img()
        return(
            `<a href={this.state.ad_link} target="_blank">
            <div className="card text-center hell" >
            <div className="card-header">
            {this.state.product_name}
            </div>
        <div className="card-body" id="app_bg">

            </div>
            <div className="card-footer text-muted">
            {this.state.company_name}
    </div>
        </div>
        </a>`
        )
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
