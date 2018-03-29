import React from 'react';
import PropTypes from 'prop-types';
import { nextConnect } from '../src/store/initStore';
import { Row, Button, Spin } from 'antd';

import { getCampaigns } from '../src/actions';

import { PageLayout } from '../src/containers';

import { CampaignCard } from '../src/wrappers';

class CampaignsIndex extends React.Component {
  componentDidMount() {
    // TODO: Error handling on unsuccessful campaigns fetch
    this.props.dispatch(getCampaigns());
  }

  render() {
    return(
      <PageLayout selected="campaigns">
        <div className="landing-content">
          <h1 style={{ "textAlign" : "center" }}>Opened campaigns</h1>
          <Row type="flex" justify="space-between" className="landing-row">
            {!this.props.loading ? this.props.campaigns.map( (campaignAddress, i) => CampaignCard(campaignAddress, i)) : <Spin size="large" />}
          </Row>
          <Row type="flex" justify="left">
            <Button type="primary">Create a campaign</Button>
          </Row>
        </div>
      </PageLayout>
  );
}}

CampaignsIndex.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  campaigns: PropTypes.array,
};
export default nextConnect(state => state)(CampaignsIndex);
