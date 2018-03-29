import { create, fontMaker, whenWidthSmall } from '../../../styles'

const text = {
  ...fontMaker(),
  fontSize: '1rem',
  color: '$content_textColor'
}

export default create({
  layoutContent: {
    // $outline: 1,
    backgroundColor: '$content_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 0,
    paddingBottom: 0,
    height: '95%'
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleBarText: {
    ...text,
    ...fontMaker({ weight: 'Light' }),
    fontSize: '0.8rem',
    color: '$addressBook_title_textColor',
    textTransform: 'uppercase',
    marginRight: 20
  },
  titleBarAddIcon: {
    fontSize: '0.6rem'
  },
  table: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 20,
    minWidth: '70%'
  },
  tableFilter: {
    marginBottom: 5
  },
  tableRow: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tableRowData: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 0
  },
  tableRowAddressText: {
    ...text,
    ...fontMaker({ weight: 'Light' }),
    color: '$addressBook_address_textColor',
    marginBottom: 5
  },
  tableRowLabelText: {
    ...text,
    fontSize: '0.7rem',
    color: '$addressBook_label_textColor'
  },

  ...whenWidthSmall({
    layoutContent: {
      alignItems: 'center',
      width: '95%'
    },
    table: {
      width: '100%'
    }
  })
})
