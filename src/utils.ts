import moment from 'moment';

/**
 * @returns {string} Converts epoch time to readable time
 */
export const convertTime = (epoch: number) => {
  return moment.unix(epoch).fromNow();
};

/**
 * @returns {string} Shorts address for readability
 */
export const formatAddr = (address: string) => {
  const first = address.substring(0, 6);
  const last = address.substring(address.length - 4, address.length);
  return `${first}...${last}`;
};

/**
 * @returns {string} Redirects to addr on Etherscan
 */
export const addressLink = (address: string) => {
  return `https://etherscan.io/address/${address}`;
};

/**
 * @returns {string} Redirects to tx on Etherscan
 */
export const txLink = (id: string) => {
  return `https://etherscan.io/tx/${id}`;
};

/**
 * @returns {string} Shorts tx id length
 */
export const shortenTxId = (id: string) => {
  return `${id.substring(0, 14)}...`;
};
