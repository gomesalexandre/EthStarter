import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'antd/dist/antd.min.css';
import style from '../styles/style.scss';
import Header from './Header';
import { Layout } from 'antd';
const { Content } = Layout;


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
        <Content className="content">
          {this.props.children}
        </Content>
      </Layout>
    );
  }}

PageLayout.propTypes = {
  children: PropTypes.obj,
  selected: PropTypes.arr,
};

export default PageLayout;
