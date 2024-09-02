import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['debug0'],
      path: 'packageAPI/pages/base/debug/debug',
      containerStyle1: ''
    }
  },
  data: {
    theme: 'light',
    envInfo: '',
    manager: false
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['debug0']
    })
    this.setData({
      t: i18n,
      lang
    })
    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  },

  setEnableDebugTrue() {
    wx.setEnableDebug({
      enableDebug: true,
      fail: (err) => wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['debug5'],
        content: JSON.stringify(err)
      }),
      success: () => wx.showToast({
        title: i18n['debug6']
      })
    });
  },

  setEnableDebugFalse() {
    wx.setEnableDebug({
      enableDebug: false,
      fail: (err) => wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['debug7'],
        content: JSON.stringify(err)
      }),
      success: () => wx.showToast({
        title: i18n['debug8']
      })
    });
  },

  getRealtimeLogManager() {
    const logger = wx.getRealtimeLogManager()
    logger.setFilterMsg('keyWord1')
    logger.addFilterMsg('keyWord2')

    const tagger = logger.tag('test')
    tagger.setFilterMsg('ffff1')
    tagger.addFilterMsg('ffff3')
    logger.in(this)
    console.log('====RealtimeTagLogManager', tagger)
    console.log('====realtimeLogManager', logger)
    this.manager = logger
    this.tagManager = tagger
    this.setData({
      manager: true
    })
    //const state = logger.getCurrentState()
    console.log('==state', wx.canIUse('getRealtimeLogManager'), wx.canIUse('getLogManager'))

  },
  addRealtimeLog() {
    const tagger = this.tagManager
    const logger = this.manager
    tagger.debug('kkkk', { str: 'hello world tag' }, 'xxxxxxxxx', 'yyyyyy', 10, [22, 33, 44])
    tagger.info('yyy', { str: 'hello world tag' }, 'xxxxxxxxx', 'yyyyyy', 10, [22, 33, 44])
    tagger.warn('ddd', { str: 'hello world tag' }, 'xxxxxxxxx', 'yyyyyy', 10, [22, 33, 44])
    tagger.error('vvvv', { str: 'hello world tag' }, 'xxxxxxxxx', 'yyyyyy', 10, [22, 33, 44])

    logger.debug({ str: 'hello world' }, 'info log', 100, [1, 2, 3])
    logger.info({ str: 'hello world' }, 'info log', 100, [1, 2, 3])
    logger.error({ str: 'hello world' }, 'error log', 100, [1, 2, 3])
    logger.warn({ str: 'hello world' }, 'warn log', 100, [1, 2, 3])
  },
  getCurrentState() {
    const state = this.manager.getCurrentState()
    console.log('state', state)
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: 'state',
      content: JSON.stringify(state)
    })
  },
  getLogManager() {
    const logger = wx.getLogManager({ level: 1 }) // Do not write the life cycle function of the APP, Page, and the function call log under the WX naming space
    console.log('====logManager', logger);
    logger.log({ str: 'hello world' }, 'basic log', 100, [1, 2, 3]);
    logger.info({ str: 'hello world' }, 'info log', 100, [1, 2, 3]);
    logger.debug({ str: 'hello world' }, 'debug log', 100, [1, 2, 3]);
    logger.warn({ str: 'hello world' }, 'warn log', 100, [1, 2, 3]);
  },

  getPerformance() {
    wx.showToast({
      title: i18n['debug9'],
      duration: 500
    })
    const performance = wx.getPerformance(); // ==> Performance object
    // In the life cycle of OnReady and the later life cycle, you can try to directly obtain the generated performance data
    console.log(performance);
    // You can also continue to obtain the performance data generated by monitoring
    performance.createObserver((entryList) => {
      console.log(entryList.getEntries());
    })
      .observe({ entryTypes: ['render', 'script', 'navigation'] });
  },

  console() {
    console.debug('debuglog')
    console.error('Error log')
    console.group('Packet tag')
    console.log('Grouped log 1')
    console.log('Grouped log 2')
    console.log('Grouped log 3')
    console.groupEnd()
    console.info('infolog')
    console.log('Regular log')
    console.warn('Warning log')
  }
})
