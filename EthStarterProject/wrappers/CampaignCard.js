import Link from 'next/link';
import {Col, Card } from 'antd';
import React from 'react';

export default (address, key) => (
    <Col key={key}>
      <Card
        title={address}
        extra={
          <Link href={`/campaign?id=${address}`} as={`/campaign/${address}`} prefetch>
            More
          </Link>}
        style={{ width: "500px" }}>
        <p><a href={`https://rinkeby.etherscan.io/address/${address}`}>View on EtherScan</a></p>
      </Card>
    </Col>
);
