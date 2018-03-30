import React from 'react';
import { Card, Row } from 'antd';

const ProviderDownloadCards = () => (
  <div className="section-no_provider">
    <h2>Cannot connect to the ethereum network :(</h2>
    <p>
      This is a √êApp: It is built on the Ethereum blockchain using smart contracts.
      To interact with it, you need a browser that supports web3
    </p>
    <p>
      Don't worry, we've injected a web3 provider, so you'll be able to see the site but with limited functionnalities.
      You can still see the deployed campaigns, but not create any nor contribute to them.
    </p>
    <Row type="flex" justify="space-around" className="landing-row">
      <Card
        hoverable
        style={{ width: 240 }}
        title="Install Metamask"
        className="provider-card"
      >
        <img alt="Metamask logo" src="/static/metamask-logo.svg" style={{ 'width': '80%' }}/>
        <section className="provider-card--text">
          <p>The de-facto extension to enjoy DApps, works as an extension for major browsers</p>
          <p>Download it <a href="https://metamask.io/">here</a></p>
        </section>
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        title="Install Brave"
      >
      <img alt="Brave logo" src="/static/brave-logo.svg" style={{ 'width': '80%' }}/>
      <section className="provider-card--text">
        <p>Brave is a cool browser made for the web of tomorrow, with integrated Metamask</p>
        <p>Download it <a href="https://brave.com/">here</a></p>
      </section>
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        title="Install Cipher"
      >
      <img alt="Cipher logo" src="/static/cipher-logo.png" style={{ 'width': '80%' }}/>
      <section className="provider-card--text">
        <p>Cipher is a full-featured DApps browser for iOS/Android</p>
        <p>Download it <a href="https://www.cipherbrowser.com/">here</a></p>
      </section>
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        title="Install Status"
      >
      <img alt="Status logo" src="/static/status-logo.png" style={{ 'width': '80%' }}/>
      <section className="provider-card--text">
        <p>Status is a full-featured DApps browser, Ethereum wallet and light node for iOS/Android</p>
        <p>Download it <a href="https://www.status.im/">here</a></p>
      </section>
      </Card>
    </Row>
  </div>
);

export { ProviderDownloadCards };
