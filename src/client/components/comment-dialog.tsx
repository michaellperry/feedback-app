import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as React from "react";

export interface CommentData {
  commentText: string;
}

export interface CommentDialogProps {
  onSave(value: CommentData): Promise<void>;
};

interface CommentDialogState {
  value: CommentData;
  editing: boolean;
}

export class CommentDialog extends React.Component<CommentDialogProps, CommentDialogState> {
  constructor(props: CommentDialogProps) {
    super(props);

    this.state = {
      value: null,
      editing: false
    };
  }

  render() {
    return !this.state.value ? <></> : (
      <Dialog open={this.state.editing} onClose={() => this.onClose()}>
        <DialogTitle>Edit Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>What did you mean to say?</DialogContentText>
          <TextField
            value={this.state.value.commentText}
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

  begin(value: CommentData) {
    this.setState({
      value,
      editing: true
    });
  }

  private setCommentText(commentText: string) {
    this.setState({
      value: {
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
    const value = this.state.value;
    this.props.onSave(value).then(() => this.onClose());
  }
}