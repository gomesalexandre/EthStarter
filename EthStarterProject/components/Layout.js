import React from 'react';
import stylesheet from 'antd/dist/antd.min.css';

import Header from './Header';
import { Layout, Menu, Breadcrumb, Icon, Card, Row, Col, Button, } from 'antd';
const { Content, Footer, } = Layout;


class PageLayout extends React.Component {
  constructor(props)
  {
    super(props);
  }
  render() {
    return(
      <Layout>
        <style dangerouslySetInnerHTML={{ __html: stylesheet, }} />
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
        <Header selected={this.props.selected}/>
        <Content>
          {this.props.children}
        </Content>
        <Footer/>
      </Layout>
  );
}}

export default PageLayout;
