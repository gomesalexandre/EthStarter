import React from 'react';
import { Breadcrumb } from 'antd';

export default (props) => (
  <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    {props.path.map(subPath => (
      <Breadcrumb.Item><a href={subPath.url}>{subPath.title}</a></Breadcrumb.Item>
    ))}
  </Breadcrumb>
);
