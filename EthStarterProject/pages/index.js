import React from 'react';
import PropTypes from 'prop-types';
import { nextConnect } from '../src/store/initStore';
import { Row, Button, Spin, Card } from 'antd';

import { getCampaigns } from '../src/actions';

import { PageLayout } from '../src/containers';
import { CampaignCard } from '../src/wrappers';
import { ProviderDownloadCards } from '../src/components';

class CampaignsIndex extends React.Component {
  async componentDidMount() {
    // TODO: Error handling on unsuccessful campaigns fetch
    await this.props.dispatch(getCampaigns());
  }

  render() {
    return(
      <PageLayout selected="campaigns">
        <div className="landing-content">
          {!this.props.web3CurrentAccount &&
            <ProviderDownloadCards />
          }
          <div className="section-opened_campaigns">
            <h2 style={{ "textAlign" : "center" }}>Opened campaigns</h2>
            <Row type="flex" justify="space-between" className="landing-row">
              {!this.props.loading ? this.props.campaigns.map( (campaignAddress, i) => CampaignCard(campaignAddress, i)) : <Spin size="large" />}
              </Row>
              <Row type="flex" justify="left">
                <Button type="primary">Create a campaign</Button>
              </Row>
          </div>
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
