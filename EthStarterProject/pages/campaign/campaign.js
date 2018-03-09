import react from 'react';
import { Card, Breadcrumb } from 'antd';

import PageLayout from '../../components/Layout';

class Campaign extends React.Component {
  static async getInitialProps ({query}) {
    return({address: query.address});
  }
  render(){
    return(
      <PageLayout>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Campaigns</a></Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.address}</Breadcrumb.Item>
        </Breadcrumb>
        <Card title={this.props.address}>

        </Card>
      </PageLayout>
    )};
}
export default Campaign;
