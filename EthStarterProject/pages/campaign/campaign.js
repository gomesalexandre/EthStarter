import react from 'react';
import { Card, Breadcrumb } from 'antd';

import CampaignInstance from '../../ethereum/campaign';
import PageLayout from '../../components/Layout';

class Campaign extends React.Component {
  static async getInitialProps ({query}) {
    const campaignInstance = CampaignInstance(query.address);
    const campaignSummary = await campaignInstance.methods.getSummary().call();

    return({
      address: query.address,
      balance: campaignSummary[0],
      minimumContribution: campaignSummary[1],
      manager: campaignSummary[2],
      approversCount: campaignSummary[3],
      requests: campaignSummary[4],
    });
  }
  render(){
    console.log('Props are', this.props);
    return(
      <PageLayout>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Campaigns</a></Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.address}</Breadcrumb.Item>
        </Breadcrumb>
        <Card title="Campaign">
          <Card type="inner" title="Address">{this.props.address}</Card>
          <Card type="inner" title="Minimum Contribution">{this.props.minimumContribution}</Card>
          <Card type="inner" title="Manager">{this.props.manager}</Card>
          <Card type="inner" title="Contributers">{this.props.approversCount}</Card>
          <Card type="inner" title="Requests">{this.props.requests}</Card>
        </Card>
      </PageLayout>
    )};
}
export default Campaign;
