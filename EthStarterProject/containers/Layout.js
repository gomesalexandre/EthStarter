import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'antd/dist/antd.min.css';
import Header from './Header';
import { Layout } from 'antd';
const { Content, Footer } = Layout;


class PageLayout extends React.Component {
  constructor(props)
  {
    super(props);
  }
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
        <Header selected={this.props.selected}/>
        <Content>
          {this.props.children}
        </Content>
        <Footer/>
      </Layout>
  );
}}

PageLayout.propTypes = {
  children: PropTypes.obj,
  selected: PropTypes.arr,
};

export default PageLayout;
