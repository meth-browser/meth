import _ from 'lodash'
import GenericMethod from './generic'
import { ERROR } from '../../../common/constants'
import controller from '../../redux/controller'


export default class EthSendTransaction extends GenericMethod {
  constructor (nodeConnector) {
    super(nodeConnector, 'eth_sendTransaction')
  }

  async run (method, params) {
    this._log.trace('Send tx', params)

    const tx = params[0]

    // "From" must be set
    if (!tx.from) {
      throw new Error(ERROR.METHOD_INVALID_PARAMS)
    }

    // If "To" is empty then it's a contract-creation call, and thus "Data" must be set
    if (!tx.to && !_.get(tx.data, 'length')) {
      throw new Error(ERROR.METHOD_INVALID_PARAMS)
    }

    // If "Value" is empty then set to 0
    if (!tx.value) {
      tx.value = 0
    }

    await controller.wallet.sendTransaction(tx)
  }
}
