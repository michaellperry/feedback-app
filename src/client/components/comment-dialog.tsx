import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as React from "react";

export interface CommentData {
  commentText: string;
}

export interface CommentDialogProps {
  onSave(data: CommentData): Promise<void>;
};

interface CommentDialogState {
  data: CommentData;
  editing: boolean;
}

export class CommentDialog extends React.Component<CommentDialogProps, CommentDialogState> {
  constructor(props: CommentDialogProps) {
    super(props);

    this.state = {
      data: null,
      editing: false
    };
  }

  render() {
    return !this.state.data ? <></> : (
      <Dialog open={this.state.editing} onClose={() => this.onClose()}>
        <DialogTitle>Edit Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>What did you mean to say?</DialogContentText>
          <TextField
            value={this.state.data.commentText}
            onChange={e => this.setCommentText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.onSave()} variant="contained" color="primary">Save</Button>
          <Button onClick={() => this.onClose()} color="default">Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }

  begin(data: CommentData) {
    this.setState({
      data,
      editing: true
    });
  }

  private setCommentText(commentText: string) {
    this.setState({
      data: {
        commentText
      }
    });
  }

  private onClose() {
    this.setState({
      editing: false
    });
  }

  private onSave() {
    const data = this.state.data;
    this.props.onSave(data).then(() => this.onClose());
  }
}