import { connect } from 'react-redux'
import * as React from 'react'
import NProgress from 'nprogress'
import * as obj from '@src/models'
const preStyle: any = {
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  margin: '1em 0',
  fontSize: 0.8,
}
const MyFallbackComponent = (props: any) => (
  <pre style={preStyle}>{props.error.message}</pre>
)
const connectRedux = (key: string, component: any) => {
  if (!obj[key]) {
    console.error('请添加或导出modal')
  }
  const mapState = (state: any) => ({
    [key]: state[key],
    allState: state,
  })
  const mapDispatch = (data: any) => {
    return { actions: { ...data[key] } }
  }
  return connect(mapState, mapDispatch)(component)
}
export const Ct = ({ model, Component, title }: any) => {
  class WithErrorHandler extends React.Component<any, any> {
    static displayName: string
    constructor(props: any) {
      super(props)

      this.state = {
        hasError: false,
        error: null,
        errorInfo: null,
      }
    }
    componentWillMount() {
      NProgress.start()
    }
    componentDidMount() {
      if (title && title.trim() !== document.title.trim()) {
        ;(window as any).setTitle(title)
      }
      NProgress.done()
    }

    componentDidCatch(error: any, info: any) {
      this.setState({ hasError: true, error, errorInfo: info })
    }

    render() {
      if (this.state.hasError) {
        const { error, errorInfo } = this.state
        return (
          <MyFallbackComponent
            {...this.props}
            error={error}
            errorInfo={errorInfo}
          />
        )
      }
      return <Component {...this.props} />
    }
  }
  WithErrorHandler.displayName = `withErrorHandler(${Component.displayName})`
  return connectRedux(model, WithErrorHandler)
}
