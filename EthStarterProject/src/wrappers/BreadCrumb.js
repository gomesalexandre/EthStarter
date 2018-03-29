import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

const CustomBreadCrumb = (props) => (
  <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    {props.path.map((subPath, i) => (
      <Breadcrumb.Item key={i}><a href={subPath.url}>{subPath.title}</a></Breadcrumb.Item>
    ))}
  </Breadcrumb>
);

CustomBreadCrumb.propTypes = {
  path: PropTypes.array,
};
export default CustomBreadCrumb;
