import React from 'react';
import PropTypes from 'prop-types';
import { nextConnect } from '../store/initStore';
import {Row, Button, Spin } from 'antd';

import { getCampaigns } from '../actions/addFetchedCampaignsAsync';

import PageLayout from '../containers/Layout';

import CampaignCard from '../wrappers/CampaignCard';

class CampaignsIndex extends React.Component {
  async componentDidMount() {
    // TODO: Error handling on unsuccessful campaigns fetch
    await this.props.dispatch(getCampaigns());
  }

  render() {
    return(
      <PageLayout selected="campaigns">
        <h1 style={{"textAlign" : "center"}}>Opened campaigns</h1>
        <Row type="flex" justify="center">
          {!this.props.loading ? this.props.campaigns.map( (campaignAddress, i) => CampaignCard(campaignAddress, i)) : <Spin size="large" />}
        </Row>
        <Row type="flex" justify="left">
          <Button type="primary">Create a campaign</Button>
        </Row>
      </PageLayout>
  );
}}

CampaignsIndex.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  campaigns: PropTypes.array,
};
export default nextConnect(state => state)(CampaignsIndex);
