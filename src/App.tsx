// App.tsx
import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

const lazy = React.lazy
const Suspense = React.Suspense
const Status = ({ code, children }: any) => (
  <Route
    render={({ staticContext }: any) => {
      if (staticContext) {
        staticContext.status = code
      }
      return children
    }}
  />
)
const NotFound = (): any => (
  <Status code={404}>
    <div>
      <h1>抱歉，页面消失了</h1>
    </div>
  </Status>
)

class App extends React.Component<any, any> {
  state = {
    collapsed: false,
    title: 'title',
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  componentDidMount() {
    ;(window as any).setTitle = (title: any) => {
      document.title = title
    }
  }
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <div className="app">
          <Suspense fallback={'loading...'}>
            <Switch>
              <Route
                exact
                path="/"
                component={lazy(() => import('./pages/Home'))}
              />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </div>
      </ConfigProvider>
    )
  }
}
export default withRouter(App)
