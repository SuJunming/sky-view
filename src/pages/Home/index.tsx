// App.tsx
import React from 'react'
import { Ct } from '@ct'
import { Layout, Menu, Modal, Form, Input, Select } from 'antd'
import { findDOMNode } from 'react-dom'
import { FolderOpenOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons'
const { Option } = Select
const { Header, Content, Footer, Sider } = Layout
import './index.scss'
const { SubMenu } = Menu
const PandaSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path
      d="M99.096 315.634s-82.58-64.024-82.58-124.13c0-66.064 33.024-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.024 82.58-124.13c0-66.064-33.024-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
      fill="#6B676E"
      p-id="1143"
    />
    <path
      d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
      fill="#FFEBD2"
      p-id="1144"
    />
    <path
      d="M330.244 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.244z"
      fill="#E9D7C3"
      p-id="1145"
    />
    <path
      d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-124.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.024 181.678 33.024 16.516 0 115.614 49.548 181.678-33.024 29.18-36.476-7.064-176.93-49.55-247.74z"
      fill="#FFFFFF"
      p-id="1146"
    />
    <path
      d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.024-124.128-148.646-124.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.024 124.128-148.646 124.128-181.678z"
      fill="#6B676E"
      p-id="1147"
    />
    <path
      d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.024 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-24.944 115.614-82.58-0.002-27.366-85.556-33.024-115.614-33.024z"
      fill="#464655"
      p-id="1148"
    />
    <path
      d="M330.244 495.484m-33.024 0a33.024 33.024 0 1 0 66.064 0 33.024 33.024 0 1 0-66.064 0Z"
      fill="#464655"
      p-id="1149"
    />
    <path
      d="M693.678 495.484m-33.024 0a33.024 33.024 0 1 0 66.064 0 33.024 33.024 0 1 0-66.064 0Z"
      fill="#464655"
      p-id="1150"
    />
  </svg>
)
const PandaIcon = (props: any) => <Icon component={PandaSvg} {...props} />
class Home extends React.Component<any, any> {
  private item: any = null
  formRef: any = React.createRef()
  refs: any = {}
  state = {
    position: {
      x: 0,
      y: 0,
    },
    show: -1,
    deleteVisible: false,
    addVisible: false,
    addType: 1,
  }
  componentDidMount() {
    this.props.actions.getFiles()
    this.props.actions.getTemplates()
    document.addEventListener(
      'mousedown',
      (e) => this.handleClickOutside(e),
      false,
    )
  }
  componentWillUnmount() {
    document.removeEventListener(
      'mousedown',
      (e) => this.handleClickOutside(e),
      false,
    )
  }
  handleClickOutside(e: any) {
    const target = e.target
    // 组件已挂载且事件触发对象不在div内
    let result = findDOMNode(this.refs.refTest)?.contains(target)
    if (!result) {
      this.setState({
        show: -1,
      })
    }
  }
  onContextMenu = (event: any, item: any) => {
    event.stopPropagation()
    event.preventDefault()
    this.item = item
    this.setState({
      position: {
        x: event.pageX,
        y: event.pageY,
      },
      show: item.type,
    })
  }
  renderMenu = (data: any) => {
    return data.map((item: any, i: any) => {
      if (item.type === 0) {
        return (
          <Menu.Item
            key={item.path}
            title={item.name}
            onContextMenu={(e) => this.onContextMenu(e, item)}
          >
            {item.name}
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.path}
            onContextMenu={(e: any) => this.onContextMenu(e, item)}
            icon={
              item.path === '../src/pages' ? (
                <PandaIcon style={{ fontSize: '24px' }} />
              ) : (
                <FolderOpenOutlined style={{ fontSize: '18px' }} />
              )
            }
            title={item.name}
          >
            {item.children &&
              item.children.map((obj: any, index: any) => {
                if (obj.type === 1) {
                  return (
                    <SubMenu
                      onContextMenu={(e: any) => this.onContextMenu(e, obj)}
                      key={obj.path}
                      icon={<FolderOpenOutlined style={{ fontSize: '18px' }} />}
                      title={obj.name}
                    >
                      {this.renderMenu(obj.children)}
                    </SubMenu>
                  )
                }
                return (
                  <Menu.Item
                    onContextMenu={(e) => this.onContextMenu(e, obj)}
                    key={obj.path}
                    title={obj.name}
                  >
                    {obj.name}
                  </Menu.Item>
                )
              })}
          </SubMenu>
        )
      }
    })
  }
  handleClick = (data: any) => {}
  deleteItem = async () => {
    await this.props.actions.delete({ item: this.item })
    this.onDeleteCancel()
  }
  onDeleteCancel = () => {
    this.item = null
    this.setState({ show: -1, deleteVisible: false })
  }
  addItem = () => {
    const { addType } = this.state
    this.formRef.current.validateFields().then(async (values: any) => {
      values.p = this.item.path
      await this.props.actions.addComponent(values)
      this.onAddCancel()
    })
  }
  onAddCancel = () => {
    this.item = null
    this.setState({ show: -1, addVisible: false })
  }
  showAdd = (addType: any) => {
    this.setState({ addVisible: true, addType, show: -1 })
  }

  render() {
    const { show, position, deleteVisible, addVisible, addType } = this.state
    const { data, templates } = this.props.Home
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {show !== -1 && (
          <div
            ref="refTest"
            className="handle-div"
            style={{
              position: 'absolute',
              left: position.x,
              top: position.y,
            }}
          >
            {show !== 0 && this.item.name !== 'Features' && (
              <div className="handle-item" onClick={() => this.showAdd(2)}>
                Add Component
              </div>
            )}
            {show !== 0 && this.item.name === 'Features' && (
              <div className="handle-item" onClick={() => this.showAdd(1)}>
                Add Feature
              </div>
            )}
            {this.item.name !== 'Features' && (
              <div
                className="handle-item"
                onClick={() => this.setState({ deleteVisible: true, show: -1 })}
              >
                Delete
              </div>
            )}
          </div>
        )}
        <Sider>
          <img
            src={require('./logo.png')}
            style={{
              marginTop: 20,
              marginBottom: 20,
              marginLeft: '10px',
              width: '95px',
              height: '25px',
            }}
          />
          <Menu defaultOpenKeys={['../src/pages']} theme="light" mode="inline">
            {this.renderMenu(data)}
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Content>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div className="view-top-content">
                <div className="view-block">
                  <div>
                    <img src="" alt="a" />
                  </div>
                  <div>
                    <h2>{data[0]?.children.length}</h2>
                    <p>features</p>
                  </div>
                </div>
                <div className="view-block">
                  <div>
                    <img src="" alt="a" />
                  </div>
                  <div>
                    <h2>162</h2>
                    <p>components</p>
                  </div>
                </div>
                <div className="view-block">
                  <div>
                    <img src="" alt="a" />
                  </div>
                  <div>
                    <h2>60</h2>
                    <p>routes</p>
                  </div>
                </div>
                <div className="view-block">
                  <div>
                    <img src="" alt="a" />
                  </div>
                  <div>
                    <h2>60</h2>
                    <p>routes</p>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
        <Modal
          title="Delete"
          visible={deleteVisible}
          onOk={this.deleteItem}
          onCancel={this.onDeleteCancel}
          okText="ok"
          cancelText="cancel"
        >
          Are you sure you want to delete?
        </Modal>
        <Modal
          title={addType === 1 ? 'Add Feature' : 'Add Component'}
          visible={addVisible}
          onOk={this.addItem}
          onCancel={this.onAddCancel}
          okText="ok"
          cancelText="cancel"
        >
          <Form ref={this.formRef} name="control-ref">
            <Form.Item
              name="name"
              label="name"
              rules={[{ required: true, message: 'please input name' }]}
            >
              <Input placeholder="please input name" />
            </Form.Item>
            {addType === 1 && (
              <Form.Item
                name="model"
                label="model"
                rules={[{ required: true, message: 'please select use model' }]}
              >
                <Select placeholder="please select use model">
                  <Option value={true}>yes</Option>
                  <Option value={false}>no</Option>
                </Select>
              </Form.Item>
            )}
            <Form.Item
              name="style"
              label="style"
              rules={[{ required: true, message: 'please select use style' }]}
            >
              <Select placeholder="please select use style">
                <Option value={true}>yes</Option>
                <Option value={false}>no</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="componentPath"
              label="componentType"
              rules={[
                { required: true, message: 'please select component type' },
              ]}
            >
              <Select placeholder="please select component type">
                {templates &&
                  templates.map((item: any) => {
                    return <Option value={item.path}>{item.name}</Option>
                  })}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    )
  }
}

export default Ct({
  model: 'Home',
  Component: Home,
  title: 'sky-rekit0.1',
})
