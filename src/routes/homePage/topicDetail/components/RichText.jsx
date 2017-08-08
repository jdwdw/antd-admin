import React from 'react'
import { Editor } from 'components'
import { Button } from 'antd-mobile'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'
// https://github.com/jpuri/react-draft-wysiwyg/blob/master/docs/src/components/Demo/index.js

export default class RichText extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editorContent: null,
    }
    this.handleReply = this.handleReply.bind(this)
  }
  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
    })
  }
  handleReply () {
    const { dispatch, reply_id = null } = this.props
    const { editorContent } = this.state
    dispatch({ type: 'topicDetail/replies', payload: { reply_id, content: draftToMarkdown(convertToRaw(editorContent.getCurrentContent())) } })
  }
  render () {
    const { editorContent } = this.state

    return (<div className="content-inner">
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
        />
      </div>
      <Button onClick={this.handleReply}> 回复</Button>
    </div>)
  }
}
