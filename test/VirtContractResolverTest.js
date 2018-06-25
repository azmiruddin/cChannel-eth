'use strict';

var web3 = require('web3');
var web3 = new web3();

const Resolver = artifacts.require('VirtContractResolver');

contract('VirtContractResolver', function(accounts) {
  // TODO: this test cannot work correctly for now. To be fixed.
  it.skip('should be throw exception on non-existence virtual address', function() {
    return Resolver.deployed()
      .then(function(instance) {
        return instance.resolve.call(padLeft(web3.utils.toHex('0x01')));
      })
      .then(
        function(r) {
          assert(false);
        },
        function(e) {
          assert(true);
        }
      );
  });

  it('should be able to deploy contract code and establish corrrect mapping', function() {
    return Resolver.deployed()
      .then(function(instance) {
        instance.deploy(
          web3.utils.toHex(
            '0x6060604052341561000f57600080fd5b6103088061001e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063d2121c2b1461005c578063d6f12ca3146100ab578063e4056186146100f1575b600080fd5b341561006757600080fd5b6100916004808035906020019082018035906020019190919290803590602001909190505061011f565b604051808215151515815260200191505060405180910390f35b34156100b657600080fd5b6100d7600480803590602001908201803590602001919091929050506101d0565b604051808215151515815260200191505060405180910390f35b34156100fc57600080fd5b61011d6004808035906020019082018035906020019190919290505061024a565b005b60008060208585905014151561013457600080fd5b61016f85858080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050506102b8565b90506000806000836000191660001916815260200190815260200160002054141580156101b5575082600080836000191660001916815260200190815260200160002054105b156101c357600191506101c8565b600091505b509392505050565b6000806020848490501415156101e557600080fd5b61022084848080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050506102b8565b90506000806000836000191660001916815260200190815260200160002054141591505092915050565b600082826040518083838082843782019150509250505060405180910390209050600080600083600019166000191681526020019081526020016000205414151561029457600080fd5b43600080836000191660001916815260200190815260200160002081905550505050565b600080825114156102cf57600060010290506102d7565b602082015190505b9190505600a165627a7a723058204fe3204c0a8f0fcc348457d7f2ae3b14e88d3605bb872095af9849e66d1e6b7f0029'
          ),
          1024
        );
        return instance;
      })
      .then(function(instance) {
        let virtaddr = web3.utils.soliditySha3(
          web3.utils.toHex(
            '0x6060604052341561000f57600080fd5b6103088061001e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063d2121c2b1461005c578063d6f12ca3146100ab578063e4056186146100f1575b600080fd5b341561006757600080fd5b6100916004808035906020019082018035906020019190919290803590602001909190505061011f565b604051808215151515815260200191505060405180910390f35b34156100b657600080fd5b6100d7600480803590602001908201803590602001919091929050506101d0565b604051808215151515815260200191505060405180910390f35b34156100fc57600080fd5b61011d6004808035906020019082018035906020019190919290505061024a565b005b60008060208585905014151561013457600080fd5b61016f85858080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050506102b8565b90506000806000836000191660001916815260200190815260200160002054141580156101b5575082600080836000191660001916815260200190815260200160002054105b156101c357600191506101c8565b600091505b509392505050565b6000806020848490501415156101e557600080fd5b61022084848080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050506102b8565b90506000806000836000191660001916815260200190815260200160002054141591505092915050565b600082826040518083838082843782019150509250505060405180910390209050600080600083600019166000191681526020019081526020016000205414151561029457600080fd5b43600080836000191660001916815260200190815260200160002081905550505050565b600080825114156102cf57600060010290506102d7565b602082015190505b9190505600a165627a7a723058204fe3204c0a8f0fcc348457d7f2ae3b14e88d3605bb872095af9849e66d1e6b7f0029'
          ),
          1024
        );
        return instance.resolve.call(padLeft(web3.utils.toHex(virtaddr)));
      })
      .then(function(r) {
        assert(r != padLeft(web3.utils.toHex('0x0')));
      });
  });
});

function padLeft(data) {
  let pad = (32 - (data.length - 2) % 32) % 32;
  let x = data.substr(2, data.length);

  for (var i = 0; i < pad; i++) {
    x = 0 + x;
  }
  return '0x' + x;
}

function rightPadBytes32(data) {
  let pad = (32 - (data.length - 2) % 32) % 32;

  for (var i = 0; i < pad; i++) {
    data += 0;
  }
  return data;
}
