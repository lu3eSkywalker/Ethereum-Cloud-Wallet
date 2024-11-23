



export function convertHexToWeiToEth(ethBalance: string | undefined) {
  if (ethBalance) {
    const ethBalanceToString = ethBalance?.toString();
    const stringToInt = parseInt(ethBalanceToString, 16);
    const weiToEth = stringToInt / 10 ** 18;
    const weiRounded = weiToEth.toFixed(7);
    return weiRounded;
  }
  return "0.00000000";
}


export function hexToNumber(data: string | undefined) {
  if (data) {
    const convertToString = data?.toString();
    const stringToInt = parseInt(convertToString, 16);
    return stringToInt;
  }
  return "0.00000000";
}

export function hexToEth(data: string | undefined) {
  if (data) {
    const convertToString = data?.toString();
    const stringToInt = parseInt(convertToString, 16);
    const weiToEth = stringToInt / 10 ** 18;
    const weiRounded = weiToEth.toFixed(10);
    return weiRounded;
  }
  return "0.00000000";
}
