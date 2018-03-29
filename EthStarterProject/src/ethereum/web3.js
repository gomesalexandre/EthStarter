import Web3 from 'web3';
import config from './config';

const web3 = (typeof window != 'undefined' && typeof window.web3 !== 'undefined') ?
  new Web3(window.web3.currentProvider) :
  new Web3(new Web3.providers.HttpProvider(config.endpoint));

export default web3;
