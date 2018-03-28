import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'antd/dist/antd.min.css';
import style from '../styles/style.scss';
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
        <style jsx global>{stylesheet}</style>
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
