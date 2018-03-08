import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { Layout, Menu, Breadcrumb, Icon, Card, Row, Col, Button } from 'antd';
import stylesheet from 'antd/dist/antd.min.css';

import appReducer from '../reducers/appReducer';
import Header from './Header';

const { Content } = Layout;
let store = createStore(appReducer);


class PageLayout extends React.Component {

  render() {
    return(
      <Layout>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <style jsx>{`
          #components-layout-demo-top-side-2 .logo {
            width: 120px;
            height: 31px;
            background: #333;
            border-radius: 6px;
            margin: 16px 28px 16px 0;
            float: left;
          }
        `}
        </style>
          <Header/>
          <Content>
            {this.props.children}
          </Content>
      </Layout>
  )
}}
class LayoutWithProvider extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <PageLayout children={this.props.children}/>
      </Provider>
    );
  }
}
export default LayoutWithProvider;
