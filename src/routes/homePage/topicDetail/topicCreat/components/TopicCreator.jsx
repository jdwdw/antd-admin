import React from 'react'
import { Editor } from 'components'
import { Button, InputItem } from 'antd-mobile'
import { convertToRaw, ContentState, EditorState, convertFromHTML } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'
// https://github.com/jpuri/react-draft-wysiwyg/blob/master/docs/src/components/Demo/index.js

export default class RichText extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editorContent: null,
      title: '',
      tab: 'dev',
    }
    this.handleTopicCreate = this.handleTopicCreate.bind(this)
  }

  componentWillMount () {
    if (this.props.topicCreator.topicData.content) {
      console.log('33333')
      const blocksFromHTML = convertFromHTML(this.props.topicCreator.topicData.content)
      const contentState = ContentState.createFromBlockArray(blocksFromHTML)
      const editorState = EditorState.createWithContent(contentState)
      this.setState({
        editorContent: editorState,
        title: this.props.topicCreator.topicData.title,
        tab: this.props.topicCreator.topicData.tab,
      })
    }
  }

  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
    })
  }
  onTabStateChange = (tab) => {
    this.setState({
      tab,
    })
  }
  onInputValueChange = (title) => {
    this.setState({
      title,
    })
  }


  handleTopicCreate () {
    const { dispatch, reply_id = null } = this.props
    const { editorContent, title, tab } = this.state
    dispatch({ type: 'topicCreator/creatTopic', payload: { title, tab, content: draftToMarkdown(convertToRaw(editorContent.getCurrentContent())) } })
  }
  render () {
    const { editorContent } = this.state

    return (<div className="content-inner">
      <select onChange={this.onTabStateChange}>
        <option value="dev">dev</option>
        <option value="ask">ask</option>
        <option value="share">share</option>
        <option value="job">job</option>
      </select>
      <InputItem
        clear
        placeholder=" 标题不少于十个字 "
        autoFocus
        onChange={value => this.onInputValueChange(value)}
        defaultValue={this.state.title}
      >
      标题
      </InputItem>
      <div title="Editor" style={{ overflow: 'visible' }}>
        <Editor
          wrapperStyle={{
            minHeight: 500,
          }}
          editorStyle={{
            minHeight: 376,
          }}
          editorState={editorContent}
          onEditorStateChange={this.onEditorStateChange}
          defaultEditorState={this.props.topicCreator.topicData.connect ? editorState : null}
        />
      </div>
      <Button onClick={this.handleTopicCreate}> 提交</Button>
    </div>)
  }
}
