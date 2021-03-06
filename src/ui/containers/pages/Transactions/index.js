import React from 'react'

import { connectStore } from '../../../helpers/redux'
import { CachePureComponent } from '../../../helpers/components'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import Loading from '../../../components/Loading'
import AlertBox from '../../../components/AlertBox'
import Table from '../../../components/Table'
import TransactionView from '../../liveComponents/TransactionView'

const RENDER_NULL = () => null

const COLUMNS = [ { id: 'tx' } ]

@connectStore('account')
export default class Transactions extends CachePureComponent {
  static navigationOptions = {
    drawerLabel: t('title.transactions'),
    title: t('title.transactions')
  }

  render () {
    const { getNodeConnection } = this.props.selectors

    const { network } = (getNodeConnection() || {})

    return (
      <Layout contentStyle={styles.layoutContent}>
        {network
          ? this.renderContent()
          : <Loading style={styles.topLevelLoading} />
        }
      </Layout>
    )
  }

  renderContent () {
    const { getReverseTransactionHistory } = this.props.selectors
    const transactions = getReverseTransactionHistory()

    if (!transactions.length) {
      return (
        <AlertBox
          style={styles.noTransactionsYetAlert}
          type='info'
          text={t('transactions.noneYet')}
        />
      )
    }

    const rows = transactions.map(({ id, params, receipt, ts }) => ({
      tx: {
        id,
        params,
        receipt,
        ts,
        value: id
      }
    }))

    return (
      <Table
        style={styles.table}
        listStyle={styles.tableList}
        rowStyle={styles.tableRow}
        renderFilter={RENDER_NULL}
        renderHeader={RENDER_NULL}
        renderRowData={this._renderRowData}
        columns={COLUMNS}
        rows={rows}
      />
    )
  }

  _renderRowData = ({ tx }) => (
    <TransactionView style={styles.tx} tx={tx} />
  )
}
